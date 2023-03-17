import React from 'react';
import {Button, Menu, Input, Layout} from 'antd';
import type {MenuProps} from "antd";

const {Header, Footer} = Layout
const {TextArea} = Input

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
export class MessageSend extends React.Component {
    render() {
        return (
            <div className={"messageSend"}>
                <Layout>
                    <Header className={"ant-header-in-send"}>
                        <div className={"toolbar"}>
                            <Menu items={items} className={"toolbarMenu"} mode={'horizontal'}></Menu>
                        </div>
                        <div className={"sending"}>
                            <Button className={"sendingButton"} block={true}>发送信息</Button>
                        </div>
                    </Header>
                    <Footer className={"ant-footer-in-send"}>
                        <TextArea className={"inputBox"}></TextArea>
                    </Footer>
                </Layout>
            </div>
        )
    }
}