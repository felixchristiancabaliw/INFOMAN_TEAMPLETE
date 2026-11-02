package com.hope.erp;

import jakarta.servlet.http.HttpSession;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

// Backend for the Sign In and Register pages
@RestController
@RequestMapping("/api")
public class AuthController {

    record RegisterRequest(String firstName, String lastName, String email, String password) {}
    record LoginRequest(String email, String password, boolean remember) {}

    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;

    public AuthController(UserRepository users, RoleRepository roles, PasswordEncoder encoder) {
        this.users = users;
        this.roles = roles;
        this.encoder = encoder;
    }

    // REGISTER page -> POST /api/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest r) {
        if (isBlank(r.firstName()) || isBlank(r.lastName()) || isBlank(r.email()) || isBlank(r.password())) {
            return error(400, "Please fill in all fields.");
        }
        if (!r.email().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            return error(400, "Please enter a valid email address.");
        }
        if (r.password().length() < 8) {
            return error(400, "Password must be at least 8 characters.");
        }

        String email = r.email().trim().toLowerCase();
        if (users.existsByEmail(email)) {
            return error(409, "That email is already registered.");
        }

        Optional<Role> role = roles.findByName("User");
        if (role.isEmpty()) {
            return error(500, "The 'User' role is missing in the database. Run 02_seed.sql first.");
        }

        // NOTE: app_user has no first/last name columns yet, so only email + password are saved.
        users.save(new User(email, encoder.encode(r.password()), role.get()));
        return ResponseEntity.ok(Map.of("message", "Account created. You can now sign in."));
    }

    // SIGN IN page -> POST /api/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest r, HttpSession session) {
        Optional<User> found = isBlank(r.email())
                ? Optional.empty()
                : users.findByEmail(r.email().trim().toLowerCase());

        if (found.isEmpty()) {
            return error(401, "Incorrect email or password.");
        }

        User user = found.get();

        if (user.isBlocked()) {
            return error(403, "This account is blocked. Please contact an administrator.");
        }
        if (user.getPasswordHash() == null) {
            return error(403, "No password has been set yet. Click 'Forgot Password?' to create one.");
        }
        if (r.password() == null || !encoder.matches(r.password(), user.getPasswordHash())) {
            return error(401, "Incorrect email or password.");
        }

        session.setAttribute("userEmail", user.getEmail());

        // "Remember Me" keeps the session for 30 days, otherwise 30 minutes
        session.setMaxInactiveInterval(r.remember() ? 60 * 60 * 24 * 30 : 60 * 30);

        return ResponseEntity.ok(userInfo(user));
    }

    // DASHBOARD page -> who is logged in?
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        Object email = session.getAttribute("userEmail");
        Optional<User> user = email == null ? Optional.empty() : users.findByEmail(email.toString());
        if (user.isEmpty()) {
            return error(401, "Not signed in.");
        }
        return ResponseEntity.ok(userInfo(user.get()));
    }

    // DASHBOARD page Logout button -> POST /api/logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logged out."));
    }

    // ----- helpers -----
    private Map<String, String> userInfo(User user) {
        return Map.of(
                "name", user.displayName(),
                "email", user.getEmail(),
                "role", user.getRole().getName());
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }

    private static ResponseEntity<Map<String, String>> error(int status, String message) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }
}
