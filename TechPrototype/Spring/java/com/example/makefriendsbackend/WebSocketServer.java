package com.example.makefriendsbackend;

import com.example.makefriendsbackend.entity.ChatMessage;
import com.example.makefriendsbackend.entity.ChatUserLink;
import com.example.makefriendsbackend.entity.User;
import com.example.makefriendsbackend.repository.ChatMessageRepository;
import com.example.makefriendsbackend.repository.ChatUserLinkRepository;
import com.example.makefriendsbackend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.nio.ByteBuffer;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;


@Component
@ServerEndpoint("/websocket/{userId}")
public class WebSocketServer {
    private static UserRepository userRepository;

    private static ChatUserLinkRepository chatUserLinkRepository;

    private static ChatMessageRepository chatMessageRepository;

    @Autowired
    public void setUserService (UserRepository userRepository) {
        WebSocketServer.userRepository = userRepository;
    }
    @Autowired
    public void setLinkService (ChatUserLinkRepository chatUserLinkRepository) {
        WebSocketServer.chatUserLinkRepository = chatUserLinkRepository;
    }
    @Autowired
    public void setMessageService (ChatMessageRepository chatMessageRepository) {
        WebSocketServer.chatMessageRepository = chatMessageRepository;
    }
    /**
     * 日志工具
     */
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    /**
     * 与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    private Session session;
    /**
     * 用户id
     */
    private String userId;
    /**
     * 用来存放每个客户端对应的MyWebSocket对象
     */
    private static CopyOnWriteArraySet<WebSocketServer> webSockets = new CopyOnWriteArraySet<>();
    /**
     * 用来存在线连接用户信息
     */
    private static ConcurrentHashMap<String, Session> sessionPool = new ConcurrentHashMap<String, Session>();

    /**
     * 链接成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam(value = "userId") String userId) {
        try {
            this.session = session;
            this.userId = userId;
            webSockets.add(this);
            sessionPool.put(userId, session);
            logger.info(userId);
            logger.info("【websocket消息】有新的连接，总数为:" + webSockets.size());
        } catch (Exception e) {
        }
    }

    /**
     * 链接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        try {
            webSockets.remove(this);
            sessionPool.remove(this.userId);
            logger.info("【websocket消息】连接断开，总数为:" + webSockets.size());
        } catch (Exception e) {
        }
    }

    /**
     * 收到客户端消息后调用的方法
     */
    @OnMessage
    public void onMessage(String message) {

        String[] parts = message.split(" ", 2);

        logger.info("【websocket消息】收到客户端消息:" + message);

        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedDate = formatter.format(date);

        int from_uid=Integer.parseInt(this.userId);
        int to_uid=Integer.parseInt(parts[0]);


        String str = this.userId + " " +formattedDate+" "+ parts[1];

        //from发给to
        sendOneMessage(parts[0], str);
        logger.info(parts[0]);
        //from发给from
        sendOneMessage(this.userId, str);


        User from=WebSocketServer.userRepository.findUserById(from_uid);
        User to=WebSocketServer.userRepository.findUserById(to_uid);
        ChatUserLink from_to =WebSocketServer.chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(from,to);

        // ChatUserLink to_from =WebSocketServer.chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(to,from);
        ChatMessage new_mess=new ChatMessage();

        new_mess.setChatUserLink(from_to);
        new_mess.setFromUser(from);
        new_mess.setToUser(to);
        new_mess.setContent(parts[1]);
        new_mess.setType(0);
        new_mess.setIsLatest(0);
        new_mess.setSendTime(formattedDate);

        WebSocketServer.chatMessageRepository.save(new_mess);

    }

    @OnMessage
    public void onMessage(byte[] message) {
        logger.info("【websocket消息】收到客户端消息:" + message);
        byte firstByte = message[0];
        byte secondByte = message[1];
        byte[] remainingBytes = Arrays.copyOfRange(message, 2, message.length);

        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedDate = formatter.format(date);

        int from_uid=Integer.parseInt(this.userId);
        int to_uid=firstByte;

        User from=WebSocketServer.userRepository.findUserById(from_uid);
        User to=WebSocketServer.userRepository.findUserById(to_uid);
        ChatUserLink from_to =WebSocketServer.chatUserLinkRepository.findChatUserLinkByFromUserAndToUser(from,to);
        ChatMessage new_mess=new ChatMessage();
        new_mess.setChatUserLink(from_to);
        new_mess.setFromUser(from);
        new_mess.setToUser(to);
        new_mess.setContent(null);
        new_mess.setIsLatest(0);
        new_mess.setSendTime(formattedDate);



        logger.info(String.valueOf(secondByte));
        if (String.valueOf(secondByte).equals("1")) { //图片
            sendOnePicture(String.valueOf(firstByte), remainingBytes);
            sendOnePicture(this.userId, remainingBytes);

            new_mess.setType(1);
            new_mess.setMedia(remainingBytes);
            WebSocketServer.chatMessageRepository.save(new_mess);
        }
        if (String.valueOf(secondByte).equals("2")) { //音频
            sendOneAudio(String.valueOf(firstByte), remainingBytes);
            sendOneAudio(this.userId, remainingBytes);

            new_mess.setType(2);
            new_mess.setMedia(remainingBytes);
            WebSocketServer.chatMessageRepository.save(new_mess);
        }
    }
    /**
     * 发送错误时的处理
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        logger.error("用户错误,原因:" + error.getMessage());
        error.printStackTrace();
    }

    /**
     * 此为广播消息
     */
    public void sendAllMessage(String message) {
        logger.info("【websocket消息】广播消息:" + message);
        for (WebSocketServer webSocket : webSockets) {
            try {
                if (webSocket.session.isOpen()) {
                    webSocket.session.getAsyncRemote().sendText(message);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 此为单点消息
     */
    public void sendOneMessage(String userId, String message) {

        Session session = sessionPool.get(userId);
        if (session != null && session.isOpen()) {
            try {
                logger.info("【websocket消息】 单点消息:" + message);
                session.getAsyncRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 此为单点消息(多人)
     */
    public void sendMoreMessage(String[] userIds, String message) {
        for (String userId : userIds) {
            Session session = sessionPool.get(userId);
            if (session != null && session.isOpen()) {
                try {
                    logger.info("【websocket消息】 单点消息:" + message);
                    session.getAsyncRemote().sendText(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public void sendOneAudio(String userId,byte[] message) {
        Session session = sessionPool.get(userId);
        if (session != null && session.isOpen()) {
            try {
                byte[] newArray = new byte[message.length + 2];
                newArray[0]=2; //消息类型标记位
                Integer number = Integer.parseInt(this.userId);
                newArray[1]= number.byteValue();
                System.arraycopy(message, 0, newArray, 2, message.length);
                logger.info("【websocket消息】 单点消息:" + Arrays.toString(newArray));
                session.getAsyncRemote().sendBinary(ByteBuffer.wrap(newArray));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /*发送图片*/
    public void sendOnePicture(String userId,byte[] message) {
        Session session = sessionPool.get(userId);
        logger.info(userId);
        if (session != null && session.isOpen()) {
            try {
                byte[] newArray = new byte[message.length + 2];
                newArray[0]=1; //消息类型标记位
                Integer number = Integer.parseInt(this.userId);
                newArray[1]= number.byteValue();
                System.arraycopy(message, 0, newArray, 2, message.length);
                logger.info("【websocket消息】 单点消息:" + Arrays.toString(newArray));
                session.getAsyncRemote().sendBinary(ByteBuffer.wrap(newArray));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}


