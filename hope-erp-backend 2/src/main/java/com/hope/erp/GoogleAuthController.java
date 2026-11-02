package com.hope.erp;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// "Continue with Google" on the Sign In and Register pages
@RestController
@RequestMapping("/api")
public class GoogleAuthController {

    record GoogleLoginRequest(String accessToken) {}

    private static final Logger log = LoggerFactory.getLogger(GoogleAuthController.class);

    private final UserRepository users;
    private final RoleRepository roles;
    private final HttpClient http = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    @Value("${google.client-id:}")
    private String clientId;

    public GoogleAuthController(UserRepository users, RoleRepository roles) {
        this.users = users;
        this.roles = roles;
    }

    // The pages ask for the Google Client ID here (so it is not hard-coded in the HTML)
    @GetMapping("/config")
    public Map<String, String> config() {
        return Map.of("googleClientId", clientId == null ? "" : clientId);
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest r, HttpSession session) {
        if (clientId == null || clientId.isBlank()) {
            return error(503, "Google sign-in is not set up yet.");
        }
        if (r.accessToken() == null || r.accessToken().isBlank()) {
            return error(400, "Google sign-in failed. Please try again.");
        }

        // Ask Google who this token belongs to, and check it was made for OUR app
        String email;
        try {
            String url = "https://oauth2.googleapis.com/tokeninfo?access_token="
                    + URLEncoder.encode(r.accessToken(), StandardCharsets.UTF_8);
            HttpResponse<String> response = http.send(
                    HttpRequest.newBuilder(URI.create(url)).GET().build(),
                    HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                return error(401, "Google sign-in failed. Please try again.");
            }

            JsonNode info = mapper.readTree(response.body());
            boolean rightApp = clientId.equals(info.path("aud").asText());
            boolean verified = "true".equals(info.path("email_verified").asText());
            email = info.path("email").asText("").trim().toLowerCase();

            if (!rightApp || !verified || email.isEmpty()) {
                return error(401, "Google sign-in failed. Please try again.");
            }
        } catch (Exception e) {
            log.error("Google token check failed", e);
            return error(502, "Could not reach Google. Please try again.");
        }

        // Existing user, or create a new one with the "User" role
        Optional<User> found = users.findByEmail(email);
        User user;
        if (found.isPresent()) {
            user = found.get();
        } else {
            Optional<Role> role = roles.findByName("User");
            if (role.isEmpty()) {
                return error(500, "The 'User' role is missing in the database. Run 02_seed.sql first.");
            }
            user = users.save(new User(email, null, role.get()));
        }

        if (user.isBlocked()) {
            return error(403, "This account is blocked. Please contact an administrator.");
        }

        session.setAttribute("userEmail", user.getEmail());
        session.setMaxInactiveInterval(60 * 60 * 8);

        return ResponseEntity.ok(Map.of(
                "name", user.displayName(),
                "email", user.getEmail(),
                "role", user.getRole().getName()));
    }

    private static ResponseEntity<Map<String, String>> error(int status, String message) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }
}
