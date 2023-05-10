package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
}