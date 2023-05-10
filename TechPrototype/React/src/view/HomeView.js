import React from 'react';
import { Layout } from 'antd';
import {HeaderStyle} from "../component/homeView/header";
import MenuBar_Left from "../component/homeView/menuBar-left";
import {FriendList} from "../component/homeView/friendList";
import {MessageScreen} from "../component/homeView/messageScreen";
import "../css/Home.css";
import LoginView from "./LoginView";

const { Header, Footer, Sider, Content } = Layout;

export class HomeView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle />
                </Header>
                <Layout>
                    <Sider className={"ant-sider"} width={"17vw"}>
                        <MenuBar_Left keys={'1'}/>
                        {/*<Layout>*/}
                        {/*    <Sider className={"ant-sider-in-sider"} width={"4vw"}>*/}
                        {/*        <MenuBar_Left keys={'1'}></MenuBar_Left>*/}
                        {/*    </Sider>*/}
                        {/*    <Content className={"ant-content-in-sider"}>*/}
                        {/*        <FriendList />*/}
                        {/*    </Content>*/}
                        {/*</Layout>*/}
                    </Sider>
                    <Content className={"ant-content"}>
                        <Layout>
                            <Content className={"ant-content-in-content"}>
                                <MessageScreen />
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default HomeView;