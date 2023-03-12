import React from 'react';
//import { Form, Input, Button, Checkbox } from 'antd';
import LoginCard from "../component/loginForm"


class LoginView extends React.Component{

    render(){
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title" style={{color:"white"}}>Login</h1>
                        <div className="login-content">
                            <LoginCard />
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default LoginView;