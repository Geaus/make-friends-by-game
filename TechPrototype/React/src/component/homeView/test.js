<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

    <title>测试音频</title>
    <script>

    </script>
    <!-- 【1.1】引入核心文件 -->
    <script src="js/recorder-core.js"></script>

    <!-- 【1.2】引入相应格式支持文件；如果需要多个格式支持，把这些格式的编码引擎js文件放到后面统统加载进来即可 -->
    <script src="js/mp3.js"></script>
    <script src="js/mp3-engine.js"></script>
    <script src="js/wav.js"></script>

    <!-- 【1.3】引入可选的扩展支持项，如果不需要这些扩展功能可以不引入 -->
    <script src="js/frequency.histogram.view.js"></script>
    <script src="js/lib.fft.js"></script>
</head>
<body>

<!-- 【2】构建界面 -->
<div class="main">

    <div class="mainBox">
        <!-- 按钮控制区域 -->
        <div class="pd btns">
            <div>
                <button onclick="recOpen()" style="margin-right:10px">打开录音,请求权限</button>
                <button onclick="recClose()" style="margin-right:0">关闭录音,释放资源</button>
            </div>

            <button onclick="recStart()">录制</button>
            <button onclick="recStop()" style="margin-right:80px">停止</button>

        </div>

        <!-- 波形绘制区域 -->
        <div class="pd recpower">
            <div style="height:40px;width:300px;background:#999;position:relative;">
                <div class="recpowerx" style="height:40px;background:#0B1;position:absolute;"></div>
                <div class="recpowert" style="padding-left:50px; line-height:40px; position: relative;"></div>
            </div>
        </div>
        <div class="pd waveBox">
            <div style="border:1px solid #ccc;display:inline-block"><div style="height:100px;width:300px;" class="recwave"></div></div>
        </div>
    </div>
</div>
<!-- 【3】实现录音逻辑 -->
<script>
    let websocketUrl = "ws://"+window.location.host+"/voiceChat/voice";
    var testSampleRate=16000;
    var testBitRate=16;

    var SendInterval=300;//mp3 chunk数据会缓冲，当pcm的累积时长达到这个时长，就会传输发送。这个值在takeoffEncodeChunk实现下，使用0也不会有性能上的影响。

    //重置环境
    var RealTimeSendTryReset=function(){
        realTimeSendTryTime=0;
    };

    var realTimeSendTryTime=0;
    var realTimeSendTryNumber;
    var transferUploadNumberMax;
    var realTimeSendTryBytesChunks = [];
    var realTimeSendTryClearPrevBufferIdx;
    var realTimeSendTryWavTestBuffers;
    var realTimeSendTryWavTestSampleRate;

    var blob=null,meta=null;
    var chunkData =null;
    //=====实时处理核心函数==========
    var RealTimeSendTry=function(chunkBytes,isClose){
        if(chunkBytes){//推入缓冲再说
            realTimeSendTryBytesChunks.push(chunkBytes);
        }

        let t1=Date.now();
        if(!isClose && t1-realTimeSendTryTime<SendInterval){
            return;//控制缓冲达到指定间隔才进行传输
        }
        realTimeSendTryTime=t1;
        var number=++realTimeSendTryNumber;


        //mp3缓冲的chunk拼接成一个更长点的mp3
        var len=0;
        for(var i=0;i<realTimeSendTryBytesChunks.length;i++){
            len+=realTimeSendTryBytesChunks[i].length;
        }
        chunkData= new Uint8Array(len);
        for(var i=0,idx=0;i<realTimeSendTryBytesChunks.length;i++){
            var chunk=realTimeSendTryBytesChunks[i];
            chunkData.set(chunk,idx);
            idx+=chunk.length;
        }

        //推入传输
        meta={};
        if(chunkData.length>0){//mp3不是空的
            blob=new Blob([chunkData],{type:"audio/mp3"});
            meta=Recorder.mp3ReadMeta([chunkData.buffer],chunkData.length)||{};//读取出这个mp3片段信息
        }
        TransferUpload(number
            ,blob
            ,meta.duration||0
            ,{set:{
                    type:"mp3"
                    ,sampleRate:meta.sampleRate
                    ,bitRate:meta.bitRate
                }}
            ,isClose
        );
        realTimeSendTryBytesChunks = null;
        chunkData = null;
        meta = null;
        blob = null;
        realTimeSendTryBytesChunks = [];
    };

    //=====实时处理时清理一下内存（延迟清理），本方法先于RealTimeSendTry执行======
    var RealTimeOnProcessClear=function(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd){
        if(realTimeSendTryTime==0){
            realTimeSendTryTime=Date.now();
            realTimeSendTryNumber=0;
            transferUploadNumberMax=0;
            realTimeSendTryBytesChunks=[];
            realTimeSendTryClearPrevBufferIdx=0;
            realTimeSendTryWavTestSampleRate=0;
        }

        //清理PCM缓冲数据，最后完成录音时不能调用stop，因为数据已经被清掉了
        //这里进行了延迟操作（必须要的操作），只清理上次到现在的buffer
        for(var i=realTimeSendTryClearPrevBufferIdx;i<newBufferIdx;i++){
            buffers[i]=null;
        }
        buffers=null;
        realTimeSendTryClearPrevBufferIdx=newBufferIdx;
    };

    //=====数据传输函数==========
    var TransferUpload=function(number,blobOrNull,duration,blobRec,isClose){
        transferUploadNumberMax=Math.max(transferUploadNumberMax,number);
        if(blobOrNull){
            ws.send(blobOrNull);
        }

        if(isClose){
            ws.close();
            console.info("No."+(number<100?("000"+number).substr(-3):number)+":已停止传输");
        }
    };



    //调用录音
    var rec;
    var wave=null;
    function recStart(){
        if(rec){
            rec.close();
        }
        rec=Recorder({
            type:"mp3"
            ,sampleRate:testSampleRate
            ,bitRate:testBitRate
            ,onProcess:function(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd){
                wave.input(buffers[buffers.length-1],powerLevel,bufferSampleRate);
                RealTimeOnProcessClear(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd);
            }
            ,takeoffEncodeChunk:function(chunkBytes){
                //接管实时转码，推入实时处理
                RealTimeSendTry(chunkBytes,false);
            }
        });


        var t=setTimeout(function(){
            console.info("无法录音：权限请求被忽略（超时假装手动点击了确认对话框）",1);
        },8000);

        rec.open(function(){//打开麦克风授权获得相关资源
            clearTimeout(t);
            rec.start();//开始录音

            useWebSocket();
            wave=Recorder.FrequencyHistogramView({elem:".recwave"});
            RealTimeSendTryReset();//重置
        },function(msg,isUserNotAllow){
            clearTimeout(t);
            console.info((isUserNotAllow?"UserNotAllow，":"")+"无法录音:"+msg, 1);
        });
    };
    function recStop(){
        rec.close();//直接close掉即可，这个例子不需要获得最终的音频文件
        RealTimeSendTry(null,true);//最后一次发送
    };

    var ws = null; //实现WebSocket
    function useWebSocket() {
        ws = new WebSocket(websocketUrl);
        ws.binaryType = 'arraybuffer'; //传输的是 ArrayBuffer 类型的数据
        ws.onopen = function () {
            console.log('握手成功');
            if (ws.readyState == 1) { //ws进入连接状态，则每隔500毫秒发送一包数据
                console.log('连接状态成功');
                rec.start();
            }
        };
        var audioContext = new AudioContext();
        ws.onmessage = function (msg) {
            console.info('---22222-----'+msg.data);
             audioContext.decodeAudioData(msg.data, function(buffer) {//解码成pcm流
                var audioBufferSouceNode = audioContext.createBufferSource();
                audioBufferSouceNode.buffer = buffer;
                audioBufferSouceNode.connect(audioContext.destination);
                audioBufferSouceNode.start(0);
            }, function(e) {
                console.log("failed to decode the file"+e);
            });
        };

        ws.onerror = function (err) {
            console.info('------WS------END------'+err)
        }

        ws.onclose=function(e){
            console.info('-------WS------END------');
        };

    }

</script>

<script>
    if(/mobile/i.test(navigator.userAgent)){
        //移动端加载控制台组件
        var elem=document.createElement("script");
        elem.setAttribute("type","text/javascript");
        elem.setAttribute("src","https://cdn.bootcss.com/eruda/1.5.4/eruda.min.js");
        document.body.appendChild(elem);
        elem.onload=function(){
            eruda.init();
        };
    };
</script>


<style>
    body{
        word-wrap: break-word;
        background:#f5f5f5 center top no-repeat;
        background-size: auto 680px;
    }
    pre{
        white-space:pre-wrap;
    }
    a{
        text-decoration: none;
        color:#06c;
    }
    a:hover{
        color:#f00;
    }

    .main{
        max-width:700px;
        margin:0 auto;
        padding-bottom:80px
    }

    .mainBox{
        margin-top:12px;
        padding: 12px;
        border-radius: 6px;
        background: #fff;
        --border: 1px solid #f60;
        box-shadow: 2px 2px 3px #aaa;
    }


    .btns button{
        display: inline-block;
        cursor: pointer;
        border: none;
        border-radius: 3px;
        background: #f60;
        color:#fff;
        padding: 0 15px;
        margin:3px 20px 3px 0;
        line-height: 36px;
        height: 36px;
        overflow: hidden;
        vertical-align: middle;
    }
    .btns button:active{
        background: #f00;
    }

    .pd{
        padding:0 0 6px 0;
    }
    .lb{
        display:inline-block;
        vertical-align: middle;
        background:#00940e;
        color:#fff;
        font-size:14px;
        padding:2px 8px;
        border-radius: 99px;
    }
</style>

</body>
</html>


