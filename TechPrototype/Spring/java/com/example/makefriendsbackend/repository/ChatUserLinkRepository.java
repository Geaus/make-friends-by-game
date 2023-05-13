package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.ChatUserLink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatUserLinkRepository extends JpaRepository<ChatUserLink, Integer> {
}