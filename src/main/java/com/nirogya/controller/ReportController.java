package com.nirogya.controller;

import com.nirogya.dto.MedicalReportDTO;
import com.nirogya.entity.MedicalReport;
import com.nirogya.service.MedicalReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/patient/reports")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReportController {

    @Autowired
    private MedicalReportService reportService;

    @PostMapping("/upload")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> uploadReport(
            @RequestParam("file") MultipartFile file,
            @RequestParam("patientId") Long patientId,
            @RequestParam("description") String description,
            @RequestParam("reportType") MedicalReport.ReportType reportType) {
        try {
            MedicalReportDTO report = reportService.uploadReport(patientId, file, description, reportType);
            return ResponseEntity.status(HttpStatus.CREATED).body(report);
        } catch (Exception e) {
            log.error("Report upload failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to upload report: " + e.getMessage()));
        }
    }

    @GetMapping("/{patientId}")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<?> getPatientReports(@PathVariable Long patientId) {
        try {
            List<MedicalReportDTO> reports = reportService.getPatientReports(patientId);
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            log.error("Failed to fetch reports: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to fetch reports"));
        }
    }

    @GetMapping("/detail/{reportId}")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<?> getReportDetail(@PathVariable Long reportId) {
        try {
            MedicalReportDTO report = reportService.getReportById(reportId);
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Report not found"));
        }
    }

    @DeleteMapping("/{reportId}")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> deleteReport(@PathVariable Long reportId) {
        try {
            reportService.deleteReport(reportId);
            return ResponseEntity.ok(new SuccessResponse("Report deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to delete report"));
        }
    }

    @GetMapping("/download/{reportId}")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<?> downloadReport(@PathVariable Long reportId) {
        try {
            byte[] fileContent = reportService.downloadReport(reportId);
            MedicalReportDTO report = reportService.getReportById(reportId);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + report.getFileName() + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, report.getFileType())
                    .body(fileContent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Report not found"));
        }
    }

    public static class ErrorResponse {
        public String message;
        public ErrorResponse(String message) {
            this.message = message;
        }
    }

    public static class SuccessResponse {
        public String message;
        public SuccessResponse(String message) {
            this.message = message;
        }
    }
}
