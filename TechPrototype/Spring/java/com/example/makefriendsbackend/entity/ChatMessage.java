package com.example.makefriendsbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "chat_message", schema = "make_friend", catalog = "")
public class ChatMessage {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @JsonIgnore
    @Column(name = "message_id")
    private int messageId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "link_id")
    private ChatUserLink chatUserLink;


    @ManyToOne
    @JoinColumn(name = "from_user")
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user")
    private User toUser;

    @Basic
    @Column(name = "content")
    private String content;
    @Basic
    @Column(name = "send_time")
    private String sendTime;
    @Basic
    @Column(name = "type")
    private Integer type;
    @Basic
    @Column(name = "is_latest")
    private Integer isLatest;

    @Basic
    @Column(name = "media")
    private byte[] media;

    public User getToUser() {
        return toUser;
    }


    public void setToUser(User toUser) {
        this.toUser = toUser;
    }

    public User getFromUser() {
        return fromUser;
    }



    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    public ChatUserLink getChatUserLink() {
        return chatUserLink;
    }

    public void setChatUserLink(ChatUserLink chatUserLink) {
        this.chatUserLink = chatUserLink;
    }

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSendTime() {
        return sendTime;
    }

    public void setSendTime(String sendTime) {
        this.sendTime = sendTime;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getIsLatest() {
        return isLatest;
    }

    public void setIsLatest(Integer isLatest) {
        this.isLatest = isLatest;
    }


    public byte[] getMedia() {
        return media;
    }

    public void setMedia(byte[] media) {
        this.media = media;
    }


}
