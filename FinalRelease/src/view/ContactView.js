
import React from 'react';
import {Button, Layout} from "antd";
import {HeaderStyle} from "../component/homeView/header";
import MenuBar_Left from "../component/homeView/menuBar-left";
import {MessageScreen} from "../component/homeView/messageScreen";
import ContactsManagement from "../component/homeView/contact";
import {Link} from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
export class ContactView extends React.Component {

    componentDidMount() {
        this.setState({to_uid: 0});
    }

    to_user_change = (to_uid) => {
        this.setState({to_uid: to_uid});
    }
    render() {
        if(this.state == null)return null;
        return (
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle />
                </Header>
                <Layout>
                    <Sider className={"ant-sider"} width={"17vw"}>
                        <div style={{fontSize:'20px',color:'white',textAlign:'center'}}> 通讯录管理</div>
                    </Sider>
                    <Content className={"ant-content"}>
                        <Layout>
                            <Content className={"ant-content-in-content"}>

                               <ContactsManagement/>
                                <Link to={'/home'}>
                                    <Button> return </Button>
                                </Link>

                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default ContactView;