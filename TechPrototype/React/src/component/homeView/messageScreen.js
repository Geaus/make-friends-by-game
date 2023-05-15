import React,{createRef} from 'react';
import type {MenuProps} from "antd";
import {Button, Layout,Popover,Tooltip,message,Drawer} from "antd";
import {Footer, Header} from "antd/es/layout/layout";
import Emoji from './Emoji';
import {SmileOutlined,AudioOutlined,FileImageOutlined,PhoneOutlined,PoweroffOutlined} from '@ant-design/icons';
import Recorder from 'js-audio-recorder'
import WebRTCChat from './WebRTCChat';

const items : MenuProps['items'] = [
    {
        label : '表情' ,
        key : 'emoji',
    },
    {
        label : '语音',
        key : 'voice',
    },
    {
        label : '游戏',
        key : 'game',
    }
]
let websocket;

export class MessageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmojiClick = this.handleEmojiClick.bind(this)

        this.state = {message: "", browse:"<p></p>",text:""};
        this.text = createRef();

        let username=sessionStorage.getItem('userName');
        //alert(username);
        this.setState({user:username});
        let baseUrl = "ws://localhost:8080/websocket/"+username;
        websocket = new WebSocket(baseUrl);
        websocket.onopen = ()=> {
            console.log("建立 websocket 连接...");
        };
        websocket.onmessage = (event) => {

            const data = event.data;
            console.log(typeof data);
            if(typeof data==='string'){
                let tmp = this.state.browse;
                tmp = tmp + data + "<br />";
                this.setState({browse: tmp});
            }
            else{
                var reader=new FileReader();
                reader.readAsArrayBuffer(data);
                //reader.readAsDataURL(data);
                reader.onload = (event) => {

                    
                    const imageData = event.target.result;
                    const originalView = new Uint8Array(imageData);
                    const newBuffer = new ArrayBuffer(imageData.byteLength-1); // 创建新的 ArrayBuffer，长度比原始的 ArrayBuffer 多 1 字节
                    const newView = new Uint8Array(newBuffer); // 使用视图解释新的 ArrayBuffer
                    newView.set(originalView.subarray(1));
                    console.log(newBuffer);
                    const blob = new Blob([newBuffer]);
                    if(originalView[0]===1){
                        reader.readAsDataURL(blob);
                        reader.onload=(event)=>{
                        const URL=event.target.result;

                        let tmp = this.state.browse;
                        tmp = tmp + `<div><img src="${URL}" style="width: 300px;" /></div>`;
                        this.setState({browse: tmp});
                    }    
                    }
                    if(originalView[0]===2){
                        alert('audio');
                        let tmp = this.state.browse;
                        let audioUrl=URL.createObjectURL(blob);
                        console.log(audioUrl);
                        tmp = tmp+`<div><audio controls src="${audioUrl}" /></div>`;
                        this.setState({browse: tmp});
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


    handleEmojiClick(emoji) {
        const cursorStart = this.text.current.selectionStart;
        this.text.current.value = this.text.current.value.slice(0, cursorStart) + emoji + this.text.current.value.slice(cursorStart)
    }
    setMessage = (event) => {
        let value = event.target.value;
        this.setState({message: value});
    }
    sendMessage = () => {
        if (this.text.current.value === "") {
            alert("请重新输入")
            return;
        }
        if(sessionStorage.getItem('userName') === '1'){
            let str = '2 ' + this.text.current.value;
            websocket.send(str);
        }

        else {
            let str = '1 ' + this.text.current.value;
            websocket.send(str);
        }
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

                newView[0] = 1; // 在新的 ArrayBuffer 的开头位置设置新的字节值,这是userId
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

                newView[0] = 1; // 在新的 ArrayBuffer 的开头位置设置新的字节值,userId
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
                            <textarea onChange={event=>this.setMessage(event)} className={"inputBox"} ref={this.text}></textarea>
                        </Footer> 
                         
                    </Layout>
                </div>
            </div>
            
        )
    }
}