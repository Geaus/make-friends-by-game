import React from 'react';
import {Tooltip,Button,Drawer,Modal, message} from 'antd';
import {VideoCameraOutlined,PoweroffOutlined,PhoneOutlined} from '@ant-design/icons';

class WebRTCChat extends React.Component {
  constructor(props) {
    super(props);
    this.state={mediaPanelDrawerVisible:false,isOpen:false,isWebSocket:null};
    this.localStream = null;
    this.peerConnection = null;
    this.websocket = null;
    this.socketUrl = "ws://localhost:8080/msgServer/";
    this.user = sessionStorage.getItem('uid');
    this.to_uid = null;
    this.socket = null;
    this.socketRead = false;

    this.startVideo = this.startVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.connect = this.connect.bind(this);
    this.hangUp = this.hangUp.bind(this);

  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    console.log(sessionStorage.getItem('to_uid'));
    if(sessionStorage.getItem('to_uid') != this.state.isWebSocket){
      this.setState({isWebSocket:sessionStorage.getItem('to_uid')})
      if(this.socket != null){
        this.socket.close();
      }
      this.socket = new WebSocket(this.socketUrl + this.user+"/"+sessionStorage.getItem('to_uid'));
      this.socket.onopen = () => {
        console.log("Successfully connected to the server...");
        this.socketRead = true;
      };
      this.socket.onclose = (e) => {
        console.log("Connection closed with the server: " + e.code);
        this.socketRead = false;
      };
      this.socket.onmessage = (res) => {
        const evt = JSON.parse(res.data);
        console.log(evt);
        if (evt.type === "offer") {
          console.log("Received offer, setting offer and sending answer...");
          this.onOffer(evt);
        } else if (evt.type === "answer" && this.peerStarted) {
          console.log("Received answer, setting answer SDP");
          this.onAnswer(evt);
        } else if (evt.type === "candidate" && this.peerStarted) {
          console.log("Received ICE candidate");
          this.onCandidate(evt);
        } else if (evt.type === "bye" && this.peerStarted) {
          console.log("WebRTC communication disconnected");
          this.stop();
        }
      };
    }
    if (this.props.isReceiveVideo && this.props.videoCallSender === sessionStorage.getItem('to_uid')) {
      console.log("video");
      this.setState({isOpen:true});
      this.props.setIsReceiveVideo();
    }
    if (this.props.isShowVideo && this.props.videoCallSender === sessionStorage.getItem('uid')) {
      this.openVideo();
      this.props.setIsShowVideo();
    }
    if(this.props.isOver){
      console.log(this.props.isOver)
      this.setState({mediaPanelDrawerVisible:false});
      this.hangUp1();
      this.stopVideo();
      this.props.setIsShowVideo();
      this.props.setIsOver();
    }
  }

  // ==================以上是socket=======================

  //----------------------交换信息 -----------------------

  onOffer = (evt) => {
    console.log("Received offer...");
    console.log(evt);
    this.setOffer(evt);
    this.sendAnswer(evt);
    this.peerStarted = true;
  };

  onAnswer = (evt) => {
    console.log("Received answer...");
    console.log(evt);
    this.setAnswer(evt);
  };

  onCandidate = (evt) => {
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: evt.sdpMLineIndex,
      sdpMid: evt.sdpMid,
      candidate: evt.candidate,
    });
    console.log("Received candidate...");
    console.log(candidate);
    this.peerConnection.addIceCandidate(candidate);
  };

  sendSDP = (sdp) => {
    const text = JSON.stringify(sdp);
    console.log("Sending SDP...");
    console.log(text);
    this.socket.send(text);
  };

  sendCandidate = (candidate) => {
    const text = JSON.stringify(candidate);
    console.log("Sending candidate...");
    console.log(text);
    this.socket.send(text);
  };

  //---------------------- 视频处理 -----------------------

  startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.localStream = stream;
        const localVideo = document.getElementById("local-video");
        localVideo.srcObject = stream;
        localVideo.play();
        localVideo.volume = 0;
        console.log("333");
      })
      .catch((error) => {
        console.error("An error occurred: [Error code: " + error.code + "]");
      });
  };

  stopVideo = () => {
    const localVideo = document.getElementById("local-video");
    localVideo.srcObject = null;
    this.localStream.getTracks().forEach((track) => track.stop());
  };

  //---------------------- 处理连接 -----------------------

  prepareNewConnection = () => {
    const pc_config = { iceServers: [] };
    let peer = null;
    try {
      peer = new RTCPeerConnection(pc_config);
    } catch (e) {
      console.log("Failed to create connection, error: " + e.message);
    }

    peer.onicecandidate = (evt) => {
      if (evt.candidate) {
        console.log(evt.candidate);
        this.sendCandidate({
          type: "candidate",
          sdpMLineIndex: evt.candidate.sdpMLineIndex,
          sdpMid: evt.candidate.sdpMid,
          candidate: evt.candidate.candidate,
        });
      }
    };

    console.log("Adding local stream...");
    this.localStream.getTracks().forEach((track) => {
        peer.addTrack(track, this.localStream);
      });

    peer.addEventListener("addstream", this.onRemoteStreamAdded, false);
    peer.addEventListener("removestream", this.onRemoteStreamRemoved, false);

    peer.addEventListener("addstream", (event) => {
        console.log("Adding remote stream");
        const remoteVideo = document.getElementById("remote-video");
        remoteVideo.srcObject = event.stream;
      }, false);
      
      peer.addEventListener("removestream", (event) => {
        console.log("Removing remote stream");
        const remoteVideo = document.getElementById("remote-video");
        remoteVideo.srcObject = null;
      }, false);

    return peer;
  };

  sendOffer = () => {
    this.peerConnection = this.prepareNewConnection();
    this.peerConnection
      .createOffer()
      .then((sessionDescription) => {
        this.peerConnection.setLocalDescription(sessionDescription);
        console.log("Sending: SDP");
        console.log(sessionDescription);
        this.sendSDP(sessionDescription);
      })
      .catch((error) => {
        console.log("Failed to create offer:", error);
      });
  };

  setOffer = (evt) => {
    if (!this.peerConnection) {
        this.peerConnection = this.prepareNewConnection();
    }
    this.peerConnection.setRemoteDescription(
      new RTCSessionDescription(evt)
    );
  };

  sendAnswer = () => {
    console.log("Sending answer, creating remote session description...");
    if (!this.peerConnection) {
      console.error("peerConnection does not exist!");
      return;
    }
  
    this.peerConnection
      .createAnswer()
      .then((sessionDescription) => {
        this.peerConnection.setLocalDescription(sessionDescription);
        console.log("Sending: SDP");
        console.log(sessionDescription);
        this.sendSDP(sessionDescription);
      })
      .catch((error) => {
        console.log("Failed to create answer:", error);
      });
  };

  setAnswer = (evt) => {
    if (!this.peerConnection) {
        this.peerConnection = this.prepareNewConnection();
      }
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(evt));
  };

  //-------- 处理用户UI事件 -----

  connect = () => {
    if (!this.peerStarted && this.localStream && this.socketRead) {
      this.sendOffer();
      this.peerStarted = true;
    } else {
      alert("Please capture local video data first.");
    }
  };

  hangUp = () => {
    console.log("Hang up.");
    this.stop();
    let to_uid = sessionStorage.getItem("to_uid");
    let str = to_uid + " " + "视频聊天已结束";
    this.props.websocket.send(str);
  };

  hangUp1 = () => {
    console.log("Hang up.");
    this.stop();
  };

  stop = () => {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
      this.peerStarted = false;
    }
  };

  resolveAfter1Seconds = () =>{
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  onOpen = async () => {
    let to_uid = sessionStorage.getItem("to_uid");
    let str = to_uid + " " + "答应视频聊天";
    console.log(str);
    this.props.websocket.send(str);
    this.setState({isOpen:false});
    this.setState({mediaPanelDrawerVisible:true});
    this.startVideo();
    const result = await this.resolveAfter1Seconds();
    console.log(result);
    this.connect();

  }

  onCancel=()=>{
    let to_uid = sessionStorage.getItem("to_uid");
    let str = to_uid + " " + "拒绝视频聊天";
    this.props.websocket.send(str);
    this.setState({isOpen:false});
  }

  openVideo = () => {
    message.success('好友已经应答，进入视频聊天');
    this.setState({mediaPanelDrawerVisible:true});
  }

  sendCall = () => {
    let to_uid = sessionStorage.getItem("to_uid");
    let str = to_uid + " " + "视频聊天";
    console.log(str);
    this.props.websocket.send(str);
    this.startVideo();
  }

  onclose=()=>{
    this.setState({mediaPanelDrawerVisible:false});
    this.hangUp();
    this.stopVideo();
    this.props.setIsShowVideo();
    this.props.setIsOver();
  }

  closeModal = () => {
    console.log("ok");
    
  }

  render() {
    return (
        
      <>
        
                <Tooltip title="视频聊天">
                    <Button
                        shape="circle"
                        onClick={this.sendCall}
                        style={{ marginRight: 10 }}
                        icon={<VideoCameraOutlined />}
                    />
                </Tooltip>
                <Modal title="语音通话" 
                  open={this.state.isOpen}
                  onOk={this.onOpen}
                  onCancel={this.onCancel}
                >
                  <p>好友邀请您语音聊天</p>
                </Modal>

                <Drawer width='500px'
                    forceRender={true}
                    title="媒体面板"
                    placement="right"
                    onClose={this.onclose}
                    open={this.state.mediaPanelDrawerVisible}
                >
                  <Tooltip title="开始视频通话">
                        <Button
                            shape="circle"
                            onClick={this.connect}
                            style={{ marginTop: 10, marginRight:10, float: 'top' }}
                            icon={<PhoneOutlined style={{ color: 'green' }} />}
                        />
                    </Tooltip>
                    <Tooltip title="结束视频语音">
                        <Button
                            shape="circle"
                            onClick={this.hangUp}
                            style={{ marginTop: 10,marginRight:10, float: 'top' }}
                            icon={<PoweroffOutlined style={{ color: 'red' }} />}
                        />
                    </Tooltip>
                    <br />
                    <video
                      id="local-video"
                      autoPlay
                       style={{ width: "400px", height: "300px", border: "1px solid black", marginTop: 10 }}
                    ></video>
                    <video
                      id="remote-video"
                      autoPlay
                      style={{ width: "400px", height: "300px", border: "1px solid black",marginTop: 10}}
                    ></video>
                </Drawer>
      </>
    );
  }
}

export default WebRTCChat;


