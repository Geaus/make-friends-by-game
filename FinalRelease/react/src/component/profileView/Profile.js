import React, { Component } from 'react';
import {Avatar, Button, Card, Divider, Input, Layout, message, Modal, Space, Tag} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import'../../css/tag.css'
const { Header, Footer, Sider, Content } = Layout;

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password:"",

            avatar: "",
            tags: [],
            allTags:[],
            remainTags:[],
            modalIsOpen: false,

            file: null ,
            URL:null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentDidMount() {

        let uid = sessionStorage.getItem('uid');
        fetch('http://localhost:8080/getUser?uid=' + uid.toString()) // 发送fetch请求获取联系人信息的接口地址
            .then(response => response.json())
            .then(async data => {
                this.setState({
                    name: data.name, password: data.password,
                    tags: data.tags
                });
                let reader = new FileReader();
                const byteCharacters = atob(data.avatar);
                const byteArrays = [];
                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);
                    const byteNumbers = new Array(slice.length);
                    for (let j = 0; j < slice.length; j++) {
                        byteNumbers[j] = slice.charCodeAt(j);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
                const totalLength = byteArrays.reduce((acc, arr) => acc + arr.length, 0);
                const buffer1 = new ArrayBuffer(totalLength);
                const resultArray = new Uint8Array(buffer1);
                let offset = 0;
                for (const byteArray of byteArrays) {
                    resultArray.set(byteArray, offset);
                    offset += byteArray.length;
                }
                const readBlob = new Blob([buffer1]);


                const URL = await new Promise((resolve) => {
                    reader.onload = (event) => {
                        resolve(event.target.result);
                    };
                    reader.readAsDataURL(readBlob);
                });

                this.setState({URL: URL})

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

    handleAvatarChange = info => {
        this.setState({ avatar: info.file.url });
    };


    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };

   handlePasswordChange=e=>{
       this.setState({ password: e.target.value });
   }


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
                if(parseInt(data.id) !== -1) {
                    this.setState({ name: data.name ,password: data.password,avatar: data.avatar,tags: data.tags });
                    message.success('修改成功')
                }
                else{
                    console.log(1);
                    message.error("用户名已被占用");
                }
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    }

    handlePasswordEdit=()=>{

        const uid = sessionStorage.getItem('uid');
        const params = new URLSearchParams();

        params.append('uid', uid);
        params.append('password', this.state.password);


        fetch('http://localhost:8080/changePassword?'+params.toString()) // 发送fetch请求获取联系人信息的接口地址
            .then(response => response.json())
            .then(data => {
                this.setState({ name: data.name ,password: data.password,avatar: data.avatar,tags: data.tags });
                message.success('修改成功')
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

    handleSubmit(event) {

        event.preventDefault();

        const reader = new FileReader();
        reader.onloadend = () => {
            const data = new Uint8Array(reader.result);

            const uid = sessionStorage.getItem('uid');
            const params = new URLSearchParams();

            params.append('uid', uid);

            console.log(data);

            fetch('http://localhost:8080/changeAvatar?'+params.toString(), {
                method: 'POST',
                body: data,
            }).then(response => response.json())
                .then(async data => {

                    const byteCharacters = atob(data.avatar);
                    const byteArrays = [];
                    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                        const slice = byteCharacters.slice(offset, offset + 512);
                        const byteNumbers = new Array(slice.length);
                        for (let j = 0; j < slice.length; j++) {
                            byteNumbers[j] = slice.charCodeAt(j);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        byteArrays.push(byteArray);
                    }
                    const totalLength = byteArrays.reduce((acc, arr) => acc + arr.length, 0);
                    const buffer1 = new ArrayBuffer(totalLength);
                    const resultArray = new Uint8Array(buffer1);
                    let offset = 0;
                    for (const byteArray of byteArrays) {
                        resultArray.set(byteArray, offset);
                        offset += byteArray.length;
                    }
                    const readBlob = new Blob([buffer1]);

                    console.log(readBlob)

                    const URL = await new Promise((resolve) => {
                        reader.onload = (event) => {
                            resolve(event.target.result);
                        };
                        reader.readAsDataURL(readBlob);
                    });

                    this.setState({URL:URL})



                })
                .catch(error => {
                    console.error('Error fetching contacts:', error);
                });
        };
        reader.readAsArrayBuffer(this.state.file);
    }

    handleFileChange(event) {
        this.setState({ file: event.target.files[0] });
    }

    render() {
        const { name, avatar, tags } = this.state;

        return (

            <div>

              <div
               style={{float:'left',width:'50vw', paddingTop:'200px'}}
              >
                  <Space direction={"vertical"} align={"center"} style={{ justifyContent: 'space-evenly' ,float:'right',width:'50vw'}}>

                      <Avatar
                          size={128}
                          src={this.state.URL} />

                      <label htmlFor="username" style={{fontSize:'1vw'}}>用户名:</label>
                      <Input value={this.state.name} onChange={this.handleNameChange}
                             style={{width:'20vw',height:'5vh',fontSize:'1.5vw'}}
                             onFinish={this.handleNameEdit}/>

                      <label htmlFor="password" style={{fontSize:'1vw'}}>密码:</label>
                      <Input value={this.state.password} onChange={this.handlePasswordChange}
                             style={{width:'20vw',height:'5vh',fontSize:'1.5vw'}}
                             onFinish={this.handlePasswordEdit}
                             type={'password'}
                      />


                      <Button onClick={this.handleNameEdit}>修改用户名</Button>
                      <Button onClick={this.handlePasswordEdit}>修改密码</Button>

                      <div>
                          {/*<form onSubmit={this.handleSubmit}>*/}
                              <Input  type={'file'} style={{width:'10vw'}}  onChange={this.handleFileChange} />
                              <Button onClick={this.handleSubmit}>修改头像</Button>
                          {/*</form>*/}
                      </div>

                  </Space>





              </div>


                <div
                    style={{marginLeft:'50vw',paddingTop:'200px' ,width:'30vw'
                }}
                >

                    <label style={{fontSize:'2vw',marginBottom:'2vw'}}>我的标签</label>
                    <br/>
                    <br/>
                    <br/>

                    {this.state.tags.map(tag => (

                        <Tag className={'tag'} size={1111} key={tag.tagid} borderd={false} color="success">{tag.tagname}</Tag>
                    ))}

                    <br/>
                    <Button onClick={this.handleTagAdd}>修改标签</Button>

                    <Modal open={this.state.modalIsOpen} onOk={this.closeModal} onCancel={this.closeModal}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: 1 }}>

                                {this.state.tags.map(tag => (
                                    <Button
                                        key={tag.tagid}

                                        onClick={()=>{

                                            const params = new URLSearchParams();
                                            const uid = sessionStorage.getItem('uid');
                                            params.append('uid', uid);
                                            params.append('tagid', tag.tagid);


                                            fetch('http://localhost:8080/removeTag?'+params.toString())
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


                            <Divider/>
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


            </div>
        );
    }

}

export default Profile;


