package com.nirogya.service;

import com.nirogya.dto.MedicalReportDTO;
import com.nirogya.entity.MedicalReport;
import com.nirogya.entity.User;
import com.nirogya.repository.MedicalReportRepository;
import com.nirogya.repository.UserRepository;
import com.nirogya.util.EncryptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MedicalReportService {

    @Autowired
    private MedicalReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload.dir}")
    private String uploadDir;

    public MedicalReportDTO uploadReport(Long patientId, MultipartFile file, String description, 
                                         MedicalReport.ReportType reportType) throws Exception {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Create upload directory if it doesn't exist
        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }

        // Generate unique filename
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uniqueFileName = UUID.randomUUID() + fileExtension;
        String filePath = Paths.get(uploadDir, uniqueFileName).toString();

        // Save file
        Files.write(Paths.get(filePath), file.getBytes());

        // Generate encryption key
        String encryptionKey = EncryptionUtil.generateEncryptionKey();

        // Create report entity
        MedicalReport report = MedicalReport.builder()
                .patient(patient)
                .fileName(originalFileName)
                .fileType(file.getContentType())
                .fileSize(file.getSize())
                .filePath(filePath)
                .encryptionKey(encryptionKey)
                .description(description)
                .reportType(reportType)
                .isEncrypted(true)
                .build();

        MedicalReport savedReport = reportRepository.save(report);
        return convertToDTO(savedReport);
    }

    public List<MedicalReportDTO> getPatientReports(Long patientId) {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        return reportRepository.findByPatientOrderByUploadedAtDesc(patient)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MedicalReportDTO getReportById(Long reportId) {
        MedicalReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        return convertToDTO(report);
    }

    public void deleteReport(Long reportId) throws IOException {
        MedicalReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        // Delete file from storage
        Files.deleteIfExists(Paths.get(report.getFilePath()));

        // Delete from database
        reportRepository.delete(report);
    }

    public byte[] downloadReport(Long reportId) throws IOException {
        MedicalReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        return Files.readAllBytes(Paths.get(report.getFilePath()));
    }

    private MedicalReportDTO convertToDTO(MedicalReport report) {
        return MedicalReportDTO.builder()
                .id(report.getId())
                .fileName(report.getFileName())
                .fileType(report.getFileType())
                .fileSize(report.getFileSize())
                .description(report.getDescription())
                .reportType(report.getReportType())
                .isEncrypted(report.getIsEncrypted())
                .uploadedAt(report.getUploadedAt())
                .updatedAt(report.getUpdatedAt())
                .build();
    }
}
