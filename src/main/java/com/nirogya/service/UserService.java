package com.nirogya.service;

import com.nirogya.dto.RegisterRequest;
import com.nirogya.entity.User;
import com.nirogya.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .role(request.getRole())
                .specialization(request.getSpecialization())
                .licenseNumber(request.getLicenseNumber())
                .verificationStatus(request.getRole() == User.UserRole.DOCTOR ? 
                        User.VerificationStatus.PENDING : User.VerificationStatus.VERIFIED)
                .isActive(true)
                .build();

        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getPendingDoctors() {
        return userRepository.findByRoleAndVerificationStatus(
                User.UserRole.DOCTOR, User.VerificationStatus.PENDING);
    }

    public User verifyDoctor(Long doctorId, boolean approved) {
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        doctor.setVerificationStatus(approved ? 
                User.VerificationStatus.VERIFIED : User.VerificationStatus.REJECTED);
        return userRepository.save(doctor);
    }

    public List<User> getAllDoctors() {
        return userRepository.findByRoleAndVerificationStatus(
                User.UserRole.DOCTOR, User.VerificationStatus.VERIFIED);
    }

    public User updateUser(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setBio(updatedUser.getBio());
        user.setProfilePicture(updatedUser.getProfilePicture());

        return userRepository.save(user);
    }
}
