package com.example.makefriendsbackend.controller;

import com.example.makefriendsbackend.entity.User;
import com.example.makefriendsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class userController {
    @Autowired
    UserRepository userRepository;

    @RequestMapping("getUser")
    public User getUser(@RequestParam int uid) {
        User user = userRepository.findUserById(uid);
        return user;
    }
}
