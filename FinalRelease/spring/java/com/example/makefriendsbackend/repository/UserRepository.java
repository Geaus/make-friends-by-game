package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.Tag;
import com.example.makefriendsbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

   User  findUserById(int index);
   User  findTopByName(String name);

   List<User> findAll();

   List<User> findUsersByNameContaining(String name);
}