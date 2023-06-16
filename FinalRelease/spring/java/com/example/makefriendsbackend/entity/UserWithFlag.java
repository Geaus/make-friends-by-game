package com.example.makefriendsbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

public class UserWithFlag {
    private int id;
    private String name;
    private int addFlag;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAddFlag() {
        return addFlag;
    }

    public void setAddFlag(int addFlag) {
        this.addFlag = addFlag;
    }
}
