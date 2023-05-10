package com.example.makefriendsbackend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user", schema = "make_friend", catalog = "")
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


}
