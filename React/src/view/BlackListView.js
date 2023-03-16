import React from 'react';
import { Layout } from 'antd';
import {HeaderStyle} from "../component/homeView/header";
import MenuBar_Left from "../component/homeView/menuBar-left";
import {BlackList} from "../component/homeView/blackList";
import {MessageSend} from "../component/homeView/messageSend";
import {MessageScreen} from "../component/homeView/messageScreen";
import "../css/Home.css";
import LoginView from "./LoginView";

const { Header, Footer, Sider, Content } = Layout;

export class BlackListView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle />
                </Header>
                <Layout>
                    <Sider className={"ant-sider"} width={"17vw"}>
                        <Layout>
                            <Sider className={"ant-sider-in-sider"} width={"4vw"}>
                                <MenuBar_Left keys={'2'}></MenuBar_Left>
                            </Sider>
                            <Content className={"ant-content-in-sider"}>
                               <BlackList/>
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
export default BlackListView;