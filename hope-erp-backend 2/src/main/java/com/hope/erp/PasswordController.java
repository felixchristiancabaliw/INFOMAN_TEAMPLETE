package com.hope.erp;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

// Backend for forgot-password.html and reset-password.html
@RestController
@RequestMapping("/api")
public class PasswordController {

    record ForgotRequest(String email) {}
    record ResetRequest(String token, String password) {}

    private static final Logger log = LoggerFactory.getLogger(PasswordController.class);

    private final UserRepository users;
    private final PasswordResetTokenRepository tokens;
    private final PasswordEncoder encoder;
    private final ObjectProvider<JavaMailSender> mailSender;

    @Value("${app.base-url}")
    private String baseUrl;

    @Value("${app.show-reset-link}")
    private boolean showResetLink;

    @Value("${app.mail-from}")
    private String mailFrom;

    public PasswordController(UserRepository users, PasswordResetTokenRepository tokens,
                              PasswordEncoder encoder, ObjectProvider<JavaMailSender> mailSender) {
        this.users = users;
        this.tokens = tokens;
        this.encoder = encoder;
        this.mailSender = mailSender;
    }

    // FORGOT PASSWORD page -> POST /api/forgot-password
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotRequest r) {
        if (r.email() == null || r.email().isBlank()) {
            return error(400, "Please enter your email address.");
        }

        // Same answer whether or not the email exists (so nobody can guess who is registered)
        Map<String, Object> body = new HashMap<>();
        body.put("message", "If that email is registered, a password reset link has been sent.");

        Optional<User> found = users.findByEmail(r.email().trim().toLowerCase());
        if (found.isPresent() && !found.get().isBlocked()) {
            String token = newToken();
            tokens.save(new PasswordResetToken(found.get().getId(), sha256(token),
                    Instant.now().plus(1, ChronoUnit.HOURS)));

            String link = baseUrl + "/reset-password.html?token=" + token;
            sendEmail(found.get().getEmail(), link);

            // TEST MODE only: show the link on the page because no email is set up
            if (showResetLink) {
                body.put("resetLink", link);
            }
        }
        return ResponseEntity.ok(body);
    }

    // RESET PASSWORD page -> POST /api/reset-password
    @PostMapping("/reset-password")
    @Transactional
    public ResponseEntity<?> resetPassword(@RequestBody ResetRequest r) {
        if (r.token() == null || r.token().isBlank()) {
            return error(400, "This reset link is invalid or has expired.");
        }
        if (r.password() == null || r.password().length() < 8) {
            return error(400, "Password must be at least 8 characters.");
        }

        Optional<PasswordResetToken> found = tokens.findByTokenHash(sha256(r.token().trim()));
        if (found.isEmpty() || found.get().isUsed() || found.get().isExpired()) {
            return error(400, "This reset link is invalid or has expired.");
        }

        Optional<User> user = users.findById(found.get().getUserId());
        if (user.isEmpty()) {
            return error(400, "This reset link is invalid or has expired.");
        }

        user.get().setPasswordHash(encoder.encode(r.password()));
        users.save(user.get());

        found.get().markUsed();
        tokens.save(found.get());

        return ResponseEntity.ok(Map.of("message", "Password updated. You can now sign in."));
    }

    // ----- helpers -----
    private void sendEmail(String to, String link) {
        JavaMailSender sender = mailSender.getIfAvailable();

        if (sender == null) {
            // No email set up (normal while developing): print the link in the VS Code terminal
            log.info("Password reset link for {}: {}", to, link);
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailFrom);
            message.setTo(to);
            message.setSubject("Reset your Hope, Inc. ERP password");
            message.setText("Click this link to reset your password (valid for 1 hour):\n\n"
                    + link + "\n\nIf you did not ask for this, you can ignore this email.");
            sender.send(message);
        } catch (Exception e) {
            log.error("Could not send the reset email", e);
        }
    }

    private static String newToken() {
        byte[] bytes = new byte[32];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    // Same format as the seed file: lowercase hex SHA-256
    private static String sha256(String text) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(digest.digest(text.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    private static ResponseEntity<Map<String, String>> error(int status, String message) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }
}
