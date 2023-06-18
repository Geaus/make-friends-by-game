import React from 'react';
import {Layout } from 'antd';
import {HeaderStyle} from "../component/homeView/header";
import Button from "../component/reportView/reportButton";
import Button1 from "../component/reportView/reportButton1"
import Dialog from "../component/reportView/reportDialog";
import Dialog1 from "../component/reportView/reportDialog1";
import "../css/Home.css";
import "../css/report.css"

const { Header, Footer, Sider, Content } = Layout;

export class ReportView extends React.Component {
    state={
        loading:false,
        dialog:false,
        message:false,
        loading1:false,
        dialog1:false,
        message1:false
    }
    submit=()=>{
        this.setState({
            loading:true,
            dialog:true
        })
    }
    back=()=>{
        this.setState({
            loading1:true,
            dialog1:true
        })
    }
    
    // 关闭事件
    close=()=>{
        this.setState({
            dialog:false,
            loading:false,
            dialog1:false,
            loading1:false
        })
    }
    
    render() {
        return (
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle keys={'report'}/>
                </Header>
                <Content style={{ background: "#FFFFFF" }}>
                    <div className="site-layout-content" style={{ background: "#FFFFFF" }}>
                        <div className='word'>
                        <strong>本月封禁案件通报</strong>
                        </div>
                        <Content className='background'>
                        <div className='word-top'>
                        案例一：
                        </div>
                        <div className='word-normal'>被封用户：小红</div>
                        <div className='word-normal'>被封原因：与他人私信发布骚扰信息，言语攻击</div>
                        <div className='word-normal'>措施：封禁一星期</div>
                        </Content>
                        <Content className='background'>
                        <div className='word-top'>
                        案例二：
                        </div>
                        <div className='word-normal'>被封用户：小黑</div>
                        <div className='word-normal'>被封原因：欺诈，索要他人个人信息与银行卡号</div>
                        <div className='word-normal'>措施：永久封禁</div>
                        </Content>
                    </div>
                    <div>
                        <Button  loading={this.state.loading} submit={this.submit}>举报</Button>
                        {this.state.dialog&&<Dialog close={this.close}/>}
                        <Button1 loading={this.state.loading1} submit={this.back}>反馈</Button1>
                        {this.state.dialog1&&<Dialog1 close={this.close}/>}
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default ReportView;

