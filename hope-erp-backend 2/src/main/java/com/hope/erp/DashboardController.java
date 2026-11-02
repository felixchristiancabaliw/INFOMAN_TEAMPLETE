package com.hope.erp;

import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Backend for the Homepage and Dashboard pages
@RestController
@RequestMapping("/api")
public class DashboardController {

    record Module(String title, String description) {}
    record Stat(String label, String value, String note) {}

    private final UserRepository users;

    public DashboardController(UserRepository users) {
        this.users = users;
    }

    // HOMEPAGE "Workspace overview" cards (public, no login needed)
    @GetMapping("/overview")
    public List<Module> overview() {
        return List.of(
                new Module("Customers", "Manage contacts & accounts"),
                new Module("Products", "Catalog & inventory"),
                new Module("Human Resources", "Employees & payroll"),
                new Module("Sales", "Orders & revenue"));
    }

    // DASHBOARD page data (login required)
    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(HttpSession session) {
        Object email = session.getAttribute("userEmail");
        Optional<User> user = email == null ? Optional.empty() : users.findByEmail(email.toString());

        if (user.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "Not signed in."));
        }

        // Placeholder numbers from the design. Replace with real queries in a later sprint.
        List<Stat> stats = List.of(
                new Stat("Total Customers", "5", "1 inactive"),
                new Stat("Products", "400", "7 new this week"),
                new Stat("Open Orders", "100", "10% vs last week"),
                new Stat("Revenue (MTD)", "$99.1k", "20% vs last month"));

        List<String> quickActions = List.of(
                "View Customers", "Manage Products", "Human Resources", "Sales Pipeline", "Reports");

        return ResponseEntity.ok(Map.of(
                "welcome", "Welcome back, " + user.get().displayName() + "!",
                "name", user.get().displayName(),
                "role", user.get().getRole().getName(),
                "stats", stats,
                "quickActions", quickActions));
    }
}
