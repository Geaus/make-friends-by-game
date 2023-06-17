package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.TagUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagUserRepository extends JpaRepository<TagUser, Integer> {
}