import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Tag, Space, Layout } from 'antd';
import {HeaderStyle} from "../component/homeView/header";
import {ProfileMenu} from "../component/profileView/profileMenu";
import Profile from "../component/profileView/Profile";

const { Header, Footer, Sider, Content } = Layout;

class ProfileView extends React.Component {

    render(){
        return(
            <layout>
                <Header className={"ant-header"}>
                    <HeaderStyle />
                </Header>
                <Layout>
                    <Content className={"ant-content"} style={{ display: "flex", justifyContent: "center" }}>
                        <Space direction={"vertical"} align={"center"} style={{ justifyContent: 'space-evenly' }}>
                           <Profile/>
                        </Space>
                    </Content>
                </Layout>
            </layout>
        );

    }
}

export default ProfileView;