package com.example.makefriendsbackend.controller;

import com.example.makefriendsbackend.entity.*;
import com.example.makefriendsbackend.repository.ChatUserLinkRepository;
import com.example.makefriendsbackend.repository.TagRepository;
import com.example.makefriendsbackend.repository.TagUserRepository;
import com.example.makefriendsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
public class userController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    TagUserRepository tagUserRepository;

    @Autowired
    ChatUserLinkRepository chatUserLinkRepository;

    @RequestMapping("getUser")
    public User getUser(@RequestParam int uid) {
        User user = userRepository.findUserById(uid);
        return user;
    }

    @RequestMapping("getTag")
    public List<Tag> getTags() {
        System.out.println(1);
        return tagRepository.findAll();
    }

    @RequestMapping("searchUser")
    public List<UserWithFlag> searchUser(@RequestParam String userName, @RequestParam int uid, @RequestBody List<TagWithoutMapping> tags) {
        List<User> users = userRepository.findUsersByNameContaining(userName);
        List<UserWithFlag> res = new ArrayList<>();
        User me = userRepository.findUserById(uid);
        for(int i = 0; i < users.size(); i++) {
            if(users.get(i).getId() == uid)continue;
            ChatUserLink chatUserLink = chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(me, users.get(i));
            ChatUserLink rev = chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(users.get(i), me);
            if(chatUserLink != null && chatUserLink.getIsAdd() == 1)continue;
            boolean ok = true;
            List<Tag> userTag = users.get(i).getTags();
            for(int j = 0; j < tags.size(); j++) {
                boolean ok_2 = false;
                for(int k = 0; k < userTag.size(); k++) {
                    if(userTag.get(k).getTagid() == tags.get(j).getTagid()){
                        ok_2 = true;
                        break;
                    }
                }
                if(!ok_2)ok = false;
            }
            if(ok) {
                UserWithFlag user = new UserWithFlag();
                user.setName(users.get(i).getName());
                user.setId(users.get(i).getId());
                if(chatUserLink != null && chatUserLink.getIsAdd() == 0)user.setAddFlag(1);
                else if(chatUserLink == null && rev != null)user.setAddFlag(2);
                else user.setAddFlag(0);
                res.add(user);
            }
        }
        return res;
    }

    @RequestMapping("addFriend")
    public void addFriend(@RequestParam int from_id, @RequestParam int to_id){
        ChatUserLink chatUserLink_1 = new ChatUserLink();
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedDate = formatter.format(date);
        chatUserLink_1.setCreateTime(formattedDate);
        User from_user = userRepository.findUserById(from_id);
        User to_user = userRepository.findUserById(to_id);
        chatUserLink_1.setFromUser(from_user);
        chatUserLink_1.setToUser(to_user);
        chatUserLink_1.setIsBlack(0);
        chatUserLink_1.setIsAdd(0);
        chatUserLinkRepository.save(chatUserLink_1);
    }

    @RequestMapping("accept")
    public void acceptFriend(@RequestParam int from_id, @RequestParam int to_id) {
        User me = userRepository.findUserById(from_id);
        User you = userRepository.findUserById(to_id);
        ChatUserLink chatUserLink_1 = chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(you, me);
        chatUserLink_1.setIsAdd(1);
        chatUserLinkRepository.save(chatUserLink_1);
        ChatUserLink chatUserLink_2 = new ChatUserLink();
        chatUserLink_2.setFromUser(me);
        chatUserLink_2.setToUser(you);
        chatUserLink_2.setIsBlack(0);
        chatUserLink_2.setIsAdd(1);
        chatUserLink_2.setCreateTime(chatUserLink_1.getCreateTime());
        chatUserLinkRepository.save(chatUserLink_2);
    }

    @RequestMapping("reject")
    public void rejectFriend(@RequestParam int from_id, @RequestParam int to_id) {
        User me = userRepository.findUserById(from_id);
        User you = userRepository.findUserById(to_id);
        ChatUserLink chatUserLink_1 = chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(you, me);
        chatUserLinkRepository.delete(chatUserLink_1);
    }

    @RequestMapping("newUser")
    public void newUser(@RequestParam String username,@RequestParam String password) {
        User u=new User();
        u.setName(username);
        u.setPassword(password);
        userRepository.save(u);

    }

    @Transactional
    @RequestMapping("addTag")
    public List<Tag> addTag(@RequestParam int uid,@RequestParam int tagid) {

        User u=userRepository.findUserById(uid);
        Tag t=tagRepository.findTagByTagid(tagid);

        TagUser tmp=new TagUser();

        tmp.setTagid(tagid);
        tmp.setUserid(uid);
        tagUserRepository.save(tmp);

        List<Tag> list=u.getTags();
        list.add(t);
        u.setTags(list);

        return u.getTags();

    }

    @RequestMapping("changeName")
    public User changeName(@RequestParam int uid,@RequestParam String name) {

        User u=userRepository.findUserById(uid);
        u.setName(name);
        userRepository.save(u);

        return u;

    }
}
