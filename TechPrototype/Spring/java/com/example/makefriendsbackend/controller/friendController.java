package com.example.makefriendsbackend.controller;

import com.example.makefriendsbackend.entity.ChatUserLink;
import com.example.makefriendsbackend.entity.User;
import com.example.makefriendsbackend.repository.ChatUserLinkRepository;
import com.example.makefriendsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin

public class friendController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ChatUserLinkRepository chatUserLinkRepository;


    @RequestMapping("/getFriends")
    public List<User> getFriend(@RequestParam int uid){

        User from =userRepository.findUserByIdIs(uid);
        List<ChatUserLink> links= chatUserLinkRepository.findChatUserLinksByFromUser(from);
        List<User> list =new ArrayList<>();

        for(ChatUserLink link : links){
            list.add(link.getToUser());
        }
        return list;

    }


}
