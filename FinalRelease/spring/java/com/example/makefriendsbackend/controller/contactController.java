package com.example.makefriendsbackend.controller;

import com.example.makefriendsbackend.entity.ChatList;
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

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class contactController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ChatUserLinkRepository chatUserLinkRepository;

    @Autowired
    ChatMessageRepository chatMessageRepository;
    @RequestMapping("/getContact")
    public List<ChatUserLink> getContact(@RequestParam int uid){

        User u =userRepository.findUserById(uid);
        List<ChatUserLink> links= chatUserLinkRepository.findChatUserLinksByFromUser(u);

        List<ChatUserLink> list=new ArrayList<>();
        for(ChatUserLink  link:links){
            list.add(link);
        }

        links = chatUserLinkRepository.findChatUserLinksByToUser(u);

        for(ChatUserLink link: links) {
            if(link.getIsAdd() == 0)list.add(link);
        }

        return list;

    }

    @RequestMapping("/blackContact")
    public String blackContact(@RequestParam int uid ,@RequestParam int to_uid){

        User from=userRepository.findUserById(uid);
        User to=userRepository.findUserById(to_uid);
        ChatUserLink link=chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(from,to);
        link.setIsBlack(1);
        chatUserLinkRepository.save(link);

        return "拉黑成功";
    }

    @RequestMapping("/reAddContact")
    public String reAddContact(@RequestParam int uid,@RequestParam int to_uid){

        User from=userRepository.findUserById(uid);
        User to=userRepository.findUserById(to_uid);
        ChatUserLink link=chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(from,to);
        link.setIsBlack(0);
        chatUserLinkRepository.save(link);

        return "重加成功";
    }

    @RequestMapping("/deleteContact")
    public  String deleteContact (@RequestParam int uid,@RequestParam int to_uid){

        User from = userRepository.findUserById(uid);
        User to = userRepository.findUserById(to_uid);
        ChatUserLink link_1 = chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(from, to);
        ChatUserLink link_2 = chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(to, from);

        chatMessageRepository.deleteChatMessagesByChatUserLink(link_1);
        chatMessageRepository.deleteChatMessagesByChatUserLink(link_2);
        chatUserLinkRepository.delete(link_1);
        chatUserLinkRepository.delete(link_2);


        return "删除成功";
    }

}
