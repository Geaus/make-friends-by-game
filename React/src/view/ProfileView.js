import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Tag, Space, Layout } from 'antd';
import {HeaderStyle} from "../component/homeView/header";
import {ProfileMenu} from "../component/profileView/profileMenu";

const { Header, Footer, Sider, Content } = Layout;

class ProfileView extends React.Component {

    render(){
        return(
            <layout>
                <Header className={"ant-header"}>
                    <HeaderStyle />
                </Header>
                <Layout>
                   <Sider theme={"dark"}>
                       <ProfileMenu />
                   </Sider>
                    <Content className={"ant-content"} style={{ display: "flex", justifyContent: "center" }}>
                        <Space direction={"vertical"} align={"center"} style={{ justifyContent: 'space-evenly' }}>
                            <Avatar
                                size={128}
                                icon={<UserOutlined />}
                            />
                            <Card
                                title="Username"
                                extra={<a href="#">More</a>}
                                style={{
                                    width: 300,
                                }}
                            >
                                <p>Introduce yourself</p>
                            </Card>
                            <Space>
                                <Tag>tag1</Tag>
                                <Tag>tag2</Tag>
                            </Space>
                        </Space>
                    </Content>
                </Layout>
            </layout>
        );

    }
}

export default ProfileView;