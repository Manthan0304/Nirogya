package com.nirogya.controller;

import com.nirogya.dto.AIChatDTO;
import com.nirogya.service.AIHealthAssistantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/ai-assistant")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class AIHealthAssistantController {

    @Autowired
    private AIHealthAssistantService aiHealthAssistantService;

    @PostMapping("/chat")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR')")
    public ResponseEntity<?> chat(
            @RequestParam Long userId,
            @RequestParam String message) {
        try {
            AIChatDTO response = aiHealthAssistantService.chat(userId, message);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("AI chat failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to process your message: " + e.getMessage()));
        }
    }

    @GetMapping("/history/{userId}")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<?> getChatHistory(@PathVariable Long userId) {
        try {
            List<AIChatDTO> history = aiHealthAssistantService.getUserChatHistory(userId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            log.error("Failed to fetch chat history: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Failed to fetch chat history"));
        }
    }

    public static class ErrorResponse {
        public String message;
        public ErrorResponse(String message) {
            this.message = message;
        }
    }
}
