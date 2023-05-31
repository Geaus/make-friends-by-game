import React,{createRef} from 'react';
import type {MenuProps} from "antd";
import {Button, Layout,Popover,Tooltip,message,Drawer,Modal} from "antd";
import {Footer, Header} from "antd/es/layout/layout";
import Emoji from './Emoji';
import {SmileOutlined,AudioOutlined,FileImageOutlined,MergeCellsOutlined} from '@ant-design/icons';
import Recorder from 'js-audio-recorder'
import WebRTCChat from './WebRTCChat';
import {getMessage} from "../../service/ChatService";
import {getUser} from "../../service/UserService";
import moment from "moment";
import Toe from '../Toe';


let websocket;
let videoCallSender;
let gameSender;

export class MessageScreen extends React.Component {
    constructor(props) {
        super(props);

        this.handleEmojiClick = this.handleEmojiClick.bind(this)

        this.state = {gameIsFinished:false,isShowGame:false,isReceiveGame:false, message: "", browse:"<p class=\"message-receive\"></p>", to_user: null, from_user: null, text:"",isReceiveVideo:false,isShowVideo:false};
        let uid = sessionStorage.getItem('uid');
        this.setState({user: uid});
        let baseUrl = "ws://localhost:8080/websocket/"+uid;

        this.text = createRef();
        websocket = new WebSocket(baseUrl);
        websocket.onopen = ()=> {
            console.log("建立 websocket 连接...");
        };
        websocket.onmessage = (event) => {

            const data = event.data;

            if(typeof data==='string'){
                let str = data.split(" ", 4);
                
                let tmp = this.state.browse;
                let to_uid = sessionStorage.getItem('to_uid');
                console.log(to_uid)

                if(str[3]==='视频聊天'){
                    console.log(data);
                    this.setState({ isReceiveVideo: true });
                    videoCallSender = str[0];
                    
                }
                if(str[3]==='答应视频聊天'){
                    this.setState({isShowVideo:true});
                }
                if(str[3]==='拒绝视频聊天'){
                    this.setState({isBusy:true});
                }
                if(str[3]==='视频聊天已结束'){
                    this.setState({isOver:true});
                }
                if(str[3]==='一起游戏吧' && gameSender != sessionStorage.getItem('uid')){
                    this.ReceiveGameTimeout = setTimeout(() => {
                        let to_uid = sessionStorage.getItem("to_uid");
                        let str = to_uid + " " + "我在忙，请稍后再试";
                        console.log(str);
                        websocket.send(str);
                        this.setState({isReceiveGame:false});
                      }, 20000);
                    this.setState({isReceiveGame:true});
                }
                if(str[3]==='开一把'){
                    this.setState({isShowGame:true});
                    clearTimeout(this.gameTimeout);
                }
                if(str[3]==='结束游戏'){
                    gameSender = null;
                    this.setState({isShowGame:false});
                    this.setState({gameIsFinished:true});
                }
                if(str[3]==='拒绝游戏'){
                    gameSender = null;
                    clearTimeout(this.gameTimeout);
                }
                
                    console.log(data);
                    if(str[0] === to_uid) {

                        if(this.state.to_user === null)return;
                        tmp = tmp + "<p class=\"message-receive\">" + this.state.to_user.name + " " + str[1] + " " + str[2] + "</p>";
                        tmp = tmp + "<p class=\"message-receive\">" + str[3] + "</p>";
                    }
                    else if(str[0] === uid){
                        tmp = tmp + "<p class=\"message-send\">" + this.state.from_user.name + " " + str[1] + " " + str[2] + "</p>";
                        tmp = tmp + "<p class=\"message-send\">" + str[3] + "</p>";
                    }

                    else if(str[0].toString() === "-1"){
                        message.error("发送信息不合法");
                    }
                    this.setState({browse: tmp});
                    let div = document.getElementsByClassName("messageScreen")[0];
                    setTimeout(() => {
                        div.scrollTop = div.scrollHeight;
                    }, 0);
                    //setMessage(data)

            }
            else{
                var reader=new FileReader();
                reader.readAsArrayBuffer(data);
                //reader.readAsDataURL(data);
                reader.onload = (event) => {

                    
                    const imageData = event.target.result;
                    const originalView = new Uint8Array(imageData);
                    const newBuffer = new ArrayBuffer(imageData.byteLength-2); // 创建新的 ArrayBuffer，长度比原始的 ArrayBuffer 多 1 字节
                    const newView = new Uint8Array(newBuffer); // 使用视图解释新的 ArrayBuffer
                    newView.set(originalView.subarray(2));
                    const blob = new Blob([newBuffer]);
                    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    let to_uid = sessionStorage.getItem('to_uid');
                    if(originalView[0] === 1){
                        reader.readAsDataURL(blob);
                        reader.onload=(event)=>{
                        const URL=event.target.result;

                        let tmp = this.state.browse;
                            if(originalView[1].toString() === to_uid) {
                                if(this.state.to_user === null)return;
                                tmp = tmp + "<p class=\"message-receive\">" + this.state.to_user.name + " " + currentDate + "</p>";
                                tmp = tmp + `<div class=\"message-receive\">><img src="${URL}" style="width: 300px;" /></div>`;
                            }
                            else if(originalView[1].toString() === uid){
                                tmp = tmp + "<p class=\"message-send\">" + this.state.from_user.name + " " + currentDate + "</p>";
                                tmp = tmp + `<div class=\"message-send\">><img src="${URL}" style="width: 300px;" /></div>`;
                            }
                            this.setState({browse: tmp});
                            let div = document.getElementsByClassName("messageScreen")[0];
                            setTimeout(() => {
                                div.scrollTop = div.scrollHeight;
                            }, 0.2);
                        }    
                    }
                    if(originalView[0] === 2){
                        let tmp = this.state.browse;
                        let audioUrl=URL.createObjectURL(blob);
                        if(originalView[1].toString() === to_uid) {
                            if(this.state.to_user === null)return;
                            tmp = tmp + "<p class=\"message-receive\">" + this.state.to_user.name + " " + currentDate + "</p>";
                            tmp = tmp + `<div class=\"message-receive\">><audio controls src="${audioUrl}" /></div>`;
                        }
                        else if(originalView[1].toString() === uid){
                            tmp = tmp + "<p class=\"message-send\">" + this.state.from_user.name + " " + currentDate + "</p>";
                            tmp = tmp + `<div class=\"message-send\">><audio controls src="${audioUrl}" /></div>`;
                        }
                        this.setState({browse: tmp});
                        let div = document.getElementsByClassName("messageScreen")[0];
                        setTimeout(() => {
                            div.scrollTop = div.scrollHeight;
                        }, 0);
                    }
                    
                };
            }
            //setMessage(data)
        };
        websocket.onerror = (event) => {
            console.log("websocket发生错误..." + event + '\n');
        }

        websocket.onclose = ()=> {
            console.log("关闭 websocket 连接...");
        };
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
        const callback_to_user = (data) => {
            this.setState({to_user: data});
        }
        const callback_from_user = (data) => {
            this.setState({from_user: data});
        }
        let from_uid = sessionStorage.getItem('uid');
        let to_uid = sessionStorage.getItem('to_uid');

        getUser(to_uid, callback_to_user);
        getUser(from_uid, callback_from_user);
        const callback = async(data) => {
            let tmp = "<p class=\"message-receive\"></p>";
            let loading=`<div class=\"loading1\"></div>`;
            this.setState({browse: loading});

            for(let i = 0; i < data.length; i++) {
                let reader = new FileReader();
                    
                const byteCharacters = atob(data[i].media);
                const byteArrays = [];
                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);
                    const byteNumbers = new Array(slice.length);
                    for (let j = 0; j < slice.length; j++) {
                    byteNumbers[j] = slice.charCodeAt(j);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
                const totalLength = byteArrays.reduce((acc, arr) => acc + arr.length, 0);
                const buffer1 = new ArrayBuffer(totalLength);
                const resultArray = new Uint8Array(buffer1);
                let offset = 0;
                for (const byteArray of byteArrays) {
                    resultArray.set(byteArray, offset);
                    offset += byteArray.length;
                }
                const readBlob = new Blob([buffer1]);

                if(data[i].type === 0) {
                    if(data[i].fromUser.id === parseInt(from_uid)) {
                        tmp = tmp + "<p class=\"message-send\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                        tmp = tmp + "<p class=\"message-send\">" + data[i].content + "</p>";
                    }
                    else {
                        tmp = tmp + "<p class=\"message-receive\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                        tmp = tmp + "<p class=\"message-receive\">" + data[i].content + "</p>";
                    }
                }
                else {

                        if(data[i].type === 1){
                            const URL = await new Promise((resolve) => {
                                reader.onload = (event) => {
                                  resolve(event.target.result);
                                };
                                reader.readAsDataURL(readBlob);
                              });
                        

                                if(data[i].fromUser.id === parseInt(from_uid)) {
                                    tmp = tmp + "<p class=\"message-send\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                                    tmp = tmp + `<div class=\"message-send\">><img src="${URL}" style="width: 300px;" /></div>`;
                                }
                                else {
                                    tmp = tmp + "<p class=\"message-receive\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                                    tmp = tmp + `<div class=\"message-receive\">><img src="${URL}" style="width: 300px;" /></div>`;
                                }
                                // this.setState({browse: tmp});

                            
                        }
                        if(data[i].type === 2){
                            //let tmp = this.state.browse;
                            let audioUrl=URL.createObjectURL(readBlob);
                            console.log(from_uid);
                            if(data[i].fromUser.id === parseInt(from_uid)) {
                                tmp = tmp + "<p class=\"message-send\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                                tmp = tmp + `<div class=\"message-send\">><audio controls src="${audioUrl}" /></div>`;

                            }
                            else {
                                tmp = tmp + "<p class=\"message-receive\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                                tmp = tmp + `<div class=\"message-receive\">><audio controls src="${audioUrl}" /></div>`;
                            }
                            // this.setState({browse: tmp});
                        }
                }
            }
            this.setState({browse: tmp});
            let div = document.getElementsByClassName("messageScreen")[0];
            setTimeout(() => {
                div.scrollTop = div.scrollHeight;
            }, 0);
        }
        getMessage(from_uid, to_uid, callback);
        // let div = document.getElementsByClassName("messageScreen")[0];
        // setTimeout(() => {
        //     div.scrollTop = div.scrollHeight;
        // }, 0);
    }


    handleEmojiClick(emoji) {
        const cursorStart = this.text.current.selectionStart;
        this.text.current.value = this.text.current.value.slice(0, cursorStart) + emoji + this.text.current.value.slice(cursorStart)
    }
    sendMessage = () => {
        if (this.text.current.value === "") {
            alert("请重新输入")
            return;
        }
        let to_uid = sessionStorage.getItem("to_uid");
        let str = to_uid + " " + this.text.current.value;
        this.text.current.value = "";
        websocket.send(str);
    }
    sendPicture=()=>{

    }

    clickFile = () => {
        let file = document.getElementById("file")
        file.click();
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file)  console.log('ok');
    
        console.log('ok');

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            if(imageData.byteLength<20*1024*1024){
                const originalView = new Uint8Array(imageData); // 使用视图解释原始的 ArrayBuffer

                const newBuffer = new ArrayBuffer(imageData.byteLength + 2); // 创建新的 ArrayBuffer，长度比原始的 ArrayBuffer 多 1 字节

                const newView = new Uint8Array(newBuffer); // 使用视图解释新的 ArrayBuffer

                newView[0] = sessionStorage.getItem("to_uid"); // 在新的 ArrayBuffer 的开头位置设置新的字节值,这是userId
                newView[1] = 1; //消息类型，1是图片

                newView.set(originalView, 2);
                console.log(newView[1]);
                // 发送图片数据到后端
                websocket.send(newBuffer);
            }
            else message.error("图片过大，发送失败！")
        };
    
        reader.readAsArrayBuffer(file);
        let file1 = document.getElementById("file");
        file1.value='';

    };

    audiorecorder = null;
    hasAudioPermission = true;
    startAudio = () => {
        
        this.audiorecorder = new Recorder()
        this.hasAudioPermission = true;
        this.audiorecorder
            .start()
            .then(() => {
                console.log("start audio...")
            }, (_error) => {
                this.hasAudioPermission = false;
                message.error("录音权限获取失败！")
            })
    }

    /**
     * 停止录制音频
     */
    stopAudio = () => {
        
        if (!this.hasAudioPermission) {
            return;
        }
        let blob = this.audiorecorder.getWAVBlob();
        
        this.audiorecorder.stop()
        this.audiorecorder.destroy()
            .then(() => {
                this.audiorecorder = null;
            });
        this.audiorecorder = null;

        let reader = new FileReader()
        reader.readAsArrayBuffer(blob)

        reader.onload = ((e) => {
            let audioData = e.target.result
            console.log("audio's size is:"+audioData.byteLength)
            if(audioData.byteLength<1024*1024*20){
                const originalView = new Uint8Array(audioData); // 使用视图解释原始的 ArrayBuffer

                const newBuffer = new ArrayBuffer(audioData.byteLength + 2); // 创建新的 ArrayBuffer，长度比原始的 ArrayBuffer 多 1 字节

                const newView = new Uint8Array(newBuffer); // 使用视图解释新的 ArrayBuffer

                newView[0] = sessionStorage.getItem("to_uid"); // 在新的 ArrayBuffer 的开头位置设置新的字节值,userId
                newView[1] = 2; //2为音频

                newView.set(originalView, 2);
                console.log(newView[1]);
                
                websocket.send(newBuffer);
            }
            else message.error("语音消息太长，请重新录制！")

        })

    }

    setIsReceiveVideo = () => {
        this.setState({isReceiveVideo:false});
    }

    setIsShowVideo = () =>{
        this.setState({isShowVideo:false});
    }

    setIsBusy = () =>{
        this.setState({isBusy:false});
    }

    setIsOver = () => {
        this.setState({isOver:false});
    }

    setGameIsFinished = () =>{
        this.setState({gameIsFinished:false})
    }

    sendGame = () =>{
        let to_uid = sessionStorage.getItem("to_uid");
        let str = to_uid + " " + "一起游戏吧";
        console.log(str);
        websocket.send(str);
        gameSender=sessionStorage.getItem("uid");
        this.gameTimeout = setTimeout(() => {
            message.error("好友在忙哦，请稍后再试！");
            gameSender = null;
        }, 20000);
    }
    startGame = () => {
        clearTimeout(this.ReceiveGameTimeout);
        let to_uid = sessionStorage.getItem("to_uid");
        let str = to_uid + " " + "开一把";
        console.log(str);
        websocket.send(str);
        this.setState({isShowGame:true});
        this.setState({isReceiveGame:false});
    }
    onCancel = () =>{
        clearTimeout(this.ReceiveGameTimeout);
        let to_uid = sessionStorage.getItem("to_uid");
        let str = to_uid + " " + "拒绝游戏";
        console.log(str);
        websocket.send(str);
        this.setState({isReceiveGame:false});
    }
    onClose = () => {
        let to_uid = sessionStorage.getItem("to_uid");
        let str = to_uid + " " + "结束游戏";
        console.log(str);
        websocket.send(str);
        this.setState({isShowGame:false});
    }
    
    render() {
        let html = {__html:this.state.browse};
        // upload组件配置
        const props = {
            beforeUpload: file => {
                this.setState({
                    file: file,
                    hidden: false,
                    type: "file",
                }, () => {
                    window.file = this.state.file
                });
                return false;
            },
            showUploadList: false,
        }

        return (
            <div className={"message"}>
                <div className={"messageScreen"}>
                    <div dangerouslySetInnerHTML={html}></div>
                </div>
                <div className={"messageSend"}>
                    <Layout>
                        <Header style={{ height: '50px' }} className={"ant-header-in-send"}>
                            <Popover placement="topLeft" title={false}
                                content={<Emoji handleEmojiClick={this.handleEmojiClick}/>} trigger="hover">
                                <Button
                                    shape="circle"
                                    style={{ marginRight: 10 }}
                                    icon={<SmileOutlined />}
                                />
                            </Popover>
                            <Tooltip title="上传图片或者文件">
                                <input type='file' id='file' onChange={this.handleFileChange} hidden />
                                <Button
                                    onClick={this.clickFile}
                                    shape="circle"
                                    style={{ marginRight: 10 }}
                                    icon={<FileImageOutlined />}
                                />
                            </Tooltip>
                            <Tooltip title="联机游戏">
                                <Button
                                    shape="circle"
                                    onClick={this.sendGame}
                                    style={{ marginRight: 10 }}
                                    icon={<MergeCellsOutlined />}
                                />
                            </Tooltip>
                            <Modal title="联机游戏" 
                                open={this.state.isReceiveGame}
                                onOk={this.startGame}
                                onCancel={this.onCancel}
                                >
                                <p>好友邀请您联机游戏</p>
                            </Modal>
                            <Tooltip title="发送语音">
                                <Button
                                    shape="circle"
                                    onMouseDown={this.startAudio}
                                    onMouseUp={this.stopAudio}
                                    onTouchStart={this.startAudio}
                                    onTouchEnd={this.stopAudio}
                                    style={{ marginRight: 10 }}
                                    icon={<AudioOutlined />}
                                />
                            </Tooltip>
                            <WebRTCChat websocket ={websocket} 
                                isReceiveVideo = {this.state.isReceiveVideo}
                                isShowVideo = {this.state.isShowVideo}
                                isBusy = {this.state.isBusy}
                                isOver = {this.state.isOver}
                                setIsBusy = {this.setIsBusy}
                                setIsReceiveVideo = {this.setIsReceiveVideo}
                                setIsShowVideo = {this.setIsShowVideo}
                                videoCallSender={videoCallSender}
                                setIsOver = {this.setIsOver} />
                             
                            <Drawer width='1000px'
                                forceRender={true}
                                title="游戏面板"
                                placement="right"
                                onClose={this.onClose}
                                open={this.state.isShowGame}
                            >
                                <Toe 
                                    gameSender={gameSender}
                                    gameIsFinished={this.state.gameIsFinished}
                                    setGameIsFinished = {this.setGameIsFinished}/>
                            </Drawer>
                            
                            <div className={"sending"}>
                                <Button  className={"sendingButton"} block={true} onClick={this.sendMessage}>发送信息</Button>
                            </div>

                        </Header>
                        <Footer style={{ height: '50px' }} className={"ant-footer-in-send"}>
                            <textarea  className={"inputBox"}  ref={this.text}></textarea>
                        </Footer> 
                    </Layout>
                </div>
            </div>
            
        )
    }
}