import React, {useState} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom"
import '../../css/login.css'
import {login} from "../../service/UserService";

const LoginCard = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {

        // sessionStorage.setItem('uid',username);
        // navigate('/home');
        login(username, password)
            .then((data) => {
                message.success('登录成功');
                navigate('/home');
            })
            .catch((error) => {
                message.error(error.message);
            });


    };

    return (
        <div>
            <div className="login-header" style={{ height: '56px', width: '300px' }}>
                <h2 style={{ textAlign: 'left', color: '#fff' }}>欢迎登录</h2>
            </div>

            <div className="form-content" style={{ width: '300px' ,height:'120px'}}>
                <div style={{ marginBottom: 16 }}>
                    <Input placeholder="用户名" value={username} onChange={handleUsernameChange} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Input.Password placeholder="密码" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <Button onClick={handleLogin} ghost style={{ float: 'right' }}>
                        登录
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginCard;