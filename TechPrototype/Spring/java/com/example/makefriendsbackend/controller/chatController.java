package com.example.makefriendsbackend.controller;

import com.example.makefriendsbackend.entity.ChatMessage;
import com.example.makefriendsbackend.entity.ChatUserLink;
import com.example.makefriendsbackend.entity.User;
import com.example.makefriendsbackend.repository.ChatMessageRepository;
import com.example.makefriendsbackend.repository.ChatUserLinkRepository;
import com.example.makefriendsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
public class chatController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ChatUserLinkRepository chatUserLinkRepository;

    @Autowired
    ChatMessageRepository chatMessageRepository;

    @RequestMapping("/getMessages")
    public List<ChatMessage> getMessages(@RequestParam int from_uid, @RequestParam int to_uid){

        User from = userRepository.findUserByIdIs(from_uid);
        User to=userRepository.findUserByIdIs(to_uid);
        ChatUserLink link_1=chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(from,to);
        ChatUserLink link_2=chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(to,from);
        List<ChatMessage> message_1=chatMessageRepository.findChatMessagesByChatUserLink(link_1);
        List<ChatMessage> message_2=chatMessageRepository.findChatMessagesByChatUserLink(link_2);

        List<ChatMessage> messages=new ArrayList<>();
        messages.addAll(message_1);
        messages.addAll(message_2);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        messages.sort((a, b) -> {
            try {
                return formatter.parse(a.getSendTime()).compareTo(formatter.parse(b.getSendTime()));
            } catch (ParseException e) {
                throw new IllegalArgumentException(e);
            }
        });

        return messages;
    }
}
