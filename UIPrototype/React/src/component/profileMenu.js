import React from "react";
import {Button, Menu, Layout} from "antd";

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

export class ProfileMenu extends React.Component {
    render() {
        return (
            <div className={"menuBar-left"} className={"menuLeft"}>
                <Menu items={items} mode={'vertical'}></Menu>
            </div>
        )
    }
}