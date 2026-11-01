package com.hope.erp;

import jakarta.persistence.*;

// Maps to the "app_user" table from 01_migration.sql
@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    // NULL until the person sets a password
    @Column(name = "password_hash")
    private String passwordHash;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "is_blocked", nullable = false)
    private boolean blocked;

    protected User() {
        // needed by JPA
    }

    public User(String email, String passwordHash, Role role) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.blocked = false;
    }

    public Integer getId() { return id; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
    public Role getRole() { return role; }
    public boolean isBlocked() { return blocked; }

    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    // The table has no name columns yet, so we show the part before the @
    public String displayName() {
        int at = email.indexOf('@');
        return at > 0 ? email.substring(0, at) : email;
    }
}
