package com.example.makefriendsbackend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tag_user_rel", schema = "make_friend", catalog = "")
public class TagUser {
    @Basic
    @Column(name = "tagid")
    private Integer tagid;
    @Basic
    @Column(name = "userid")
    private Integer userid;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    public Integer getTagid() {
        return tagid;
    }

    public void setTagid(Integer tagid) {
        this.tagid = tagid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TagUser tagUser = (TagUser) o;
        return Objects.equals(tagid, tagUser.tagid) && Objects.equals(userid, tagUser.userid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tagid, userid);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
