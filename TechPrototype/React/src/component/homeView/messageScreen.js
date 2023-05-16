import React,{createRef} from 'react';
import type {MenuProps} from "antd";
import {Button, Layout,Popover,Tooltip,message,Drawer} from "antd";
import {Footer, Header} from "antd/es/layout/layout";
import Emoji from './Emoji';
import {SmileOutlined,AudioOutlined,FileImageOutlined,PhoneOutlined,PoweroffOutlined} from '@ant-design/icons';
import Recorder from 'js-audio-recorder'
import WebRTCChat from './WebRTCChat';
import {getMessage} from "../../service/ChatService";
import {getUser} from "../../service/UserService";
import moment from "moment";


let websocket;

export class MessageScreen extends React.Component {
    constructor(props) {
        super(props);

        this.handleEmojiClick = this.handleEmojiClick.bind(this)

        this.state = {message: "", browse:"<p class=\"message-receive\"></p>", to_user: null, from_user: null, text:""};
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
            console.log(typeof data);

            if(typeof data==='string'){

                let str = data.split(" ", 4);
                let tmp = this.state.browse;
                let to_uid = sessionStorage.getItem('to_uid');

                if(str[0] === to_uid) {
                    tmp = tmp + "<p class=\"message-receive\">" + this.state.to_user.name + " " + str[1] + " " + str[2] + "</p>";
                    tmp = tmp + "<p class=\"message-receive\">" + str[3] + "</p>";
                }
                else if(str[0] === uid){
                    tmp = tmp + "<p class=\"message-send\">" + this.state.from_user.name + " " + str[1] + " " + str[2] + "</p>";
                    tmp = tmp + "<p class=\"message-send\">" + str[3] + "</p>";
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
                    console.log(newBuffer);
                    const blob = new Blob([newBuffer]);
                    console.log(originalView[1]);
                    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    let to_uid = sessionStorage.getItem('to_uid');
                    if(originalView[0] === 1){
                        reader.readAsDataURL(blob);
                        reader.onload=(event)=>{
                        const URL=event.target.result;

                        let tmp = this.state.browse;
                            if(originalView[1].toString() === to_uid) {
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
                            }, 0);
                    }    
                    }
                    if(originalView[0] === 2){
                        alert('audio');
                        let tmp = this.state.browse;
                        let audioUrl=URL.createObjectURL(blob);
                        console.log(audioUrl);
                        if(originalView[1].toString() === to_uid) {
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
        const callback = (data) => {
            console.log(data);
            let tmp = "<p class=\"message-receive\"></p>";
            for(let i = 0; i < data.length; i++) {
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
                    let reader = new FileReader();
                    const buffer = new ArrayBuffer(data[i].media.byteLength);
                    const readBlob = new Blob([buffer]);
                    reader.readAsArrayBuffer(readBlob);
                    //reader.readAsDataURL(data);
                    reader.onload = (event) => {
                        const imageData = event.target.result;
                        const originalView = new Uint8Array(imageData);
                        const newBuffer = new ArrayBuffer(imageData.byteLength); // 创建新的 ArrayBuffer，长度比原始的 ArrayBuffer 多 1 字节
                        const newView = new Uint8Array(newBuffer); // 使用视图解释新的 ArrayBuffer
                        newView.set(originalView);
                        const blob = new Blob([newBuffer]);
                        if(data[i].type === 1){
                            reader.readAsDataURL(blob);
                            reader.onload=(event)=>{
                                const URL=event.target.result;
                                let tmp = this.state.browse;
                                if(data[i].fromUser.id === parseInt(from_uid)) {
                                    tmp = tmp + "<p class=\"message-send\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                                    tmp = tmp + `<div class=\"message-send\">><img src="${URL}" style="width: 300px;" /></div>`;
                                }
                                else {
                                    tmp = tmp + "<p class=\"message-receive\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                                    tmp = tmp + `<div class=\"message-receive\">><img src="${URL}" style="width: 300px;" /></div>`;
                                }
                                this.setState({browse: tmp});
                                let div = document.getElementsByClassName("messageScreen")[0];
                                setTimeout(() => {
                                    div.scrollTop = div.scrollHeight;
                                }, 0);
                            }
                        }
                        if(data[i].type === 2){
                            let tmp = this.state.browse;
                            let audioUrl=URL.createObjectURL(blob);
                            console.log(audioUrl);
                            if(data[i].fromUser.id === parseInt(from_uid)) {
                                tmp = tmp + "<p class=\"message-send\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                                tmp = tmp + `<div class=\"message-send\">><audio controls src="${audioUrl}" /></div>`;
                            }
                            else {
                                tmp = tmp + "<p class=\"message-receive\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                                tmp = tmp + `<div class=\"message-receive\">><audio controls src="${audioUrl}" /></div>`;
                            }
                            this.setState({browse: tmp});
                            let div = document.getElementsByClassName("messageScreen")[0];
                            setTimeout(() => {
                                div.scrollTop = div.scrollHeight;
                            }, 0);
                        }
                    };
                }
            }
            this.setState({browse: tmp});
            let div = document.getElementsByClassName("messageScreen")[0];
            setTimeout(() => {
                div.scrollTop = div.scrollHeight;
            }, 0);
        }
        getMessage(from_uid, to_uid, callback);
        let div = document.getElementsByClassName("messageScreen")[0];
        setTimeout(() => {
            div.scrollTop = div.scrollHeight;
        }, 0);
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
                        <Header className={"ant-header-in-send"}>
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
                            <WebRTCChat/> 
                           
                            
                            <div className={"sending"}>
                                <Button className={"sendingButton"} block={true} onClick={this.sendMessage}>发送信息</Button>
                            </div>
                        </Header>
                        <Footer className={"ant-footer-in-send"}>
                            <textarea  className={"inputBox"}  ref={this.text}></textarea>
                        </Footer> 
                         
                    </Layout>
                </div>
            </div>
            
        )
    }
}