package com.nirogya.service;

import com.nirogya.dto.AppointmentDTO;
import com.nirogya.dto.ConsultationDTO;
import com.nirogya.entity.Appointment;
import com.nirogya.entity.Consultation;
import com.nirogya.entity.User;
import com.nirogya.repository.AppointmentRepository;
import com.nirogya.repository.ConsultationRepository;
import com.nirogya.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private UserRepository userRepository;

    public AppointmentDTO bookAppointment(Long patientId, Long doctorId, LocalDateTime appointmentDateTime,
                                          Integer durationMinutes, String reason) {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentDateTime(appointmentDateTime)
                .durationMinutes(durationMinutes)
                .reason(reason)
                .status(Appointment.AppointmentStatus.SCHEDULED)
                .build();

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(savedAppointment);
    }

    public List<AppointmentDTO> getPatientAppointments(Long patientId) {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        return appointmentRepository.findByPatient(patient)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AppointmentDTO> getDoctorAppointments(Long doctorId) {
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        return appointmentRepository.findByDoctor(doctor)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AppointmentDTO updateAppointmentStatus(Long appointmentId, Appointment.AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(status);
        Appointment updatedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(updatedAppointment);
    }

    public ConsultationDTO sendMessage(Long appointmentId, Long senderId, String message) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Consultation.MessageSender messageSender = sender.getRole() == User.UserRole.PATIENT ?
                Consultation.MessageSender.PATIENT : Consultation.MessageSender.DOCTOR;

        Consultation consultation = Consultation.builder()
                .appointment(appointment)
                .patient(appointment.getPatient())
                .doctor(appointment.getDoctor())
                .message(message)
                .sender(messageSender)
                .build();

        Consultation savedConsultation = consultationRepository.save(consultation);
        return convertToDTO(savedConsultation);
    }

    public List<ConsultationDTO> getAppointmentMessages(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        return consultationRepository.findByAppointmentOrderBySentAtAsc(appointment)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private AppointmentDTO convertToDTO(Appointment appointment) {
        return AppointmentDTO.builder()
                .id(appointment.getId())
                .patientId(appointment.getPatient().getId())
                .patientName(appointment.getPatient().getFirstName() + " " + appointment.getPatient().getLastName())
                .doctorId(appointment.getDoctor().getId())
                .doctorName(appointment.getDoctor().getFirstName() + " " + appointment.getDoctor().getLastName())
                .appointmentDateTime(appointment.getAppointmentDateTime())
                .durationMinutes(appointment.getDurationMinutes())
                .reason(appointment.getReason())
                .status(appointment.getStatus())
                .notes(appointment.getNotes())
                .createdAt(appointment.getCreatedAt())
                .updatedAt(appointment.getUpdatedAt())
                .build();
    }

    private ConsultationDTO convertToDTO(Consultation consultation) {
        return ConsultationDTO.builder()
                .id(consultation.getId())
                .appointmentId(consultation.getAppointment().getId())
                .patientId(consultation.getPatient().getId())
                .doctorId(consultation.getDoctor().getId())
                .message(consultation.getMessage())
                .sender(consultation.getSender())
                .attachmentPath(consultation.getAttachmentPath())
                .sentAt(consultation.getSentAt())
                .build();
    }
}
