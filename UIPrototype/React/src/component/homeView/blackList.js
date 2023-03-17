import React from 'react';

import {Menu} from 'antd';
import type {MenuProps} from "antd";

const items : MenuProps['items'] = [
    {
        label : "黑名单1",
        key : '1'
    },
    {
        label : "黑名单2",
        key : '2'
    },
    {
        label : "黑名单3",
        key : '3'
    }
]

export class BlackList extends React.Component {
    render() {
        return (
            <div className={"friendList"}>
                <Menu items={items} className={"friends"} mode={'vertical'}></Menu>
            </div>
        )
    }
}