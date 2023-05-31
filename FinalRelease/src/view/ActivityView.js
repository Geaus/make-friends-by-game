import React from 'react';
import { Layout, Card } from 'antd';
import {HeaderStyle} from "../component/homeView/header";
import "../css/Home.css";
import "../css/activity.css";
import LoginView from "./LoginView";

const { Header, Footer, Sider, Content } = Layout;
const {Meta} = Card;

export class ActivityView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle keys={'activity'}/>
                </Header>
                <Content className={"ant-content-activity"}>
                    <Card className={"card-activity"} bordered={true} style={{width: '25vw', margin: '2vw'}}>
                        <Meta title={"每日签到"} description={"每日签到领奖励"}></Meta>
                    </Card>
                    <Card className={"card-activity"} bordered={true} style={{width: '25vw', margin: '2vw'}}>
                        <Meta title={"游戏争霸赛"} description={"看看谁是游戏之王"}></Meta>
                    </Card>
                    <Card className={"card-activity"} bordered={true} style={{width: '25vw', margin: '2vw'}}>
                    <Meta title={"节日活动"} description={"节日限定活动"}></Meta>
                    </Card>
                </Content>
            </Layout>
        )
    }
}

export default ActivityView;