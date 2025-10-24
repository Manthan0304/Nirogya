package com.nirogya.controller;

import com.nirogya.dto.AuthResponse;
import com.nirogya.entity.User;
import com.nirogya.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/doctors/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPendingDoctors() {
        try {
            List<User> pendingDoctors = userService.getPendingDoctors();
            return ResponseEntity.ok(pendingDoctors);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to fetch pending doctors"));
        }
    }

    @PostMapping("/doctors/{doctorId}/verify")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> verifyDoctor(
            @PathVariable Long doctorId,
            @RequestParam boolean approved) {
        try {
            User verifiedDoctor = userService.verifyDoctor(doctorId, approved);
            return ResponseEntity.ok(verifiedDoctor);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to verify doctor"));
        }
    }

    @GetMapping("/doctors")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllDoctors() {
        try {
            List<User> doctors = userService.getAllDoctors();
            return ResponseEntity.ok(doctors);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to fetch doctors"));
        }
    }

    public static class ErrorResponse {
        public String message;
        public ErrorResponse(String message) {
            this.message = message;
        }
    }
}
