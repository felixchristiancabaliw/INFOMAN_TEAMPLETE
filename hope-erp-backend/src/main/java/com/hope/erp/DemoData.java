package com.hope.erp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// TEST MODE ONLY (DEMO_DATA=true): fills the temporary database so you can try the site.
// With the real Supabase database (DEMO_DATA=false) this does nothing.
@Component
@ConditionalOnProperty(name = "app.demo-data", havingValue = "true")
public class DemoData implements CommandLineRunner {

    private final RoleRepository roles;
    private final UserRepository users;
    private final PasswordEncoder encoder;

    public DemoData(RoleRepository roles, UserRepository users, PasswordEncoder encoder) {
        this.roles = roles;
        this.users = users;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        if (roles.count() == 0) {
            roles.save(new Role("Superadmin", "Full system access"));
            roles.save(new Role("Admin", "Administrative access"));
            roles.save(new Role("User", "Standard user access"));
        }

        if (!users.existsByEmail("admin@hope.com")) {
            Role admin = roles.findByName("Admin").orElseThrow();
            users.save(new User("admin@hope.com", encoder.encode("admin123"), admin));
        }
    }
}
