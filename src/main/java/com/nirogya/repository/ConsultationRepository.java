package com.nirogya.repository;

import com.nirogya.entity.Consultation;
import com.nirogya.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByAppointmentOrderBySentAtAsc(Appointment appointment);
}
