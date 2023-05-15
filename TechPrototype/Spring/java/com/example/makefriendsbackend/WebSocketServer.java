package com.example.makefriendsbackend;

import com.sun.xml.internal.ws.addressing.v200408.MemberSubmissionWsaServerTube;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * @author hanjinqun
 * @date 2022/10/24
 * websocket操作类
 */
@Component
@ServerEndpoint("/websocket/{userId}")
public class WebSocketServer {
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
            logger.info("【websocket消息】连接断开总数为:" + webSockets.size());
        } catch (Exception e) {
        }
    }

    /**
     * 收到客户端消息后调用的方法
     */
    @OnMessage
    public void onMessage(String message) {
        logger.info("【websocket消息】收到客户端消息:" + message);
        String[] parts = message.split(" ", 2);

        sendOneMessage(parts[0], parts[1]);
    }

    @OnMessage
    public void onMessage(byte[] message) {
        logger.info("【websocket消息】收到客户端消息:" + message);
        byte firstByte = message[0];
        byte secondByte = message[1];
        byte[] remainingBytes = Arrays.copyOfRange(message, 2, message.length);
        logger.info(String.valueOf(secondByte));
        if(String.valueOf(secondByte).equals("1")) { //图片
            sendOnePicture(String.valueOf(firstByte), remainingBytes);
        }
        if(String.valueOf(secondByte).equals("2")) { //音频
            sendOneAudio(String.valueOf(firstByte), remainingBytes);
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

    /* 发送音频*/
    public void sendOneAudio(String userId,byte[] message) {
        Session session = sessionPool.get(userId);
        if (session != null && session.isOpen()) {
            try {
                byte[] newArray = new byte[message.length + 1];
                newArray[0]=2; //消息类型标记位
                System.arraycopy(message, 0, newArray, 1, message.length);
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
                byte[] newArray = new byte[message.length + 1];
                newArray[0]=1; //消息类型标记位
                System.arraycopy(message, 0, newArray, 1, message.length);
                logger.info("【websocket消息】 单点消息:" + Arrays.toString(newArray));
                session.getAsyncRemote().sendBinary(ByteBuffer.wrap(newArray));
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
}
