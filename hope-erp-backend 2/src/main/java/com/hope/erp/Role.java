package com.hope.erp;

import jakarta.persistence.*;

// Maps to the "role" table (Superadmin, Admin, User)
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    protected Role() {
        // needed by JPA
    }

    public Role(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Integer getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
}
