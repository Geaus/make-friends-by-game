import React, { Component } from 'react';
import { Table, Button } from 'antd';

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
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });

        this.setState({ contacts: updatedContacts });
    }

    render() {
        const { contacts } = this.state;

        const columns = [
            {
                title: 'To User',
                dataIndex: 'toUser',
                key: 'toUser',
                render: (toUser) => toUser.name
            },

            {
                title: 'Actions',
                key: 'actions',
                render: (_, contact) => (
                    <React.Fragment>
                        {!contact.isBlack ? (
                            <React.Fragment>
                                <Button onClick={() => this.handleBlacklist(contact.toUser.id)}>Black</Button>
                                {/*<Button onClick={() => this.handleDelete(contact.toUser.id)}>Delete</Button>*/}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button onClick={() => this.handleUnblacklist(contact.toUser.id)}>Unblack</Button>
                                {/*<Button onClick={() => this.handleDelete(contact.toUser.id)}>Delete</Button>*/}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ),
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