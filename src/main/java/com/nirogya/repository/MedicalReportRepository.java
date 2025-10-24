package com.nirogya.repository;

import com.nirogya.entity.MedicalReport;
import com.nirogya.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MedicalReportRepository extends JpaRepository<MedicalReport, Long> {
    List<MedicalReport> findByPatient(User patient);
    List<MedicalReport> findByPatientOrderByUploadedAtDesc(User patient);
}
