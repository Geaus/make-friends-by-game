import React from 'react';
import LoginCard from "../component/loginView/loginForm";
import RegistrationForm from "../component/loginView/RegistrationForm";
import {Button} from "antd";


class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRegistrationForm: false
        };
    }

    handleRegistrationSubmit = () => {


        this.setState({ showRegistrationForm: false });

    };

    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title" style={{ color: "white" }}>Login</h1>
                        <div className="login-content">
                            <LoginCard />
                            {this.state.showRegistrationForm && (
                                <RegistrationForm onSubmit={this.handleRegistrationSubmit} />
                            )}
                            {!this.state.showRegistrationForm && (
                                <Button ghost onClick={() => this.setState({ showRegistrationForm: true })}>
                                    注册
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;