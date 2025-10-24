package com.nirogya.dto;

import com.nirogya.entity.Consultation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultationDTO {
    private Long id;
    private Long appointmentId;
    private Long patientId;
    private Long doctorId;
    private String message;
    private Consultation.MessageSender sender;
    private String attachmentPath;
    private LocalDateTime sentAt;
}
