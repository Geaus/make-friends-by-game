import React from 'react';
import { Menu,Layout} from 'antd'
import type {MenuProps} from "antd";
import { Link } from "react-router-dom"

import {
    UserAddOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
const { Sider } = Layout;

const items : MenuProps['items'] = [
    {
        label: <Link to={'/home'}/>,
        icon : <UserAddOutlined/>,
        key : '1'
    },
    {
        label: <Link to={'/home/black'}/>,
        icon : <UserDeleteOutlined/>,
        key : '2'
    },
    {
        label: <Link to={'/home/group'}/>,
        icon : <UsergroupAddOutlined/>,
        key : '3'
    }
]
export class MenuBar_Left extends React.Component {
    render() {
        return (
            <div className={"menuBar-left"}>
                <Menu items={items} className={"menuLeft"} defaultSelectedKeys={this.props.keys} mode={'vertical'}></Menu>
            </div>
        )
    }
}