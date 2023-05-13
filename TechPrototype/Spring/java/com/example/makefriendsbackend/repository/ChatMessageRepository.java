package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.ChatMessage;
import com.example.makefriendsbackend.entity.ChatUserLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {

    List<ChatMessage> findChatMessagesByChatUserLink(ChatUserLink link);
}