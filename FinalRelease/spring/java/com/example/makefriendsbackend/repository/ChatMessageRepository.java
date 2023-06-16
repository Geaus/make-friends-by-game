package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.ChatMessage;
import com.example.makefriendsbackend.entity.ChatUserLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import javax.transaction.Transactional;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {

    List<ChatMessage> findChatMessagesByChatUserLink(ChatUserLink link);
    @Modifying
    @Transactional
    void deleteChatMessagesByChatUserLink(ChatUserLink link);
}