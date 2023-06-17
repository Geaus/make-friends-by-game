import React, { Component } from 'react';
import {Avatar, Button, Input, Modal, Space, Tag} from 'antd';
import {UserOutlined} from "@ant-design/icons";


class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            avatar: "",
            tags: [],
            allTags:[],
            remainTags:[],
            modalIsOpen: false,
        };
    }

    componentDidMount() {

        let uid = sessionStorage.getItem('uid');
        fetch('http://localhost:8080/getUser?uid=' + uid.toString()) // 发送fetch请求获取联系人信息的接口地址
            .then(response => response.json())
            .then(data => {
                this.setState({ name: data.name ,avatar: data.avatar,tags: data.tags });
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });


        fetch('http://localhost:8080/getTag') // 发送fetch请求获取联系人信息的接口地址
            .then(response => response.json())
            .then(data => {

                this.setState({allTags:data})

                let allTags = data;
                let remain = [];

                for(let i = 0; i < allTags.length; i++){

                    let flag=0;

                    for(let j=0;j<this.state.tags.length;j++){

                        if(parseInt(allTags[i].tagid)===parseInt(this.state.tags[j].tagid)){
                            flag=1;
                        }
                    }

                    if(flag===0){
                        remain.push(allTags[i]);
                    }
                }

                console.log(remain)
                this.setState({remainTags:remain});
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };

    handleAvatarChange = info => {
        this.setState({ avatar: info.file.url });
    };

    handleTagAdd = () => {
        this.setState({ modalIsOpen: true });

    };

    handleNameEdit =()=>{

        const uid = sessionStorage.getItem('uid');
        const params = new URLSearchParams();

        params.append('uid', uid);
        params.append('name', this.state.name);


        fetch('http://localhost:8080/changeName?'+params.toString()) // 发送fetch请求获取联系人信息的接口地址
            .then(response => response.json())
            .then(data => {
                this.setState({ name: data.name ,avatar: data.avatar,tags: data.tags });
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        const { name, avatar, tags } = this.state;

        return (
            <div>

                <Space direction={"vertical"} align={"center"} style={{ justifyContent: 'space-evenly' }}>
                    <Avatar
                        size={128}
                        icon={<UserOutlined />}
                    />
                    <Input value={this.state.name} onChange={this.handleNameChange}
                           style={{width:'300px'}}
                           onFinish={this.handleNameEdit}/>

                    <div>
                        {this.state.tags.map(tag => (
                            <Tag key={tag.tagid}>{tag.tagname}</Tag>
                        ))}

                        <Button onClick={this.handleTagAdd}>添加标签</Button>

                        <Modal open={this.state.modalIsOpen} onOk={this.closeModal} onCancel={this.closeModal}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1 }}>

                                    {this.state.tags.map(tag => (
                                        <Button key={tag.tagid} >{tag.tagname}</Button>
                                    ))}

                                </div>

                                <div style={{ flex: 1 }}>

                                    {this.state.remainTags.map(tag => (

                                        <Button key={tag.tagid}
                                                onClick={()=>{

                                                    const params = new URLSearchParams();
                                                    const uid = sessionStorage.getItem('uid');
                                                    params.append('uid', uid);
                                                    params.append('tagid', tag.tagid);


                                                    fetch('http://localhost:8080/addTag?'+params.toString())
                                                        .then(response => response.json())
                                                        .then(data => {
                                                            let allTags = this.state.allTags;
                                                            let remain = [];

                                                            for(let i = 0; i < allTags.length; i++){

                                                                let flag=0;

                                                                for(let j=0;j<data.length;j++){

                                                                    if(parseInt(allTags[i].tagid)===parseInt(data[j].tagid)){
                                                                        flag=1;
                                                                    }
                                                                }

                                                                if(flag===0){
                                                                    remain.push(allTags[i]);
                                                                }
                                                            }

                                                            console.log(remain)
                                                            this.setState({remainTags:remain});
                                                            this.setState({ tags:data });
                                                        })
                                                        .catch(error => {
                                                            console.error('Error fetching contacts:', error);
                                                        });


                                                }}
                                        >{tag.tagname}</Button>
                                    ))}

                                </div>
                            </div>
                        </Modal>

                    </div>
                    <Button onClick={this.handleNameEdit}>Edit</Button>
                </Space>


            </div>
        );
    }

}

export default Profile;


