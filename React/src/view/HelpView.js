import React from 'react';
import { Layout,Card } from 'antd';
import ReactCardFlip,{front,back} from 'react-card-flip';
import {HeaderStyle} from "../component/homeView/header";
import "../css/Home.css";
import "../css/help.css"
import LoginView from "./LoginView";


const { Header, Footer, Sider, Content } = Layout;

export class HelpView extends React.Component {
        constructor() {
          super();
            this.state = {
            isFlipped1: false,
            isFlipped2: false,
            isFlipped3: false,
            isFlipped4: false,
            isFlipped5: false,
            isFlipped6: false,
            

          };
          this.handleClick1 = this.handleClick1.bind(this);
          this.handleClick2 = this.handleClick2.bind(this);
          this.handleClick3 = this.handleClick3.bind(this);
          this.handleClick4 = this.handleClick4.bind(this);
          this.handleClick5 = this.handleClick5.bind(this);
          this.handleClick6 = this.handleClick6.bind(this);
        }
      
        handleClick1(e) {
          e.preventDefault();
          this.setState(prevState => ({ isFlipped1: !prevState.isFlipped1 }));
        }
        handleClick2(e) {
            e.preventDefault();
            this.setState(prevState => ({ isFlipped2: !prevState.isFlipped2 }));
          }
        handleClick3(e) {
            e.preventDefault();
            this.setState(prevState => ({ isFlipped3: !prevState.isFlipped3 }));
          }
          handleClick4(e) {
            e.preventDefault();
            this.setState(prevState => ({ isFlipped4: !prevState.isFlipped4 }));
          }
          handleClick5(e) {
            e.preventDefault();
            this.setState(prevState => ({ isFlipped5: !prevState.isFlipped5 }));
          }
          handleClick6(e) {
            e.preventDefault();
            this.setState(prevState => ({ isFlipped6: !prevState.isFlipped6 }));
          }
    render() {
        return (
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle keys={'help'}/>
                </Header>
                <Content className={"ant-content-help"}>
                <ReactCardFlip isFlipped={this.state.isFlipped1} flipDirection="horizontal" infinite="true" >
                <div
                    onClick={this.handleClick1}
                    className="ant-card">
                <p className={"ant-card-help"}>注册和登录</p>
                </div>
                <div
                    onClick={this.handleClick1}
                    className="ant-card">
                <p className={"ant-card-help"}>要使用该软件，首先需要注册一个账户并登录。在注册页面输入您的用户名和密码，确认您的账户有效性。一旦账户被验证，您就可以使用您的用户名和密码登录系统。
                </p>
                </div>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={this.state.isFlipped2} flipDirection="horizontal" infinite="true">
                <div
                    onClick={this.handleClick2}
                    className="ant-card">
                <p className={"ant-card-help"}>通讯录</p>
                </div>
                <div
                    onClick={this.handleClick2}
                    className="ant-card">
                <p className={"ant-card-help"}>在您的好友请求被确认后，该用户将会被添加到您的通讯录中。您可以使用通讯录来管理您的好友列表和黑名单。如果您不想接受来自某个用户的消息，请将其添加到黑名单中。</p>
                </div>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={this.state.isFlipped3} flipDirection="horizontal">
                <div
                    onClick={this.handleClick3}
                    className="ant-card">
                <p className={"ant-card-help"}>查找陌生人</p>
                </div>
                <div
                    onClick={this.handleClick3}
                    className="ant-card">
                <p className={"ant-card-help"}>您可以通过添加自定义标签来描述您的个人资料，并根据标签搜索其他用户的资料。您也可以使用系统推荐的用户列表来查找其他用户。一旦您找到了感兴趣的用户，您可以发送好友请求并等待对方的确认。</p>
                </div>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={this.state.isFlipped4} flipDirection="horizontal">
                <div
                    onClick={this.handleClick4}
                    className="ant-card">
                <p className={"ant-card-help"}>聊天</p>
                </div>
                <div
                    onClick={this.handleClick4}
                    className="ant-card">
                <p className={"ant-card-help"}>与您的好友进行聊天是该软件的核心功能之一。您可以通过文本消息、图片、表情等方式与您的好友进行交流。您的聊天记录将被保存在系统中，以供您以后查看。</p>
                </div>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={this.state.isFlipped5} flipDirection="horizontal">
                <div
                    onClick={this.handleClick5}
                    className="ant-card">
                <p className={"ant-card-help"}>小游戏</p>
                </div>
                <div
                    onClick={this.handleClick5}
                    className="ant-card">
                <p className={"ant-card-help"}>该软件还提供了一些有趣的小游戏，供您和您的好友一起玩耍。您可以创建一个房间并邀请您的好友加入，以共同完成游戏目标。</p>
                </div>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={this.state.isFlipped6} flipDirection="horizontal">
                <div
                    onClick={this.handleClick6}
                    className="ant-card">
                <p className={"ant-card-help"}>个人资料</p>
                </div>
                <div
                    onClick={this.handleClick6}
                    className="ant-card">
                <p className={"ant-card-help"}>您可以随时更改您的个人资料，包括用户名、密码、个人描述、头像等。请注意，您的个人资料将被保存在系统中，以供其他用户查看。</p>
                </div>
                </ReactCardFlip>
                <div className="ant-card">
                    <Card className={"ant-card-face"} title={"为什么我无法登录系统？"} >
                        <p >请确保您的用户名和密码正确，并且您的账户已被验证。如果问题仍然存在，请尝试重置您的密码或联系客服人员寻求帮助。</p>
                    </Card>
                </div>
                <div className={"ant-card"}>
                    <Card className={"ant-card-face"} title={"我如何添加一个好友？"} >
                        <p >在搜索页面中，输入您感兴趣的用户的用户名或标签，找到该用户后，发送一个好友请求。如果该用户接受了您的请求，他将被添加到您的通讯录中。</p>
                    </Card>
                </div>
                <div className={"ant-card"}>
                    <Card className={"ant-card-face"} title={"我如何更改我的个人资料？"} >
                        <p >在个人资料页面中，您可以更改您的用户名、密码、个人描述和头像。请确保您的个人资料准确无误。</p>
                    </Card>
                </div>
                </Content>
            </Layout>
        )
    }
}

export default HelpView;