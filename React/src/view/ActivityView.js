import React from 'react';
import { Layout, Card } from 'antd';
import {HeaderStyle} from "../component/header";
import "../css/Home.css";
import "../css/activity.css";
import LoginView from "./LoginView";

const { Header, Footer, Sider, Content } = Layout;

export class ActivityView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle keys={'activity'}/>
                </Header>
                <Content className={"ant-content-activity"}>
                    <Card title={"每日签到"} bordered={true} style={{width: '30vw', margin: '2vw'}}>
                        <p>每日签到领奖励</p>
                    </Card>
                    <Card title={"游戏争霸赛"} bordered={true} style={{width: '30vw', margin: '2vw'}}>
                        <p>看看谁是游戏之王</p>
                    </Card>
                </Content>
            </Layout>
        )
    }
}

export default ActivityView;