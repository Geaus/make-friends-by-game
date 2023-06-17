import React from 'react';
import {Button, Input, AutoComplete, Table, message, Tag} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {acceptFriend, addFriend, getTag, rejectFriend, searchUser} from "../../service/UserService";
const { Option } = AutoComplete;

export class SearchBar extends React.Component {

    handleSearch = (event) => {
        this.setState({
            searchValue: event.target.value
        });
    };

    componentDidMount() {
        const callback = (data) => {
            let tags = []
            for(let i = 0; i < data.length; i++) {
                let tag = {id: 0, text: "", clicked: false};
                tag.id = data[i].tagid;
                tag.text = data[i].tagname;
                tags.push(tag);
            }
            this.setState({buttons: tags, searchValue: "", searchResult: []})
        }
        getTag(callback)
    }

    handleClick = (id) => {
        const callback = (data) => {
            this.setState({searchResult: data})
        }
        let tags = []
        for(let i = 0; i < this.state.buttons.length; i++) {
            if(this.state.buttons[i].clicked === true && this.state.buttons[i].id !== id) {
                let tag = {tagid: 0, tagname: ""}
                tag.tagid = this.state.buttons[i].id;
                tag.tagname = this.state.buttons[i].text;
                tags.push(tag);
            }
            else if(this.state.buttons[i].clicked !== true && this.state.buttons[i].id === id) {
                let tag = {tagid: 0, tagname: ""}
                tag.tagid = this.state.buttons[i].id;
                tag.tagname = this.state.buttons[i].text;
                tags.push(tag);
            }
        }
        searchUser(this.state.searchValue, tags, callback);
        this.setState((state) => ({
            buttons: state.buttons.map((button) =>
                button.id === id ? { ...button, clicked: !button.clicked } : button
            ),
        }));
    };

    searching = () => {
        const callback = (data) => {
            this.setState({searchResult: data})
            console.log(data);
        }
        console.log(this.state.searchValue)
        console.log(this.state.buttons)
        let tags = []
        for(let i = 0; i < this.state.buttons.length; i++) {
            if(this.state.buttons[i].clicked === true) {
                let tag = {tagid: 0, tagname: ""}
                tag.tagid = this.state.buttons[i].id;
                tag.tagname = this.state.buttons[i].text;
                tags.push(tag);
            }
        }
        searchUser(this.state.searchValue, tags, callback);
    }

    addFriend_callback = () => {
        message.success("好友申请发送成功，等待对方同意");
        const callback = (data) => {
            this.setState({searchResult: data})
        }
        console.log(this.state.searchValue)
        console.log(this.state.buttons)
        let tags = []
        for(let i = 0; i < this.state.buttons.length; i++) {
            if(this.state.buttons[i].clicked === true) {
                let tag = {tagid: 0, tagname: ""}
                tag.tagid = this.state.buttons[i].id;
                tag.tagname = this.state.buttons[i].text;
                tags.push(tag);
            }
        }
        searchUser(this.state.searchValue, tags, callback);
    }

    accept_callback = () => {
        message.success("成功添加好友");
        const callback = (data) => {
            this.setState({searchResult: data})
        }
        console.log(this.state.searchValue)
        console.log(this.state.buttons)
        let tags = []
        for(let i = 0; i < this.state.buttons.length; i++) {
            if(this.state.buttons[i].clicked === true) {
                let tag = {tagid: 0, tagname: ""}
                tag.tagid = this.state.buttons[i].id;
                tag.tagname = this.state.buttons[i].text;
                tags.push(tag);
            }
        }
        searchUser(this.state.searchValue, tags, callback);
    }

    reject_callback = () => {
        message.success("已拒绝对方的好友申请");
        const callback = (data) => {
            this.setState({searchResult: data})
        }
        console.log(this.state.searchValue)
        console.log(this.state.buttons)
        let tags = []
        for(let i = 0; i < this.state.buttons.length; i++) {
            if(this.state.buttons[i].clicked === true) {
                let tag = {tagid: 0, tagname: ""}
                tag.tagid = this.state.buttons[i].id;
                tag.tagname = this.state.buttons[i].text;
                tags.push(tag);
            }
        }
        searchUser(this.state.searchValue, tags, callback);
    }

    addFriend = (target_id) => {
        addFriend(target_id, this.addFriend_callback);
    }

    acceptFriend = (target_id) => {
        acceptFriend(target_id, this.accept_callback);
    }

    rejectFriend = (target_id) => {
        rejectFriend(target_id, this.reject_callback);
    }

    render() {
        const columns = [
            {
                title: '用户ID',
                dataIndex: 'id',
                key: 'id',
                width: '10vw',
                align: 'center'
            },
            {
                title: '用户名称',
                dataIndex: 'name',
                key: 'name',
                width: '20vw',
                align: 'center'
            },
            {
                title: '用户标签',
                dataIndex: 'tags',
                key: 'tags',
                width: '30vw',
                align: 'center',
                render: (_, record) => {
                    return (
                        <div>
                            {record.tags.map(tag => (
                                <Tag key={tag.tagid}>{tag.tagname}</Tag>
                            ))}
                        </div>
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '40vw',
                align: 'center',
                render: (_, record) => {
                    if(parseInt(record.addFlag) === 1) return (
                        <div>
                            <span>等待对方确认请求</span>
                        </div>
                    )
                    else if(parseInt(record.addFlag) === 0)return (
                            <div>
                                <Button onClick={() => this.addFriend(record.id)}>添加好友</Button>
                            </div>
                    )
                    else return (
                            <div>
                                <Button onClick={() => this.acceptFriend(record.id)}>同意好友申请</Button>
                                <Button onClick={() => this.rejectFriend(record.id)}>拒绝好友申请</Button>
                            </div>
                        )
                }
            }
        ]
        if(this.state == null)return null;
        return (
            <div className="global-search-wrapper" style={{ width: "100vw" }}>
                    <Input
                        onChange={event => {this.handleSearch(event)}}
                        value={this.state.searchValue}
                        suffix={
                            <Button
                                className="search-btn"
                                style={{ marginRight: -12 }}
                                size="large"
                                type="primary"
                                onClick={this.searching}
                            >
                                <SearchOutlined/>
                            </Button>
                        }
                    />
                <div>
                    {this.state.buttons.map((button) => (
                        <Button
                            type="dashed"
                            shape="round"
                            style={{marginRight:20 ,marginBottom:40}}
                            key={button.id}
                            onClick={() => this.handleClick(button.id)}
                        >
                            {button.text} - {button.clicked ? "已添加" : "未添加"}
                        </Button>
                    ))}
                </div>
                <span className={"search-font"}>搜索结果</span>
                <Table className={"search-result-lines"} columns={columns} dataSource={this.state.searchResult}></Table>
            </div>
        );
    }
}