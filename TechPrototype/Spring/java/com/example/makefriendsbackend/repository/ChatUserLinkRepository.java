package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.ChatUserLink;
import com.example.makefriendsbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatUserLinkRepository extends JpaRepository<ChatUserLink, Integer> {

    List<ChatUserLink> findChatUserLinksByFromUser(User u);

    ChatUserLink findChatUserLinkByFromUserAndToUser(User from,User to);

}