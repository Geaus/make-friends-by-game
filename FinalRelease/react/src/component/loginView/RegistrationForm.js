import React from 'react';
import {Input, Button, message} from 'antd';

class RegisterForm extends React.Component {

    constructor() {
        super();
        this.state={
            username:"",
            password:""
        }
    }
    handleSubmit = () => {
        // Do something when the form is submitted
        const { onSubmit } = this.props;

        if(this.state.username==="" || this.state.password===""){
            message.error("用户名或密码为空");
            return;
        }
        const params = new URLSearchParams();
        params.append('username', this.state.username);
        params.append('password', this.state.password);

        console.log(this.state.username);

        fetch('http://localhost:8080/newUser?'+params.toString()).then((data) => {

            message.success('注册成功');
            onSubmit();

        }).catch((error) => {
            message.error(error.message);
        });


    };

    handleUsername=(event)=>{
        this.setState({username:event.target.value});
    }

    handlePassword=(event)=>{
        this.setState({password:event.target.value})
    }

    render() {
        return (
            <div>
                <label style={{color: "white"}} htmlFor="username">用户名</label>
                <Input id="username" value={this.state.username} onChange={this.handleUsername}/>
                <br />
                <label style={{color: "white"}} htmlFor="password">密码</label>
                <Input id="password" type="password" value={this.state.password} onChange={this.handlePassword}/>
                <br />
                <Button  ghost onClick={this.handleSubmit}>
                    注册
                </Button>
                <Button  ghost onClick={()=>{
                    const { onSubmit } = this.props;
                    onSubmit();

                }}  style={{ float: 'right' }}
                >
                    取消
                </Button>
            </div>
        );
    }
}

export default RegisterForm;
