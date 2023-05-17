package com.example.makefriendsbackend.controller;

import com.example.makefriendsbackend.entity.User;
import com.example.makefriendsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class logInController {

    @Autowired
    UserRepository userRepository;


    @PostMapping("/login")
    public int login(@RequestParam("username") String username, @RequestParam("password") String password) {
        // 在这里进行用户名和密码的验证
        System.out.println(username);

        int index=Integer.parseInt(username);
        User u=userRepository.findUserById(index);

        if ( password.equals(u.getPassword())) {
            // 如果验证通过，则返回ui
            return u.getId();
        } else {
            // 如果验证不通过，则抛出异常
            throw new RuntimeException("用户名或密码错误");
        }
    }
}
