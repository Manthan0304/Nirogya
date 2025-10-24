package com.nirogya.repository;

import com.nirogya.entity.AIChat;
import com.nirogya.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AIChatRepository extends JpaRepository<AIChat, Long> {
    List<AIChat> findByUserOrderByCreatedAtDesc(User user);
}
