import React from 'react';
import {Menu} from 'antd';
import type {MenuProps} from "antd";
import {SearchOutlined, QuestionOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom"
import '../../css/Home.css'
const items : MenuProps['items'] = [
    {
        label : <Link to={'/search'}>搜索陌生人</Link>,
        key : 'search',
        icon : <SearchOutlined />,
    },
    {
        label : <Link to={'/help'}>在线帮助</Link>,
        key : 'help',
        icon : <QuestionOutlined />,
    },
]
export class HeaderStyle extends React.Component {
    render() {
        return (
            <div className={"header"}>
                <Link to={"/home"}>
                <div className={"header-name"}>游戏交友</div>
                </Link>
                <div className={"header-menu"}>
                    <Menu className="menu" items={items} defaultSelectedKeys={this.props.keys} theme={"dark"} mode="horizontal"></Menu>
                </div>

                <Link to={"/profile"}>
                    <div className={"header-person"}>个人中心</div>
                </Link>
            </div>
        )
    }
}
