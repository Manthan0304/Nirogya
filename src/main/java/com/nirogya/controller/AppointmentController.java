package com.nirogya.controller;

import com.nirogya.dto.AppointmentDTO;
import com.nirogya.dto.ConsultationDTO;
import com.nirogya.entity.Appointment;
import com.nirogya.service.AppointmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/appointments")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> bookAppointment(
            @RequestParam Long patientId,
            @RequestParam Long doctorId,
            @RequestParam String appointmentDateTime,
            @RequestParam Integer durationMinutes,
            @RequestParam String reason) {
        try {
            LocalDateTime dateTime = LocalDateTime.parse(appointmentDateTime);
            AppointmentDTO appointment = appointmentService.bookAppointment(patientId, doctorId, dateTime, durationMinutes, reason);
            return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
        } catch (Exception e) {
            log.error("Failed to book appointment: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to book appointment: " + e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<?> getPatientAppointments(@PathVariable Long patientId) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getPatientAppointments(patientId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to fetch appointments"));
        }
    }

    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<?> getDoctorAppointments(@PathVariable Long doctorId) {
        try {
            List<AppointmentDTO> appointments = appointmentService.getDoctorAppointments(doctorId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to fetch appointments"));
        }
    }

    @PutMapping("/{appointmentId}/status")
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Long appointmentId,
            @RequestParam Appointment.AppointmentStatus status) {
        try {
            AppointmentDTO appointment = appointmentService.updateAppointmentStatus(appointmentId, status);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to update appointment"));
        }
    }

    @PostMapping("/{appointmentId}/message")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR')")
    public ResponseEntity<?> sendMessage(
            @PathVariable Long appointmentId,
            @RequestParam Long senderId,
            @RequestParam String message) {
        try {
            ConsultationDTO consultation = appointmentService.sendMessage(appointmentId, senderId, message);
            return ResponseEntity.status(HttpStatus.CREATED).body(consultation);
        } catch (Exception e) {
            log.error("Failed to send message: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to send message"));
        }
    }

    @GetMapping("/{appointmentId}/messages")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<?> getAppointmentMessages(@PathVariable Long appointmentId) {
        try {
            List<ConsultationDTO> messages = appointmentService.getAppointmentMessages(appointmentId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to fetch messages"));
        }
    }

    public static class ErrorResponse {
        public String message;
        public ErrorResponse(String message) {
            this.message = message;
        }
    }
}
