import React from 'react';
import type {MenuProps} from "antd";
import {Button, Layout, Menu} from "antd";
import {Footer, Header} from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";
import {getMessage} from "../../service/ChatService";
import {getUser} from "../../service/UserService";

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
        this.state = {message: "", browse:"<p class=\"message-receive\"></p>", to_user: null, from_user: null};
        let uid = sessionStorage.getItem('uid');
        this.setState({user: uid});
        let baseUrl = "ws://localhost:8080/websocket/"+uid;
        websocket = new WebSocket(baseUrl);
        websocket.onopen = ()=> {
            console.log("建立 websocket 连接...");
        };
        websocket.onmessage = (event) => {
            const data = event.data;
            console.log(data);
            let str = data.split(" ", 4);
            let tmp = this.state.browse;
            if(str[0] !== uid) {
                tmp = tmp + "<p class=\"message-receive\">" + this.state.to_user.name + " " + str[1] + " " + str[2] + "</p>";
                tmp = tmp + "<p class=\"message-receive\">" + str[3] + "</p>";
            }
            else {
                tmp = tmp + "<p class=\"message-send\">" + this.state.from_user.name + " " + str[1] + " " + str[2] + "</p>";
                tmp = tmp + "<p class=\"message-send\">" + str[3] + "</p>";
            }
            this.setState({browse: tmp});
            //setMessage(data)
        };
        websocket.onerror = (event) => {
            console.log("websocket发生错误..." + event + '\n');
        }

        websocket.onclose = () => {
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
                if(data[i].fromUser.id === parseInt(from_uid)) {
                    tmp = tmp + "<p class=\"message-send\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                    tmp = tmp + "<p class=\"message-send\">" + data[i].content + "</p>";
                }
                else {
                    tmp = tmp + "<p class=\"message-receive\">" + data[i].fromUser.name + " " + data[i].sendTime + "</p>";
                    tmp = tmp + "<p class=\"message-receive\">" + data[i].content + "</p>";
                }
            }
            this.setState({browse: tmp});
        }
        getMessage(from_uid, to_uid, callback);
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