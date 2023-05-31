package com.example.makefriendsbackend.controller;

import com.example.makefriendsbackend.entity.Tag;
import com.example.makefriendsbackend.entity.User;
import com.example.makefriendsbackend.repository.TagRepository;
import com.example.makefriendsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class userController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    TagRepository tagRepository;

    @RequestMapping("getUser")
    public User getUser(@RequestParam int uid) {
        User user = userRepository.findUserById(uid);
        return user;
    }

    @RequestMapping("getTag")
    public List<Tag> getTags() {
        System.out.println(1);
        return tagRepository.findAll();
    }
}
