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

    public User getFromUserEntity() {
        return fromUser;
    }

    public void setFromUserEntity(User fromUser) {
        this.fromUser = fromUser;
    }

    public User getToUserEntity() {
        return toUser;
    }

    public void setToUserEntity(User toUser) {
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

}
