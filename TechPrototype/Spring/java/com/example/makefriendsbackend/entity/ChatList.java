package com.example.makefriendsbackend.entity;

import javax.persistence.*;

@Entity
@Table(name = "chat_list", schema = "make_friend", catalog = "")
public class ChatList {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "list_id")
    private int listId;

    @ManyToOne
    @JoinColumn(name = "link_id")
    private ChatUserLink chatUserLink;

    @ManyToOne
    @JoinColumn(name = "from_user")
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user")
    private User toUser;


    @Basic
    @Column(name = "from_window")
    private Integer fromWindow;
    @Basic
    @Column(name = "to_window")
    private Integer toWindow;
    @Basic
    @Column(name = "unread")
    private Integer unread;
    @Basic
    @Column(name = "status")
    private Integer status;

    public User getToUserEntity() {
        return toUser;
    }

    public void setToUserEntity(User toUser) {
        this.toUser = toUser;
    }

    public User getFromUserEntity() {
        return fromUser;
    }

    public void setFromUserEntity(User fromUser) {
        this.fromUser = fromUser;
    }

    public ChatUserLink getChatUserLinkEntity() {
        return chatUserLink;
    }

    public void setChatUserLinkEntity(ChatUserLink chatUserLink) {
        this.chatUserLink = chatUserLink;
    }

    public int getListId() {
        return listId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }







    public Integer getFromWindow() {
        return fromWindow;
    }

    public void setFromWindow(Integer fromWindow) {
        this.fromWindow = fromWindow;
    }

    public Integer getToWindow() {
        return toWindow;
    }

    public void setToWindow(Integer toWindow) {
        this.toWindow = toWindow;
    }

    public Integer getUnread() {
        return unread;
    }

    public void setUnread(Integer unread) {
        this.unread = unread;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }


}
