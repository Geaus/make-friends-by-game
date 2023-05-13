package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

   User  findUserByIdIs(int index);
}