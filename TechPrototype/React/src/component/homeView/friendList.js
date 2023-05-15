import React from 'react';

import {Menu} from 'antd';
import type {MenuProps} from "antd";

const items : MenuProps['items'] = [
    {
        label : "联系人1",
        key : '1'
    },
    {
        label : "联系人2",
        key : '2'
    },
    {
        label : "联系人3",
        key : '3'
    }
]

export class FriendList extends React.Component {
    render() {
        return (
            <div className={"friendList"}>
                <Menu items={items} className={"friends"} mode={'vertical'}></Menu>
            </div>
        )
    }
}