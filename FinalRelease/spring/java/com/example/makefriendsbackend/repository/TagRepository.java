package com.example.makefriendsbackend.repository;

import com.example.makefriendsbackend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    List<Tag> findAll();

    Tag findTagByTagid(int index);

    Tag findByTagid(int id);
}
