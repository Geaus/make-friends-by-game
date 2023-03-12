import React from 'react';
import {Button, Menu} from 'antd';
import type {MenuProps} from "antd";

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
                <div className={"toolbar"}>
                    <Menu items={items} className={"toolbarMenu"} mode={'horizontal'}></Menu>
                </div>
                <div className={"sending"}>
                    <Button className={"sendingButton"}>发送信息</Button>
                </div>
            </div>
        )
    }
}