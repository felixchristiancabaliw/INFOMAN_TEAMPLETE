package com.hope.erp;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// Spring writes the SQL for you from these method names
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
