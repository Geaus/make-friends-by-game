import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"
import '../../css/login.css'
class LoginCard extends React.Component{

    render() {
        return(
            <div>
                <div className="login-header" sytle={{height:'56px',width:'300px'}}>
                    <h2 style={{textAlign:'left',color:'#1c1717'}}>欢迎登录</h2>
                </div>

                <div className="form-content" style={{width:'300px'}}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                   placeholder="Username"
                            />
                        </Form.Item>


                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>


                        <Form.Item>

                            <Link to={"/home"}>
                                <Button type="primary"  htmlType="submit" Primary ghost style={{float:'right'} }>
                                    <span style={{color:'white',fontSize:14}}>登录</span>
                                </Button>
                            </Link>

                        </Form.Item>

                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginCard;