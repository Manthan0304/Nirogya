package com.nirogya.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIChatDTO {
    private Long id;
    private Long userId;
    private String userMessage;
    private String aiResponse;
    private String context;
    private LocalDateTime createdAt;
}
