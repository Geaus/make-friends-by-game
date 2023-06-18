import React, { Component } from 'react';
import {Table, Button, message, Tag, Layout} from 'antd';
import {acceptFriend, addFriend, rejectFriend, searchUser} from "../../service/UserService";
import {Link} from "react-router-dom";

const {Sider, Content} = Layout;

class ContactsManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [], // 存储联系人信息
            recommend: []
        };
    }

    componentDidMount() {
        const uid = sessionStorage.getItem('uid');
        const params = new URLSearchParams();
        params.append('uid', uid);

        fetch('http://localhost:8080/getContact?'+params.toString()) // 发送fetch请求获取联系人信息的接口地址
            .then(response => response.json())
            .then(data => {
                this.setState({ contacts: data });
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });

        fetch('http://localhost:8080/recommend?'+params.toString())
            .then(response => response.json())
            .then(data => {
                this.setState({recommend: data});
            })
    }


    handleBlacklist(contactId) {
        // 处理拉黑按钮点击事件
        const { contacts } = this.state;
        const updatedContacts = contacts.map(contact => {
            if (contact.toUser.id === contactId) {
                contact.isBlack = true;

                const uid = sessionStorage.getItem('uid');
                const params = new URLSearchParams();
                params.append('uid', uid);
                params.append('to_uid', contactId);
                fetch('http://localhost:8080/blackContact?'+params.toString())
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        message.success(data);
                    })
                    .catch(error => {
                        console.error('Error fetching contacts:', error);
                    });
            }

            return contact;
        });

        this.setState({ contacts: updatedContacts });
    }

    handleUnblacklist(contactId) {
        // 处理重新添加按钮点击事件
        const { contacts } = this.state;
        const updatedContacts = contacts.map(contact => {
            if (contact.toUser.id === contactId) {
                contact.isBlack = false;

                const userId = sessionStorage.getItem('uid');
                const params = new URLSearchParams();
                params.append('uid', userId);
                params.append('to_uid', contactId);
                fetch('http://localhost:8080/reAddContact?'+params.toString())
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        message.success(data);
                    })
                    .catch(error => {
                        console.error('Error fetching contacts:', error);
                    });

            }
            return contact;
        });
        this.setState({ contacts: updatedContacts });
    }

    handleDelete(contactId) {
        // 处理删除按钮点击事件
        const { contacts } = this.state;
        const updatedContacts = contacts.filter(contact => contact.toUser.id !== contactId);

        const userid = sessionStorage.getItem('uid');
        const params = new URLSearchParams();
        params.append('uid', userid);
        params.append('to_uid', contactId);
        fetch('http://localhost:8080/deleteContact?'+params.toString())
            .then(response => response.json())
            .then(data => {
                console.log(data);
                message.success(data);
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });

        this.setState({ contacts: updatedContacts });
    }

    addFriend_callback = () => {
        message.success("好友申请发送成功，等待对方同意");
        const uid = sessionStorage.getItem('uid');
        const params = new URLSearchParams();
        params.append('uid', uid);

        fetch('http://localhost:8080/getContact?'+params.toString()) // 发送fetch请求获取联系人信息的接口地址
            .then(response => response.json())
            .then(data => {
                this.setState({ contacts: data });
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
        fetch('http://localhost:8080/recommend?'+params.toString())
            .then(response => response.json())
            .then(data => {
                this.setState({recommend: data});
            })
    }

    accept_callback = () => {
        message.success("成功添加好友");
        const uid = sessionStorage.getItem('uid');
        const params = new URLSearchParams();
        params.append('uid', uid);

        fetch('http://localhost:8080/getContact?'+params.toString()) // 发送fetch请求获取联系人信息的接口地址
            .then(response => response.json())
            .then(data => {
                this.setState({ contacts: data });
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
        fetch('http://localhost:8080/recommend?'+params.toString())
            .then(response => response.json())
            .then(data => {
                this.setState({recommend: data});
            })
    }

    reject_callback = () => {
        message.success("已拒绝对方的好友申请");
        const uid = sessionStorage.getItem('uid');
        const params = new URLSearchParams();
        params.append('uid', uid);

        fetch('http://localhost:8080/getContact?'+params.toString()) // 发送fetch请求获取联系人信息的接口地址
            .then(response => response.json())
            .then(data => {
                this.setState({ contacts: data });
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
        fetch('http://localhost:8080/recommend?'+params.toString())
            .then(response => response.json())
            .then(data => {
                this.setState({recommend: data});
            })
    }

    acceptFriend = (target_id) => {
        acceptFriend(target_id, this.accept_callback);
    }

    rejectFriend = (target_id) => {
        rejectFriend(target_id, this.reject_callback);
    }

    addFriend = (target_id) => {
        addFriend(target_id, this.addFriend_callback);
    }

    render() {

        const { contacts, recommend } = this.state;

        const columns = [
            {
                title: '昵称',
                dataIndex: 'toUser',
                width: '10vw',
                key: 'toUser',
                align: 'center',
                render: (_, contact) => {
                    let uid = sessionStorage.getItem('uid');
                    if(parseInt(contact.toUser.id) === parseInt(uid))return contact.fromUser.name;
                    else return contact.toUser.name;
                }
            },
            {
                title: '标签',
                dataIndex: 'tags',
                width: '15vw',
                key: 'tags',
                align: 'center',
                render: (_, contact) => {
                    let uid = sessionStorage.getItem('uid');
                    if(parseInt(contact.toUser.id) === parseInt(uid))return (
                        <div>
                            {contact.fromUser.tags.map(tag => (
                                <Tag key={tag.tagid}>{tag.tagname}</Tag>
                            ))}
                        </div>
                    )
                    else return (
                        <div>
                            {contact.toUser.tags.map(tag => (
                                <Tag key={tag.tagid}>{tag.tagname}</Tag>
                            ))}
                        </div>
                    )
                }
            },
            {
                title: '操作',
                key: 'actions',
                width: '20vw',
                align: 'center',
                render: (_, contact) => {
                    let uid = sessionStorage.getItem('uid');
                    if(parseInt(contact.isAdd) === 0 && parseInt(contact.toUser.id) === parseInt(uid))return(
                        <div>
                            <Button onClick={() => this.acceptFriend(contact.fromUser.id)}>同意好友申请</Button>
                            <Button onClick={() => this.rejectFriend(contact.fromUser.id)}>拒绝好友申请</Button>
                        </div>
                    )
                    else if(parseInt(contact.isAdd) === 0)return(
                        <div>
                            <span>等待对方确认请求</span>
                        </div>
                    )
                    else if(!contact.isBlack) return (
                        <React.Fragment>
                            <Button onClick={() => this.handleBlacklist(contact.toUser.id)}>加入黑名单</Button>
                            <Button onClick={() => this.handleDelete(contact.toUser.id)}>删除好友</Button>
                        </React.Fragment>
                    )
                    else return (
                            <React.Fragment>
                                <Button onClick={() => this.handleUnblacklist(contact.toUser.id)}>移出黑名单</Button>
                                <Button onClick={() => this.handleDelete(contact.toUser.id)}>删除好友</Button>
                            </React.Fragment>
                        )
                }
            },
        ];

        const column_recommend = [
            {
                title: '昵称',
                dataIndex: 'name',
                key: 'name',
                width: '10vw',
                align: 'center',
            },
            {
                title: '标签',
                dataIndex: 'tags',
                width: '15vw',
                key: 'tags',
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
                width: '20vw',
                align: 'center',
                render: (_, record) => {
                    if(parseInt(record.addFlag) === 0)return (
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

        return (
            <Layout>
                <Sider style={{backgroundColor: "white", padding: '2vw'}} width={"50vw"}>
                    <span style={{fontSize: '2vw', margin: '2vw'}}>我的好友</span>
                    <div>
                        <Table dataSource={contacts} columns={columns} />
                    </div>
                </Sider>
                <Content className={"contact-right"}>
                    <span style={{backgroundColor: 'white', fontSize: '2vw', margin: '2vw'}}>可能想认识的人</span>
                    <div>
                        <Table dataSource={recommend} columns={column_recommend} />
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default ContactsManagement;