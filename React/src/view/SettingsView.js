import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import {Space, Layout, Input, Form, Button} from 'antd';
import {HeaderStyle} from "../component/header";
import {ProfileMenu} from "../component/profileMenu";

const { Header, Sider, Content } = Layout;
const { TextArea } = Input;

class SetProfileView extends React.Component {

    state = {
        buttons: [
            { id: 1, text: "二次元", clicked: false },
            { id: 2, text: "军事发烧友", clicked: false },
            { id: 3, text: "rap爱好者", clicked: false },
            { id: 4, text: "登山爱好者", clicked: false },
            { id: 5, text: "滑雪爱好者", clicked: false },
            { id: 6, text: "跳舞爱好者", clicked: false },
            { id: 7, text: "游戏发烧友", clicked: false },
            { id: 8, text: "属鼠", clicked: false },
            { id: 9, text: "原神", clicked: false },
            { id: 10, text: "LOL", clicked: false },
            { id: 11, text: "FPS爱好者", clicked: false },
            { id: 12, text: "ktv女王", clicked: false },
            { id: 13, text: "技术宅", clicked: false },
            { id: 14, text: "社恐", clicked: false },
            { id: 15, text: "社牛", clicked: false },
            { id: 16, text: "整活爱好者", clicked: false },
            { id: 17, text: "抽象艺术家", clicked: false },
            { id: 18, text: "美食家", clicked: false },
            { id: 19, text: "探险家", clicked: false },
            { id: 20, text: "牌佬", clicked: false },
        ],
    };

    handleClick = (id) => {
        this.setState((state) => ({
            buttons: state.buttons.map((button) =>
                button.id === id ? { ...button, clicked: !button.clicked } : button
            ),
        }));
    };

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
                    <Content className={"ant-content"}>
                        <Space direction={"vertical"}>
                            <Form>
                                <Form.Item
                                    label="New Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input style={{width: "30%"}}/>
                                </Form.Item>

                                <Form.Item
                                    label="New Password"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input.Password style={{width: "30%"}}/>
                                </Form.Item>

                                <Form.Item
                                    label="New Introduction"
                                    name="introduction"
                                >
                                    <TextArea
                                        placeholder="Introduce Yourself!"
                                        maxLength={200}
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        style={{width: "30%"}}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Tag Settings"
                                    name="tag"
                                >
                                    {this.state.buttons.map((button) => (
                                        <Button
                                            type="dashed"
                                            shape="round"
                                            style={{marginRight:20 ,marginBottom:40}}
                                            key={button.id}
                                            onClick={() => this.handleClick(button.id)}
                                        >
                                            {button.text} - {button.clicked ? "已添加" : "未添加"}
                                        </Button>
                                    ))}
                                </Form.Item>
                            </Form>
                        </Space>
                    </Content>
                </Layout>
            </layout>
        );

    }
}

export default SetProfileView;