package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.ChatList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatListRepository extends JpaRepository<ChatList, Integer> {
}