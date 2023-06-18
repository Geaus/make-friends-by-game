package com.example.makefriendsbackend.BaiduAI;

import com.baidu.aip.contentcensor.AipContentCensor;

public class BaiDuAiConfig {
    public static final String APP_ID ="34224426";

    public static final String API_KEY = "Mt73f7GhSqRaFsITSZFYLOA9";

    public static final String SECRET_KEY = "58PmgDYLer2Gt5npf1YcQ57SMeKxKhNU";

    /*初始化客户端*/
    public static final AipContentCensor client = new AipContentCensor(APP_ID, API_KEY, SECRET_KEY);


}
