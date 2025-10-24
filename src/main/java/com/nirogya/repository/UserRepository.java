package com.nirogya.repository;

import com.nirogya.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);
    List<User> findByRole(User.UserRole role);
    List<User> findByVerificationStatus(User.VerificationStatus status);
    List<User> findByRoleAndVerificationStatus(User.UserRole role, User.VerificationStatus status);
}
