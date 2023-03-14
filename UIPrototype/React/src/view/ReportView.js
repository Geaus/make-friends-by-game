import React from 'react';
import { Layout } from 'antd';
import {HeaderStyle} from "../component/header";
import "../css/Home.css";
import LoginView from "./LoginView";

const { Header, Footer, Sider, Content } = Layout;

export class ReportView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle keys={'report'}/>
                </Header>
            </Layout>
        )
    }
}

export default ReportView;