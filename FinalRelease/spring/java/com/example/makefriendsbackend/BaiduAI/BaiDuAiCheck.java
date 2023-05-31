package com.example.makefriendsbackend.BaiduAI;

import org.json.JSONObject;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class BaiDuAiCheck {

    /**
     *@Author: ZongMao on 2020/3/28 13:14
     *图像审核功能
     *@return
     */

    public static JSONObject checkImg(byte[] files) throws IOException {

        JSONObject response = BaiDuAiConfig.client.imageCensorUserDefined(files, null);
        System.out.println(response);
        return response;
    }

    /**
     *@Author: ZongMao on 2020/3/28 13:14
     *文本审核功能
     *@return
     */
    public static JSONObject checkText(String text){
        // 参数为输入文本
        JSONObject response = BaiDuAiConfig.client.textCensorUserDefined(text);
        return response;
    }


}
