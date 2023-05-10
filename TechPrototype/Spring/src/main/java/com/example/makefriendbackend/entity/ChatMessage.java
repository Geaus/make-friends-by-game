package com.example.makefriendsbackend.entity;

import javax.persistence.*;

@Entity
@Table(name = "chat_message", schema = "make_friend", catalog = "")
public class ChatMessage {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "message_id")
    private int messageId;

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


}
