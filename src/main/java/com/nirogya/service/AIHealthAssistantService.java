package com.nirogya.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.nirogya.dto.AIChatDTO;
import com.nirogya.entity.AIChat;
import com.nirogya.entity.User;
import com.nirogya.repository.AIChatRepository;
import com.nirogya.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.google.genai.types.*;
import java.util.Collections;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AIHealthAssistantService {

    @Autowired
    private AIChatRepository aiChatRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private Client geminiClient;

    private void initializeGemini() {
        if (geminiClient == null && geminiApiKey != null && !geminiApiKey.isEmpty()) {
            geminiClient = Client.builder()
                    .apiKey(geminiApiKey)
                    .build();
            log.info("🌟 Gemini Client initialized.");
        }
    }

    public AIChatDTO chat(Long userId, String userMessage) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String aiResponse = generateAIResponse(userMessage);

        AIChat aiChat = AIChat.builder()
                .user(user)
                .userMessage(userMessage)
                .aiResponse(aiResponse)
                .context("Health consultation")
                .build();

        AIChat savedChat = aiChatRepository.save(aiChat);
        return convertToDTO(savedChat);
    }



    private String generateAIResponse(String userMessage) {
        try {
            initializeGemini();

            if (geminiClient == null) {
                return getDefaultHealthResponse(userMessage);
            }

            String systemPrompt =
                    "You are a helpful, empathetic health assistant. Provide evidence-based, clear health information. " +
                            "Always remind the user to consult a qualified healthcare professional for diagnosis or treatment.";

            String fullPrompt = systemPrompt + "\n\nUser: " + userMessage;

            // Correct usage: client.models.generateContent(modelName, prompt, config)
            GenerateContentResponse response = geminiClient.models.generateContent(
                    "gemini-2.0-flash",
                    fullPrompt,
                    null  // config is optional, passing null for default settings
            );

            if (response != null && response.text() != null && !response.text().isEmpty()) {
                return response.text();
            } else {
                return getDefaultHealthResponse(userMessage);
            }

        } catch (Exception e) {
            log.error("Error generating AI response: {}", e.getMessage(), e);
            return getDefaultHealthResponse(userMessage);
        }
    }
    private String getDefaultHealthResponse(String userMessage) {
        String msgLower = userMessage.toLowerCase();
        if (msgLower.contains("blood pressure")) {
            return "Normal blood pressure is around 120/80 mmHg. If you're seeing higher or lower values persistently, please consult your doctor.";
        } else if (msgLower.contains("fever")) {
            return "A fever can indicate your body is fighting an infection. Drink fluids, rest, and if it lasts more than a few days or is very high, seek medical care.";
        } else if (msgLower.contains("headache")) {
            return "Headaches can have many causes — from dehydration and stress to more serious conditions. If frequent or severe, consult a healthcare provider.";
        } else {
            return "Thank you for your question. I can provide general health information but I'm not a substitute for a medical professional.";
        }
    }

    public List<AIChatDTO> getUserChatHistory(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return aiChatRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private AIChatDTO convertToDTO(AIChat aiChat) {
        return AIChatDTO.builder()
                .id(aiChat.getId())
                .userId(aiChat.getUser().getId())
                .userMessage(aiChat.getUserMessage())
                .aiResponse(aiChat.getAiResponse())
                .context(aiChat.getContext())
                .createdAt(aiChat.getCreatedAt())
                .build();
    }
}
