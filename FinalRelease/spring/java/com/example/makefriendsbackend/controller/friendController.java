package com.example.makefriendsbackend.controller;

import com.example.makefriendsbackend.entity.ChatUserLink;
import com.example.makefriendsbackend.entity.User;
import com.example.makefriendsbackend.entity.UserWithFlag;
import com.example.makefriendsbackend.repository.ChatUserLinkRepository;
import com.example.makefriendsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.lang.Math;

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

    @RequestMapping("/recommend")
    public List<UserWithFlag> recommendFriend(@RequestParam int uid) {
        List<UserWithFlag> res = new ArrayList<>();
        List<User> allUser = userRepository.findAll();
        User me = userRepository.findUserById(uid);
        int[] my_dir = new int[20];
        int mySum = 0;
        for(int i = 0; i < 20; i++)my_dir[i] = 0;
        for(int i = 0; i < me.getTags().size(); i++) {
            my_dir[me.getTags().get(i).getTagid() - 1] += 5;
        }
        List<ChatUserLink> my_chat = chatUserLinkRepository.findChatUserLinksByFromUser(me);
        for(int i = 0; i < my_chat.size(); i++) {
            User friend = my_chat.get(i).getToUser();
            for(int j = 0; j < friend.getTags().size(); j++) {
                my_dir[friend.getTags().get(j).getTagid() - 1] += 1;
            }
        }
        System.out.println(Arrays.toString(my_dir));
        for(int i = 0; i < 20; i++)mySum += my_dir[i] * my_dir[i];
        for(int i = 0; i < allUser.size(); i++) {
            User you = allUser.get(i);
            System.out.println(you.getId());
            if(you.getId() == uid)continue;
            ChatUserLink tmp = chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(me, you);
            if(tmp != null)continue;

            List<ChatUserLink> your_chat = chatUserLinkRepository.findChatUserLinksByFromUser(you);
            int[] your_dir = new int[20];
            int yourSum = 0;
            for(int j = 0; j < 20; j++)your_dir[j] = 0;
            for(int j = 0; j < you.getTags().size(); j++) {
                your_dir[you.getTags().get(j).getTagid() - 1] += 5;
            }
            for(int k = 0; k < your_chat.size(); k++) {
                User friend = your_chat.get(k).getToUser();
                for(int j = 0; j < friend.getTags().size(); j++) {
                    your_dir[friend.getTags().get(j).getTagid() - 1] += 1;
                }
            }
            for(int j = 0; j < 20; j++)yourSum += your_dir[j] * your_dir[j];
            System.out.println(Arrays.toString(your_dir));
            int multi = 0;
            for(int j = 0; j < 20; j++)multi += your_dir[j] * my_dir[j];
            double prob = 0;
            if(mySum == 0 || yourSum == 0)prob = 0.1;
            else prob = multi / (Math.sqrt(mySum)) / (Math.sqrt(yourSum));
            System.out.println(prob);
            UserWithFlag user = new UserWithFlag();
            user.setId(you.getId());
            user.setName(you.getName());
            user.setPrio(prob);
            user.setTags(you.getTags());
            ChatUserLink tmp_2 = chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(you, me);
            if(tmp_2 != null)user.setAddFlag(1);
            else user.setAddFlag(0);
            res.add(user);
        }
        res.sort((a, b) -> {
            if(a.getPrio() < b.getPrio())return 1;
            else if(a.getPrio() == b.getPrio())return 0;
            return -1;
        });
        if(res.size() > 4)res = res.subList(0, 4);
        return res;
    }
}
