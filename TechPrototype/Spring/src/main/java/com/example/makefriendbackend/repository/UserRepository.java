package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}