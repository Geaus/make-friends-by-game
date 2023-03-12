import React from 'react';
import { Menu,Layout} from 'antd'

import {UserAddOutlined,UserDeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons';
const { Sider } = Layout;
export class MenuBar_Left extends React.Component {
    render() {
        return (
            <div className={"menuBar-left"}>

                <UserAddOutlined className={"iconStyle"}/>

                <UserDeleteOutlined className={"iconStyle"}/>

                <UsergroupAddOutlined className={"iconStyle"}/>


            </div>
        )
    }
}