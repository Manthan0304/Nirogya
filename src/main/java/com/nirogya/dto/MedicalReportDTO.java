package com.nirogya.dto;

import com.nirogya.entity.MedicalReport;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalReportDTO {
    private Long id;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private String description;
    private MedicalReport.ReportType reportType;
    private Boolean isEncrypted;
    private LocalDateTime uploadedAt;
    private LocalDateTime updatedAt;
}
