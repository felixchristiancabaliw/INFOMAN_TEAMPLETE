package com.hope.erp;

import jakarta.persistence.*;
import java.time.Instant;

// Maps to the "password_reset_token" table (only a hash of the token is stored)
@Entity
@Table(name = "password_reset_token")
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "token_hash", nullable = false, unique = true)
    private String tokenHash;

    @Column(name = "is_used", nullable = false)
    private boolean used;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    protected PasswordResetToken() {
        // needed by JPA
    }

    public PasswordResetToken(Integer userId, String tokenHash, Instant expiresAt) {
        this.userId = userId;
        this.tokenHash = tokenHash;
        this.expiresAt = expiresAt;
        this.used = false;
    }

    public Integer getUserId() { return userId; }
    public boolean isUsed() { return used; }
    public boolean isExpired() { return Instant.now().isAfter(expiresAt); }
    public void markUsed() { this.used = true; }
}
