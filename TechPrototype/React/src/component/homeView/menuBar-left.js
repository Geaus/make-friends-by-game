import React,{useState} from 'react';
import { Menu,Layout} from 'antd'
import type {MenuProps} from "antd";
import { Link } from "react-router-dom"
import "../../css/Home.css";

import {
    UserAddOutlined,
    UserDeleteOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import {FriendList} from "./friendList";
import {BlackList} from "./blackList";
import {GroupChatList} from "./groupChatList";
const { Header, Footer, Sider, Content } = Layout;


const MenuBar_Left = (props) => {
    const [selectedKey, setSelectedKey] = useState('1');

    const to_user_change = (to_uid) => {
        props.to_user_change(to_uid);
    }

    // 定义一个函数来处理 menu 的点击事件，更新 state 并渲染相应的组件
    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

        return (
            <Layout>
                <Sider className={"ant-sider-in-sider"} width={"4vw"}>
                    <div className={"menuBar-left"}>
                        {/*<Menu items={items} className={"menuLeft"}*/}
                        {/*      defaultSelectedKeys={this.props.keys}*/}
                        {/*      mode={'vertical'}*/}
                        {/*      onClick={handleMenuClick}*/}
                        {/*>*/}
                        <Menu  className={"menuLeft"}
                              defaultSelectedKeys={'1'}
                              mode={'vertical'}
                              onClick={handleMenuClick}
                        >

                            <Menu.Item key="1" icon={<UserAddOutlined/>}>

                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserDeleteOutlined/>}>

                            </Menu.Item>

                            <Link to={'/contact'}>
                                <Menu.Item key="3" icon={<UsergroupAddOutlined/>}>

                                </Menu.Item>
                            </Link>


                        </Menu>

                    </div>
                </Sider>
                <Content className={"ant-content-in-sider"}>
                    {selectedKey === '1' && (
                        <FriendList to_user_change={to_user_change}/>

                    )}
                    {selectedKey === '2' && (
                        <BlackList/>
                    )}
                    {/*{selectedKey === '3' && (*/}
                    {/*    <GroupChatList/>*/}
                    {/*)}*/}
                </Content>
            </Layout>

        );

};
export default MenuBar_Left;