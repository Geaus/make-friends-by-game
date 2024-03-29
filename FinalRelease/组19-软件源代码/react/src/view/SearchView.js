import React from 'react';
import { Layout,Form, Input, Button, Checkbox ,Switch,Space} from 'antd';
import {HeaderStyle} from "../component/homeView/header"
import "../css/Home.css";
import {SearchBar} from "../component/searchView/SearchBar";
import { Row, Col } from 'antd';
import {getTag} from "../service/UserService";
const { Header, Footer, Sider, Content } = Layout;
class SearchView extends React.Component{

    // state = {
    //     buttons: [
    //         { id: 1, text: "二次元", clicked: false },
    //         { id: 2, text: "军事发烧友", clicked: false },
    //         { id: 3, text: "rap爱好者", clicked: false },
    //         { id: 4, text: "登山爱好者", clicked: false },
    //         { id: 5, text: "滑雪爱好者", clicked: false },
    //         { id: 6, text: "跳舞爱好者", clicked: false },
    //         { id: 7, text: "游戏发烧友", clicked: false },
    //         { id: 8, text: "属鼠", clicked: false },
    //         { id: 9, text: "原神", clicked: false },
    //         { id: 10, text: "LOL", clicked: false },
    //         { id: 11, text: "FPS爱好者", clicked: false },
    //         { id: 12, text: "ktv女王", clicked: false },
    //         { id: 13, text: "技术宅", clicked: false },
    //         { id: 14, text: "社恐", clicked: false },
    //         { id: 15, text: "社牛", clicked: false },
    //         { id: 16, text: "整活爱好者", clicked: false },
    //         { id: 17, text: "抽象艺术家", clicked: false },
    //         { id: 18, text: "美食家", clicked: false },
    //         { id: 19, text: "探险家", clicked: false },
    //         { id: 20, text: "牌佬", clicked: false },
    //     ],
    // };






    render(){
        return(
            <Layout>
                <Header className={"ant-header"}>
                    <HeaderStyle keys={'search'}/>
                </Header>
                <Content style={{backgroundColor:"aliceblue"}}>
                    <Space direction="vertical" size={"large"}>
                        <SearchBar/>
                    </Space>

                </Content>
            </Layout>
        );

    }
}

export default SearchView;