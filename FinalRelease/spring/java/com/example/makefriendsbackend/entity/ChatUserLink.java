package com.example.makefriendsbackend.entity;

import javax.persistence.*;

@Entity
@Table(name = "chat_user_link", schema = "make_friend", catalog = "")
public class ChatUserLink {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "link_id")
    private int linkId;

    @ManyToOne
    @JoinColumn(name = "from_user")
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user")
    private User toUser;

    //    @Basic
//    @Column(name = "from_user")
//    private Integer fromUser;
//    @Basic
//    @Column(name = "to_user")
//    private Integer toUser;
    @Basic
    @Column(name = "create_time")
    private String createTime;

    @Basic
    @Column(name="is_black")
    private int isBlack;

    @Basic
    @Column(name="is_add")
    private int isAdd;

    public User getFromUser() {
        return fromUser;
    }

    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    public User getToUser() {
        return toUser;
    }

    public void setToUser(User toUser) {
        this.toUser = toUser;
    }


    public int getLinkId() {
        return linkId;
    }

    public void setLinkId(int linkId) {
        this.linkId = linkId;
    }



    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public int getIsBlack() {
        return isBlack;
    }

    public void setIsBlack(int isBlack) {
        this.isBlack = isBlack;
    }

    public int getIsAdd() {
        return isAdd;
    }

    public void setIsAdd(int isAdd) {
        this.isAdd = isAdd;
    }
}
