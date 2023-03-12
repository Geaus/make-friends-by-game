import React from 'react';
import { Menu,Layout} from 'antd'
import type {MenuProps} from "antd";

import {
    UserAddOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
const { Sider } = Layout;

const items : MenuProps['items'] = [
    {
        icon : <UserAddOutlined/>,
        key : '1'
    },
    {
        icon : <UserDeleteOutlined/>,
        key : '2'
    },
    {
        icon : <UsergroupAddOutlined/>,
        key : '3'
    }
]
export class MenuBar_Left extends React.Component {
    render() {
        return (
            <div className={"menuBar-left"}>
                <Menu items={items} className={"menuLeft"} mode={'vertical'}></Menu>
            </div>
        )
    }
}