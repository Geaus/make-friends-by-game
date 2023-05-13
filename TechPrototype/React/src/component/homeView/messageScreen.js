import React from 'react';
import type {MenuProps} from "antd";
import {Button, Layout, Menu} from "antd";
import {Footer, Header} from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";

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
        this.state = {message: "", browse:"<p class=\"message-receive\"></p>"};
        let uid=sessionStorage.getItem('uid');
        this.setState({user:uid});
        let baseUrl = "ws://localhost:8080/websocket/"+uid;


        websocket = new WebSocket(baseUrl);
        websocket.onopen = ()=> {
            console.log("建立 websocket 连接...");
        };
        websocket.onmessage = (event) => {
            const data = event.data;
            console.log(data);
            let str = data.split(" ", 2);
            let tmp = this.state.browse;
            if(str[0] !== uid) {
                tmp = tmp + "<p class=\"message-receive\">" + str[0] + "</p>";
                tmp = tmp + "<p class=\"message-receive\">" + str[1] + "</p>";
            }
            else {
                tmp = tmp + "<p class=\"message-send\">" + str[0] + "</p>";
                tmp = tmp + "<p class=\"message-send\">" + str[1] + "</p>";
            }
            this.setState({browse: tmp});
            //setMessage(data)
        };
        websocket.onerror = (event) => {
            console.log("websocket发生错误..." + event + '\n');
        }

        websocket.onclose = ()=> {
            console.log("关闭 websocket 连接...");
        };
    }

    setMessage = (event) => {
        let value = event.target.value;
        this.setState({message: value});
    }
    sendMessage = () => {
        if (this.state.message === "") {
            alert("请重新输入")
            return;
        }
        let to_uid = sessionStorage.getItem("to_uid");
        let str = to_uid + " " + this.state.message;
        websocket.send(str);
    }
    render() {
        let html = {__html:this.state.browse};
        return (
            <div className={"message"}>
                <div className={"messageScreen"}>
                    <div dangerouslySetInnerHTML={html}></div>
                </div>
                <div className={"messageSend"}>
                    <Layout>
                        <Header className={"ant-header-in-send"}>
                            <div className={"toolbar"}>
                                <Menu items={items} className={"toolbarMenu"} mode={'horizontal'}></Menu>
                            </div>
                            <div className={"sending"}>
                                <Button className={"sendingButton"} block={true} onClick={this.sendMessage}>发送信息</Button>
                            </div>
                        </Header>
                        <Footer className={"ant-footer-in-send"}>
                            <TextArea onChange={event=>this.setMessage(event)} className={"inputBox"}></TextArea>
                        </Footer>
                    </Layout>
                </div>
            </div>
        )
    }
}