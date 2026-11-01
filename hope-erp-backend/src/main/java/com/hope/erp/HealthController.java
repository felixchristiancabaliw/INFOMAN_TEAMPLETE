package com.hope.erp;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Open http://localhost:8080/api/health to check the database connection
@RestController
@RequestMapping("/api")
public class HealthController {

    private static final Logger log = LoggerFactory.getLogger(HealthController.class);

    private final JdbcTemplate jdbc;

    public HealthController(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        try {
            Integer roles = jdbc.queryForObject("SELECT COUNT(*) FROM role", Integer.class);
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "database", "connected",
                    "roles", roles == null ? 0 : roles));
        } catch (Exception e) {
            log.error("Database check failed", e);
            return ResponseEntity.status(503).body(Map.of(
                    "status", "error",
                    "database", "not reachable",
                    "message", "Check DB_URL, DB_USER and DB_PASSWORD in your .env file."));
        }
    }
}
