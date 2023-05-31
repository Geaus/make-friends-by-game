import React ,{useState}from 'react';
import { Button, Card, Form, Input, List, Modal, Radio ,Layout,Menu} from 'antd';
import {HeaderStyle} from "../component/homeView/header";
import "../css/Home.css";
import LoginView from "./LoginView";
import Activity from "../component/adminView/Activity"
import ReportList from "../component/adminView/ReportList"
import UserList from "../component/adminView/UserList"
import { Link } from "react-router-dom"

const { Header, Footer, Sider, Content } = Layout;
const CustomComponent = (props) => {
    return <div>{props.content}</div>;
};
const AdminView = () => {
    // 定义一个 state 来存储当前选中的 menu key
    const [selectedKey, setSelectedKey] = useState('activity');

    // 定义一个函数来处理 menu 的点击事件，更新 state 并渲染相应的组件
    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    // 返回 JSX 元素，使用 antd 的 Layout 和 Menu 组件来构建界面
    return (
        <Layout>
            <Header className={'header'}>
                <Menu className={'header'} theme="dark" mode="horizontal" onClick={handleMenuClick}>
                  <Link to={'/home'}>
                      <Menu.Item>
                          返回主页
                      </Menu.Item>
                  </Link>

                    <Menu.Item key="activity" >
                        设计平台活动
                    </Menu.Item>
                    <Menu.Item key="report" >
                        受理举报反馈
                    </Menu.Item>
                    <Menu.Item key="manage" >
                        管理用户
                    </Menu.Item>
                    <Menu.Item  style={{float:'right'}} >
                        管理者模式
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '50px' ,backgroundColor:'white'}}>
                {/* 根据 selectedKey 的值来渲染不同的组件 */}
                {selectedKey === 'activity' && (
                    <Activity/>

                )}
                {selectedKey === 'report' && (
                    <ReportList/>
                )}
                {selectedKey === 'manage' && (
                    <UserList/>
                )}
            </Content>

        </Layout>
    );
};

export default AdminView;