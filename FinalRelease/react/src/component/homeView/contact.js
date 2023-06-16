import React, { Component } from 'react';
import {Table, Button, message} from 'antd';
import {acceptFriend, rejectFriend, searchUser} from "../../service/UserService";

class ContactsManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [], // 存储联系人信息
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
    }

    acceptFriend = (target_id) => {
        acceptFriend(target_id, this.accept_callback);
    }

    rejectFriend = (target_id) => {
        rejectFriend(target_id, this.reject_callback);
    }

    render() {
        const { contacts } = this.state;

        const columns = [
            {
                title: '昵称',
                dataIndex: 'toUser',
                key: 'toUser',
                render: (_, contact) => {
                    let uid = sessionStorage.getItem('uid');
                    if(parseInt(contact.toUser.id) === parseInt(uid))return contact.fromUser.name;
                    else return contact.toUser.name;
                }
            },

            {
                title: '操作',
                key: 'actions',
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

        return (
            <div>
                <Table dataSource={contacts} columns={columns} />
            </div>
        );
    }
}

export default ContactsManagement;