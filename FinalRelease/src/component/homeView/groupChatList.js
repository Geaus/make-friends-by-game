import React from 'react';

import {Menu} from 'antd';
import type {MenuProps} from "antd";

const items : MenuProps['items'] = [
    {
        label : "群聊1",
        key : '1'
    },
    {
        label : "群聊2",
        key : '2'
    },
    {
        label : "群聊3",
        key : '3'
    }
]

export class GroupChatList extends React.Component {
    render() {
        return (
            <div className={"friendList"}>
                <Menu items={items} className={"friends"} mode={'vertical'}></Menu>
            </div>
        )
    }
}