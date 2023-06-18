package com.example.makefriendsbackend.controller;

import com.example.makefriendsbackend.entity.*;
import com.example.makefriendsbackend.repository.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@Component
class chatControllerTest {
    private chatController chatController;
    private friendController friendController;
    private userController userController;
    private logInController logInController;
    private contactController contactController;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ChatUserLinkRepository chatUserLinkRepository;
    @Mock
    private ChatMessageRepository chatMessageRepository;
    @Mock
    private TagRepository tagRepository;
    @Mock
    private TagUserRepository tagUserRepository;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        chatController = new chatController();
        userController = new userController();
        friendController = new friendController();
        logInController = new logInController();
        contactController = new contactController();

        chatController.chatMessageRepository = chatMessageRepository;
        chatController.userRepository = userRepository;
        chatController.chatUserLinkRepository = chatUserLinkRepository;

        userController.userRepository = userRepository;
        userController.chatUserLinkRepository = chatUserLinkRepository;
        userController.tagUserRepository = tagUserRepository;
        userController.tagRepository = tagRepository;

        friendController.chatUserLinkRepository = chatUserLinkRepository;
        friendController.userRepository = userRepository;

        logInController.userRepository = userRepository;

        contactController.chatUserLinkRepository = chatUserLinkRepository;
        contactController.chatMessageRepository = chatMessageRepository;
        contactController.userRepository = userRepository;

    }

    @AfterEach
    void tearDown() {
        this.chatController = null;
    }

    @Test
    void getMessages() {
        Tag oneTag = new Tag();
        List<Tag> tag_empty = new ArrayList<>();
        oneTag.setTagid(1);
        oneTag.setTagname("二次元");

        List<Tag> tags = new ArrayList<>();
        tags.add(oneTag);

        User from_user = new User();
        User to_user = new User();
        from_user.setId(1);
        from_user.setName("小明");
        from_user.setPassword("111");
        from_user.setTags(tags);
        to_user.setId(2);
        to_user.setTags(tags);

        TagUser tagUser = new TagUser();
        tagUser.setUserid(1);
        tagUser.setTagid(1);

        byte[] bytes = new byte[1024];

        ChatUserLink link_1 = new ChatUserLink();
        link_1.setLinkId(1);
        link_1.setFromUser(from_user);
        link_1.setToUser(to_user);
        link_1.setIsAdd(1);
        link_1.setIsBlack(0);

        ChatUserLink link_2 = new ChatUserLink();

        List<ChatUserLink> link_list = new ArrayList<>();
        List<ChatUserLink> link_empty = new ArrayList<>();
        link_list.add(link_1);

        List<ChatMessage> messages_1 = new ArrayList<>();
        List<ChatMessage> messages_2 = new ArrayList<>();
        ChatMessage message = new ChatMessage();
        message.setMessageId(1);
        message.setChatUserLink(link_1);
        message.setFromUser(from_user);
        message.setToUser(to_user);
        message.setContent("aaa");
        message.setSendTime("2023-05-15 20:08:00");
        message.setType(1);
        message.setIsLatest(1);
        messages_1.add(message);

        ChatMessage message_another = new ChatMessage();
        message_another.setMessageId(2);
        message_another.setChatUserLink(link_2);
        message_another.setFromUser(to_user);
        message_another.setToUser(from_user);
        message_another.setContent("bbb");
        message_another.setSendTime("2023-05-1");
        message_another.setType(2);
        message_another.setIsLatest(1);
        messages_2.add(message_another);

        User unaccept_user = new User();
        unaccept_user.setId(3);
        unaccept_user.setTags(tags);
        unaccept_user.setName("小红");
        ChatUserLink link_3 = new ChatUserLink();
        link_3.setIsAdd(0);
        link_3.setToUser(from_user);
        link_3.setFromUser(unaccept_user);
        link_3.setLinkId(3);
        link_3.setIsBlack(1);
        List<User> onlyUser3 = new ArrayList<>();
        onlyUser3.add(unaccept_user);
        List<ChatUserLink> unaccept_list = new ArrayList<>();
        unaccept_list.add(link_3);
        List<ChatUserLink> getContact_result = new ArrayList<>();
        getContact_result.add(link_1);
        getContact_result.add(link_3);

        User user_strange = new User();
        user_strange.setId(4);
        user_strange.setTags(tag_empty);

        ChatUserLink link_4 = new ChatUserLink();
        link_4.setFromUser(unaccept_user);
        link_4.setToUser(user_strange);
        List<ChatUserLink> your_linkList = new ArrayList<>();
        your_linkList.add(link_4);

        List<User> user_empty = new ArrayList<>();
        List<User> user_all = new ArrayList<>();
        user_all.add(from_user);
        user_all.add(to_user);
        user_all.add(unaccept_user);
        user_all.add(user_strange);

        TagWithoutMapping tagWithoutMapping = new TagWithoutMapping();
        tagWithoutMapping.setTagid(1);
        List<TagWithoutMapping> tagWithoutMappings = new ArrayList<>();
        tagWithoutMappings.add(tagWithoutMapping);

        when(userRepository.findUserById(1)).thenReturn(from_user);
        when(userRepository.findUserById(2)).thenReturn(to_user);
        when(userRepository.findUserById(3)).thenReturn(unaccept_user);
        when(userRepository.findUserById(4)).thenReturn(user_strange);
        when(chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(from_user, to_user)).thenReturn(link_1);
        when(chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(to_user, from_user)).thenReturn(link_2);
        when(chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(unaccept_user, from_user)).thenReturn(link_3);
        when(chatMessageRepository.findChatMessagesByChatUserLink(link_1)).thenReturn(messages_1);
        when(chatMessageRepository.findChatMessagesByChatUserLink(link_2)).thenReturn(messages_2);
        when(chatUserLinkRepository.findChatUserLinksByFromUser(from_user)).thenReturn(link_list);
        when(chatUserLinkRepository.findChatUserLinksByFromUser(unaccept_user)).thenReturn(your_linkList);
        when(chatUserLinkRepository.findChatUserLinksByToUser(from_user)).thenReturn(unaccept_list);
        when(userRepository.findUserByName("小明")).thenReturn(from_user);
        when(userRepository.findUsersByNameContaining("小红")).thenReturn(onlyUser3);
        when(userRepository.findAll()).thenReturn(user_all);
        when(tagRepository.findAll()).thenReturn(tags);
        when(tagRepository.findTagByTagid(1)).thenReturn(oneTag);
        when(tagUserRepository.findTagUserByUseridAndTagid(1,1)).thenReturn(tagUser);


        //test chat
        List<ChatMessage> chat_1 = chatController.getMessages(1, 2);
        assertEquals(chat_1.get(0).getContent(), "aaa");

        //test login
        int login_1 = logInController.login("小明", "111");
        int login_2 = logInController.login("小明", "222");
        assertEquals(login_1, 1);
        assertEquals(login_2, 0);

        //test friend
        List<User> friend_1 = friendController.getFriend(1);
        assertEquals(friend_1.get(0).getId(),2);
        List<User> friend_2 = friendController.getBlack(1);
        assertEquals(friend_2, user_empty);
        contactController.blackContact(1,2);
        List<User> friend_3 = friendController.getBlack(1);
        assertEquals(friend_3.get(0), to_user);
        contactController.reAddContact(1,2);
        List<UserWithFlag> friend_4 = friendController.recommendFriend(1);
        assertEquals(friend_4.get(0).getId(), 3);

        //test contact
        List<ChatUserLink> contact_1 = contactController.getContact(1);
        assertEquals(contact_1, getContact_result);
        contactController.deleteContact(1,2);


        //test user
        User user_1 = userController.getUser(1);
        assertEquals(user_1.getId(), 1);
        Tag user_2 = userController.getTags().get(0);
        assertEquals(user_2, oneTag);
        List<UserWithFlag> user_3 = userController.searchUser("小红", 1, tagWithoutMappings);
        assertEquals(user_3.get(0).getId(), 3);
        userController.addFriend(1, 4);
        userController.acceptFriend(1, 3);
        userController.rejectFriend(4, 1);
        User user_4 = userController.newUser("小明", "111");
        assertEquals(user_4.getId(), -1);
        userController.newUser("小蓝", "111");
        List<Tag> user_5 = userController.addTag(4, 1);
        assertEquals(user_5.get(0).getTagid(), 1);
        User user_6 = userController.changeName(2, "小明");
        assertEquals(user_6.getId(), -1);
        User user_7 = userController.changeName(1, "小明");
        assertEquals(user_7.getId(), 1);
        userController.changePassword(1, "222");
        userController.removeTag(1, 1);
        try {
            userController.uploadFile(1, bytes);
        } catch (IOException ignored) {
        }
    }
}