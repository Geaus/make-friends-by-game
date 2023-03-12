import React from 'react';
import { Layout } from 'antd';
import {HeaderStyle} from "../component/header";
import {MenuBar_Left} from "../component/menuBar-left";
import {FriendList} from "../component/friendList";
import {MessageSend} from "../component/messageSend";
import {MessageScreen} from "../component/messageScreen";
import "../css/Home.css";

const { Header, Footer, Sider, Content } = Layout;

export class HomeView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle />
                </Header>
                <Layout>
                    <Sider className={"ant-sider"} width={220}>
                        <Layout>
                            <Sider className={"ant-sider"} width={40}>
                                <MenuBar_Left />
                            </Sider>
                            <Content className={"ant-content-in-sider"}>
                                <FriendList />
                            </Content>
                        </Layout>
                    </Sider>
                    <Content className={"ant-content"}>
                        <Layout>
                            <Content className={"ant-content-in-content"}>
                                <MessageScreen />
                            </Content>
                            <Footer className={"ant-footer-in-content"}>
                                <MessageSend />
                            </Footer>
                        </Layout>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}