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

        User from =userRepository.findUserById(uid);
        List<ChatUserLink> links= chatUserLinkRepository.findChatUserLinksByFromUser(from);
        List<User> list =new ArrayList<>();

        for(ChatUserLink link : links){
            if(link.getIsBlack()==0 && link.getIsAdd() == 1){
                list.add(link.getToUser());
            }

        }
        return list;

    }

    @RequestMapping("/getBlack")
    public List<User> getBlack(@RequestParam int uid){

        User u =userRepository.findUserById(uid);
        List<ChatUserLink> links= chatUserLinkRepository.findChatUserLinksByFromUser(u);
        List<User> list=new ArrayList<>();

        for(ChatUserLink  link:links){
            if(link.getIsBlack()==1){
                list.add(link.getToUser());
            }
        }

        return list;

    }
}
