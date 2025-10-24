package com.nirogya.repository;

import com.nirogya.entity.Appointment;
import com.nirogya.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(User patient);
    List<Appointment> findByDoctor(User doctor);
    List<Appointment> findByPatientAndStatus(User patient, Appointment.AppointmentStatus status);
    List<Appointment> findByDoctorAndStatus(User doctor, Appointment.AppointmentStatus status);
    List<Appointment> findByAppointmentDateTimeBetween(LocalDateTime start, LocalDateTime end);
}
