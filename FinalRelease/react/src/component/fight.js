import React, { Component } from "react";
// 以CSS Modules方式引入Home页样式
import style from "./fight.css";
// 引入图片
import { Input, Button, Icon, Modal } from 'antd';
import Stand from "../asset/pic/stand.png";
import Kick from "../asset/pic/kick.png"

var m;
var player2;
var bar;
var boom, boom1;
var arrKey = {};
var blood2,blood1;

// 导出Home页组件
export class Home extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	        lock : false,
			lock1 : false,
	        keep1 : false,
			keep2 : false,
	        boomTime : false,
	        wait : false,
			winner : null,
			isOpen : false
	    };
		this.koRef = React.createRef();
		this.mRef = React.createRef();
		this.player2 = React.createRef();
		this.bar = React.createRef();
		this.boom = React.createRef();
		this.boom1 = React.createRef();
		this.websocket = null;
	}

	move=(e)=>{
		console.log(this.props.isShowGame)
		if(this.props.isShowGame === false) return;
		if(this.state.lock == true){
			return
		}
		else{
			this.setState({ lock: true});
			let self = this
			arrKey[e.keyCode] = true
			this.effect(e)
			//单个键
			switch (e.keyCode){
				case 68:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 68);
					console.log("发送WebSocket消息:");
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							m.style.left = m.offsetLeft+6+"px";
							m.src = require(`../asset/pic/go${i}.png`); 
							i === 6 && self.setState({ lock: false});
						}, i*100);
					}
					break;
				case 37:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 37);
					console.log("发送WebSocket消息:");
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							player2.style.left = player2.offsetLeft-6+"px";
							player2.src = require(`../asset/pic/go${i}.png`); 
							i === 6 && self.setState({ lock: false});
						}, i*100);
					}
					break;
				case 65:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 65);
					console.log("发送WebSocket消息:");
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							m.style.left = m.offsetLeft-6+"px";
							m.src = require(`../asset/pic/back${i}.png`); 
							i === 6 && self.setState({ lock: false});
						}, i*100);
					}
					break;
				case 39:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 39);
					console.log("发送WebSocket消息:");
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							player2.style.left = player2.offsetLeft+6+"px";
							player2.src = require(`../asset/pic/back${i}.png`); 
							i === 6 && self.setState({ lock: false});
						}, i*100);
					}
					break;
				case 83:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 83);
					console.log("发送WebSocket消息:");
					self.setState({ lock: false});
					if(this.state.keep1 === false){
						self.setState({ keep1: true});
						for(let i=1;i<=3;i++){
							setTimeout(function(){ 
								m.src = require(`../asset/pic/down${i}.png`); 
							}, i*40);
						}
					}
					break;
				case 40:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 40);
					console.log("发送WebSocket消息:");
					self.setState({ lock: false});
					if(this.state.keep2 === false){
						self.setState({ keep2: true});
						for(let i=1;i<=3;i++){
							setTimeout(function(){ 
								player2.src = require(`../asset/pic/down${i}.png`); 
							}, i*40);
						}
					}
					break;
				case 74:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 74);
					console.log("发送WebSocket消息:");
					if(!arrKey[83]){
						m.src = Kick
						setTimeout(function(){ 
							m.src = Stand; 
						}, 200);
					}
					break;
				case 78:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 78);
					console.log("发送WebSocket消息:");
					if(!arrKey[40]){
						player2.src = Kick
						setTimeout(function(){ 
							player2.src = Stand; 
						}, 200);
					}
					break;
				case 75:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 75);
					console.log("发送WebSocket消息:");
					if(!arrKey[83] && !arrKey[32]){
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								m.src = require(`../asset/pic/leg${i}.png`); 
								i === 5 && self.setState({ lock: false});
							}, i*100);
						}
					}	
					break;
				case 77:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 77);
					console.log("发送WebSocket消息:");
					if(!arrKey[40]){
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								player2.src = require(`../asset/pic/leg${i}.png`); 
								i === 5 && self.setState({ lock: false});
							}, i*100);
						}
					}	
					break;
				case 32:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 32);
					console.log("发送WebSocket消息:");
					for(let i=1;i<=2;i++){
						setTimeout(function(){ 
							m.src = require(`../asset/pic/jump${i}.png`); 
							//m.style.top = m.offsetTop-40+"px";
							m.style.bottom = 200+"px"
							if(i === 2){
								for(let j=3;j<=4;j++){
									setTimeout(function(){ 
										m.src = require(`../asset/pic/jump${j}.png`); 
										m.style.bottom = 130+"px"
										j === 4 && self.setState({ lock: false});
									}, j*100);
								}
							}
						}, i*100);
					}

					break;
				case 38:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 38);
					console.log("发送WebSocket消息:");
					for(let i=1;i<=2;i++){
						setTimeout(function(){ 
							player2.src = require(`../asset/pic/jump${i}.png`); 
							//m.style.top = m.offsetTop-40+"px";
							player2.style.bottom = 200+"px"
							if(i === 2){
								for(let j=3;j<=4;j++){
									setTimeout(function(){ 
										player2.src = require(`../asset/pic/jump${j}.png`); 
										player2.style.bottom = 130+"px"
										j === 4 && self.setState({ lock: false});
									}, j*100);
								}
							}
						}, i*100);
					}

					break;
				case 76:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 76);
					console.log("发送WebSocket消息:");
					if(!this.state.boomTime){
						this.setState({ boomTime: true});
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								m.src = require(`../asset/pic/boom${i}.png`); 
								if (i===5){
									boom.style.left = m.offsetLeft+90+"px"
									boom.style.display = "block"
									let fly = setInterval(function(){
										boom.style.left = boom.offsetLeft+15+"px"
										if(player2.offsetLeft - boom.offsetLeft <= 48){
											clearInterval(fly);
											boom.style.display = "none"
											blood2 = blood2 - 20
											if(blood2 < 172) blood2 = 172;
											bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
											self.attacked2()
										}
										if(boom.offsetLeft>730){
											clearInterval(fly);
											boom.style.display = "none"
										}
									},60)
								}
							}, i*150);
						}
						self.setState({ lock: false});
					}
					break;
				case 66:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 66);
					console.log("发送WebSocket消息:");
					if(!this.state.boomTime){
						this.setState({ boomTime: true});
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								player2.src = require(`../asset/pic/boom${i}.png`); 
								if (i===5){
									boom1.style.left = player2.offsetLeft-90+"px"
									boom1.style.display = "block"
									let fly = setInterval(function(){
										boom1.style.left = boom1.offsetLeft-15+"px"
										if(m.offsetLeft - boom1.offsetLeft >= -48){
											clearInterval(fly);
											boom1.style.display = "none"
											blood1 = blood1 - 20
											if(blood1 < 172) blood1 = 172;
											console.log(blood1);
											bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
											self.attacked1()
										}
										if(boom1.offsetLeft>730){
											clearInterval(fly);
											boom1.style.display = "none"
										}
									},60)
								}
							}, i*150);
						}
						self.setState({ lock: false});
					}
					break;
				case 72:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 72);
					console.log("发送WebSocket消息:");
					if(!this.state.wait){
						this.setState({ wait: true});
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								m.style.left = m.offsetLeft+20+"px"
								m.src = require(`../asset/pic/jump_kick${i}.png`); 
								if(player2.offsetLeft - m.offsetLeft <= 120){
									blood2 = blood2 - 10
									if(blood2 < 172) blood2 = 172;
									bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
									self.attackedFly(2)
								}
								i === 5 && self.setState({ lock: false});
							}, i*100);
						}
						self.setState({ lock: false});
					}
					break;	
				case 86:
					this.websocket.send(sessionStorage.getItem("to_uid") + " " + 86);
					console.log("发送WebSocket消息:");
					if(!this.state.wait){
						this.setState({ wait: true});
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								player2.style.left = player2.offsetLeft-20+"px"
								player2.src = require(`../asset/pic/jump_kick${i}.png`); 
								if(player2.offsetLeft - m.offsetLeft <= 120){
									blood1 = blood1 - 10
									if(blood1 < 172) blood1 = 172;
									bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
									self.attackedFly(1)
								}
								i === 5 && self.setState({ lock: false});
							}, i*100);
						}
						self.setState({ lock: false});
					}
					break;	
				default:
	           		self.setState({ lock: false});
	          		break; 		

			}
			this.limit()
		}
		
	}

	keyup=(e)=>{
		if(this.props.isShowGame === false) return;
		arrKey[e.keyCode] = false
		switch(e.keyCode){
			case 83:
				m.src = require('../asset/pic/go1.png')
				this.setState({ keep1: false})
				this.websocket.send(sessionStorage.getItem("to_uid") + " " + "83up");
				console.log("发送WebSocket消息:");
				break;
			case 40:
				player2.src = require('../asset/pic/go1.png')
				this.setState({ keep2: false})
				this.websocket.send(sessionStorage.getItem("to_uid") + " " + "40up");
				console.log("发送WebSocket消息:");
				break;
			case 74:
				this.setState({ lock: false});
				this.websocket.send(sessionStorage.getItem("to_uid") + " " + "74up");
				console.log("发送WebSocket消息:");
				break;	
			case 78:
				this.setState({ lock: false});
				this.websocket.send(sessionStorage.getItem("to_uid") + " " + "78up");
				break;
			case 75:
				//this.setState({ lock: false});
				break;	
			default:	
				break;
		}	
		if(!arrKey[83] || !arrKey[68]){
			this.setState({ boomTime: false});
		}
		if(!arrKey[83] || !arrKey[65]){
			this.setState({ wait: false});
		}
	}

	limit=()=>{
		if(m.offsetLeft<=36){
			m.style.left=36+'px'
		}
		if(m.offsetLeft>=612){
			m.style.left=612+'px'
		}
		if(m.offsetTop<=0){
			m.style.top=0
		}
		if(m.offsetTop>=380){
			m.style.top=380+'px'
		}  
		if(player2.offsetLeft>=680){
			player2.style.left=680+'px'
		}
		if(player2.offsetLeft<=104){
			player2.style.left=104+'px'
		}

    }

    ko2(){
    	let self = this
    	//this.koRef.current.style.display = "block";
    	for(let i=1;i<=4;i++){
			setTimeout(function(){ 
				player2.style.left = player2.offsetLeft+8+"px"
				self.limit()
				player2.src = require(`../asset/pic/fall${i}.png`); 
			}, i*100);
		}
		this.setState({winner : 2});
		this.setState({isOpen : true});
    }

	ko1(){
    	let self = this
    	//this.koRef.current.style.display = "block";
    	for(let i=1;i<=4;i++){
			setTimeout(function(){ 
				m.style.left = m.offsetLeft+8+"px"
				self.limit()
				m.src = require(`../asset/pic/fall${i}.png`); 
			}, i*100);
		}
		this.setState({winner : 1});
		this.setState({isOpen : true});
    }

	attacked1 = () => {
    	if(blood1 <= 172){
			blood1 = 172;
			this.ko1()
		}
		else{
			for(let i=1;i<=2;i++){
				setTimeout(function(){ 
					m.src = require(`../asset/pic/beattacked${i}.png`); 
				}, i*60);
			}
			setTimeout(function(){ 
				m.src = require('../asset/pic/stand.png'); 
			}, 400);
		}
    }

    attacked2 = ()=>{
    	if(blood2 <= 172){
			blood2 = 172;
			this.ko2()
		}
		else{
			for(let i=1;i<=2;i++){
				setTimeout(function(){ 
					player2.src = require(`../asset/pic/beattacked${i}.png`); 
				}, i*60);
			}
			setTimeout(function(){ 
				player2.src = require('../asset/pic/stand.png'); 
			}, 400);
		}
    }

    attackedFly = (player)=>{
    	if(blood2 <= 172 || blood1 <= 172){
			if(player === 2){
				this.ko2();
			}
			if(player === 1){
				this.ko1();
			}
		}
		else{
			if(player === 2){
				let self = this
				for(let i=1;i<=4;i++){
					setTimeout(function(){ 
						player2.style.left = player2.offsetLeft+8+"px"
						self.limit()
						player2.src = require(`../asset/pic/fall${i}.png`); 
					}, i*100);
				}
				setTimeout(function(){ 
					player2.src = require('../asset/pic/stand.png'); 
				}, 1500);
			}
			if(player === 1){
				let self = this
				for(let i=1;i<=4;i++){
					setTimeout(function(){ 
						m.style.left = m.offsetLeft-8+"px"
						self.limit()
						m.src = require(`../asset/pic/fall${i}.png`); 
					}, i*100);
				}
				setTimeout(function(){ 
					m.src = require('../asset/pic/stand.png'); 
				}, 1500);
			}
		}
    }

    effect = e =>{
		let distance = player2.offsetLeft - m.offsetLeft
		//console.log("p1",m.offsetLeft)
		//console.log("p2",player2.offsetLeft)
		switch (e.keyCode){
			case 68:
				if(distance <= 86){
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							player2.style.left = player2.offsetLeft+6+"px";
							player2.src = require(`../asset/pic/back${i}.png`); 
						}, i*80);
					}
				}
				break;
			case 37:
				if(distance <= 86){
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							m.style.left = m.offsetLeft-6+"px";
							m.src = require(`../asset/pic/back${i}.png`); 
						}, i*80);
					}
				}
				break;
			case 74:
				if(distance <= 86){
					blood2 = blood2 - 15
					if(blood2 < 172) blood2 = 172;
					bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
					this.attacked2()
				}
				break;
			case 78:
				if(distance <= 86){
					blood1 = blood1 - 15
					if(blood1 < 172) blood1 = 172;
					bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
					this.attacked1()
				}
				break;
			case 75:
				if(distance <= 116){
					blood2 = blood2 - 15
					if(blood2 < 172) blood2 = 172;
					bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
					this.attacked2()
				}
				break;
			case 77:
				if(distance <= 116){
					blood1 = blood1 - 15
					if(blood1 < 172) blood1 = 172;
					bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
					this.attacked1()
				}
				break;
			case 32:
				break;
			default:
           		
          		break; 		

		}

    }

	effect1 = e =>{
		let distance = player2.offsetLeft - m.offsetLeft
		//console.log("p1",m.offsetLeft)
		//console.log("p2",player2.offsetLeft)
		switch (e.data){
			case "68":
				if(distance <= 86){
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							player2.style.left = player2.offsetLeft+6+"px";
							player2.src = require(`../asset/pic/back${i}.png`); 
						}, i*80);
					}
				}
				break;
			case "37":
				if(distance <= 86){
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							m.style.left = m.offsetLeft-6+"px";
							m.src = require(`../asset/pic/back${i}.png`); 
						}, i*80);
					}
				}
				break;
			case "74":
				if(distance <= 86){
					blood2 = blood2 - 15
					if(blood2 < 172) blood2 = 172;
					bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
					this.attacked2()
				}
				break;
			case "78":
				if(distance <= 86){
					blood1 = blood1 - 15
					if(blood1 < 172) blood1 = 172;
					bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
					this.attacked1()
				}
				break;
			case "75":
				if(distance <= 116){
					blood2 = blood2 - 15
					if(blood2 < 172) blood2 = 172;
					bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
					this.attacked2()
				}
				break;
			case "77":
				if(distance <= 116){
					blood1 = blood1 - 15
					if(blood1 < 172) blood1 = 172;
					bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
					this.attacked1()
				}
				break;
			case 32:
				break;
			default:
           		
          		break; 		

		}

    }
    startGame = ()=>{
		this.websocket.send(sessionStorage.getItem("to_uid") + " " + "重新启动")
		this.state = {
	        lock : false,
			lock1 : false,
	        keep1 : false,
			keep2 : false,
	        boomTime : false,
	        wait : false,
			winner : null,
			isOpen : false
	    };
		player2.style.left=450+'px'
		m.style.left = 36+'px';
		player2.src = require(`../asset/pic/go1.png`);
		m.src = require(`../asset/pic/go1.png`);
		blood2 = 322;
		blood1 = 322;
		arrKey = {};
		bar.style.clip = `rect(0 322px 50px 0px)`;
		this.setState({isOpen : false});
	}
    startGame1 = ()=>{
		this.state = {
	        lock : false,
			lock1 : false,
	        keep1 : false,
			keep2 : false,
	        boomTime : false,
	        wait : false,
			winner : null,
			isOpen : false
	    };
		player2.style.left=450+'px'
		m.style.left = 36+'px';
		player2.src = require(`../asset/pic/go1.png`);
		m.src = require(`../asset/pic/go1.png`);
		blood2 = 322;
		blood1 = 322;
		arrKey = {};
		bar.style.clip = `rect(0 322px 50px 0px)`;
		this.setState({isOpen : false});
	}

	sleep = (ms)=> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	componentDidUpdate() {
		if(this.props.gameIsFinished){
			console.log("ok");
		  this.startGame1();
		  this.props.setGameIsFinished();
		}
	}

	componentDidMount(){
		m =this.mRef.current;
		player2 =this.player2.current;
		boom =this.boom.current;
		boom1 =this.boom1.current;
		bar =this.bar.current;
		blood2 = 322;
		blood1 = 322;
		arrKey = {};
		this.koRef.current.style = "none";
		window.addEventListener('keydown', this.move)
		window.addEventListener('keyup', this.keyup)


		const userName = sessionStorage.getItem("uid");
		const baseUrl = "ws://localhost:8080/websocket/fight/" + userName.toString();
		this.websocket = new WebSocket(baseUrl);

		this.websocket.onopen = () => {
		console.log("WebSocket连接已建立");
		};

		this.websocket.onmessage = async (event) => {
			console.log("收到WebSocket消息:", event.data);
		if(event.data === "74up" || event.data === "78up"){
			console.log("收到WebSocket消息:", event.data);
			this.setState({lock1 : false});
		}
		if(event.data === "重新启动"){
			this.startGame1();
		}
		if(event.data === "取消"){
			this.setState({isOpen : false});
		}
		if(this.state.lock1 == true){
			return
		}
		else{
			this.setState({ lock1: true});
			let self = this
			arrKey[event.data] = true
			this.effect1(event)
			//单个键
			switch (event.data){
				case "68":
					console.log("收到WebSocket消息:", event.data);
					//self.setState({ lock1: false});
					for(let i=1;i<=6;i++){
						console.log(i);
						setTimeout(function(){ 
							
							m.style.left = m.offsetLeft+6+"px";
							m.src = require(`../asset/pic/go${i}.png`); 
							
						}, i*99);
					}
					self.setState({ lock1: false});
					break;
				case "37":
					console.log("收到WebSocket消息:", event.data);
					for(let i=1;i<=6;i++){
						 
						setTimeout(function(){ 
							player2.style.left = player2.offsetLeft-6+"px";
							player2.src = require(`../asset/pic/go${i}.png`); 
							i === 6 && self.setState({ lock1: false});
						}, i*99);
						self.setState({ lock1: false});
					}
					break;
				case "65":
					console.log("收到WebSocket消息:", event.data);
					for(let i=1;i<=6;i++){
						console.log(i);
						
						setTimeout(function(){ 
							
							m.style.left = m.offsetLeft-6+"px";
							m.src = require(`../asset/pic/back${i}.png`); 
							i === 6 && self.setState({ lock1: false});
						}, i*99);
					}
					break;
				case "39":
					console.log("收到WebSocket消息:", event.data);
					for(let i=1;i<=6;i++){
						console.log(i);
						
						setTimeout(function(){ 
							player2.style.left = player2.offsetLeft+6+"px";
							player2.src = require(`../asset/pic/back${i}.png`); 
							i === 6 && self.setState({ lock1: false});
						}, i*100);
					}
					break;
				case "83":
					console.log("收到WebSocket消息:", event.data);
					self.setState({ lock1: false});
					if(this.state.keep1 === false){
						self.setState({ keep1: true});
						for(let i=1;i<=3;i++){
							console.log(i);
							setTimeout(function(){ 
								m.src = require(`../asset/pic/down${i}.png`); 
							}, i*40);
						}
					}
					break;
				case "83up":
					arrKey[83] = false;
					console.log("收到WebSocket消息:", arrKey[83]);
					self.setState({ lock1: false});
					m.src = require('../asset/pic/go1.png')
					this.setState({ keep1: false})
					break;

				case "40":
					console.log("收到WebSocket消息:", event.data);
					self.setState({ lock1: false});
					if(this.state.keep2 === false){
						self.setState({ keep2: true});
						for(let i=1;i<=3;i++){
							console.log(i);
							setTimeout(function(){ 
								player2.src = require(`../asset/pic/down${i}.png`); 
							}, i*40);
						}
					}
					break;

				case "40up":
					arrKey[40] = false;
						console.log("收到WebSocket消息:", event.data);
						arrKey[40] = false
						self.setState({ lock1: false});
						player2.src = require('../asset/pic/go1.png')
						this.setState({ keep2: false})
						break;
				case "74":
					console.log("收到WebSocket消息:", event.data);
					if(!arrKey[83]){
						m.src = Kick
						setTimeout(function(){ 
							m.src = Stand; 
						}, 200);
					}
					break;
				case "78":
					console.log("收到WebSocket消息:", event.data);
					if(!arrKey[40]){
						player2.src = Kick
						setTimeout(function(){ 
							player2.src = Stand; 
						}, 200);
					}
					break;
				case "75":
					console.log("收到WebSocket消息:", event.data);
					if(!arrKey[83] && !arrKey[32]){
						for(let i=1;i<=5;i++){
							 
							setTimeout(function(){ 
								m.src = require(`../asset/pic/leg${i}.png`); 
								i === 5 && self.setState({ lock1: false});
							}, i*99);
							
						}
						self.setState({ lock1: false});
					}	
					break;
				case "77":
					console.log("收到WebSocket消息:", event.data);
					if(!arrKey[40]){
						for(let i=1;i<=5;i++){
							
							setTimeout(function(){ 
								player2.src = require(`../asset/pic/leg${i}.png`); 
								i === 5 && self.setState({ lock1: false});
							}, i*99);
						}
						self.setState({ lock1: false});
					}	
					break;
				case "32":
					for(let i=1;i<=2;i++){
						setTimeout(function(){ 
							m.src = require(`../asset/pic/jump${i}.png`); 
							//m.style.top = m.offsetTop-40+"px";
							m.style.bottom = 200+"px"
							if(i === 2){
								for(let j=3;j<=4;j++){
									setTimeout(function(){ 
										m.src = require(`../asset/pic/jump${j}.png`); 
										m.style.bottom = 130+"px"
										j === 4 && self.setState({ lock1: false});
									}, j*100);
								}
							}
						}, i*99);
					}

					break;
				case "38":
					for(let i=1;i<=2;i++){
						setTimeout(function(){ 
							player2.src = require(`../asset/pic/jump${i}.png`); 
							//m.style.top = m.offsetTop-40+"px";
							player2.style.bottom = 200+"px"
							if(i === 2){
								for(let j=3;j<=4;j++){
									setTimeout(function(){ 
										player2.src = require(`../asset/pic/jump${j}.png`); 
										player2.style.bottom = 130+"px"
										j === 4 && self.setState({ lock1: false});
									}, j*99);
								}
							}
						}, i*100);
					}

					break;
				case "76":
					if(!this.state.boomTime){
						this.setState({ boomTime: true});
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								m.src = require(`../asset/pic/boom${i}.png`); 
								if (i===5){
									boom.style.left = m.offsetLeft+90+"px"
									boom.style.display = "block"
									let fly = setInterval(function(){
										boom.style.left = boom.offsetLeft+15+"px"
										if(player2.offsetLeft - boom.offsetLeft <= 48){
											clearInterval(fly);
											boom.style.display = "none"
											blood2 = blood2 - 20
											if(blood2 < 172) blood2 = 172;
											bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
											self.attacked2()
										}
										if(boom.offsetLeft>730){
											clearInterval(fly);
											boom.style.display = "none"
										}
									},60)
								}
							}, i*150);
						}
						self.setState({ lock1: false});
						this.setState({ boomTime: false});
					}
					break;
				case "66":
					if(!this.state.boomTime){
						this.setState({ boomTime: true});
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								player2.src = require(`../asset/pic/boom${i}.png`); 
								if (i===5){
									boom1.style.left = player2.offsetLeft-90+"px"
									boom1.style.display = "block"
									let fly = setInterval(function(){
										boom1.style.left = boom1.offsetLeft-15+"px"
										if(m.offsetLeft - boom1.offsetLeft >= -48){
											clearInterval(fly);
											boom1.style.display = "none"
											blood1 = blood1 - 20
											console.log(blood1);
											if(blood1 < 172) blood1 = 172;
											bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
											self.attacked1()
										}
										if(boom1.offsetLeft>730){
											clearInterval(fly);
											boom1.style.display = "none"
										}
									},60)
								}
							}, i*150);
						}
						self.setState({ lock1: false});
						this.setState({ boomTime: false});
					}
					break;
				case "72":
					console.log("收到WebSocket消息:", event.data);
					if(!this.state.wait){
						this.setState({ wait: true});
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								m.style.left = m.offsetLeft+20+"px"
								m.src = require(`../asset/pic/jump_kick${i}.png`); 
								if(player2.offsetLeft - m.offsetLeft <= 120){
									blood2 = blood2 - 10
									if(blood2 < 172) blood2 = 172;
									bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
									self.attackedFly(2)
								}
								i === 5 && self.setState({ lock1: false});
							}, i*100);
						}
						
					}
					self.setState({ lock1: false});
					this.setState({ wait: false});
					break;	
				case "86":
					console.log("收到WebSocket消息:", event.data);
					if(!this.state.wait){
						this.setState({ wait: true});
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								player2.style.left = player2.offsetLeft-20+"px"
								player2.src = require(`../asset/pic/jump_kick${i}.png`); 
								if(player2.offsetLeft - m.offsetLeft <= 120){
									blood1 = blood1 - 10
									if(blood1 < 172) blood1 = 172;
									bar.style.clip = `rect(0 ${blood2}px 50px ${322 - blood1}px)`
									self.attackedFly(1)
								}
								i === 5 && self.setState({ lock1: false});
							}, i*100);
						}
					}
					self.setState({ lock1: false});
					this.setState({ wait: false});
					break;	
				default:
					console.log("收到WebSocket消息:", event.data);
	           		self.setState({ lock1: false});
	          		break; 		

			}
			
			this.limit()
		}	
		};

		this.websocket.onclose = () => {
		console.log("WebSocket连接已关闭");
		};
	}
	onCancel = () =>{
		this.setState({isOpen : false});
		this.websocket.send(sessionStorage.getItem("to_uid") + " " + "取消");
	}
    render(){
		if(this.props === null) return;
        return <div className="container">
			<Modal title="游戏结束" 
                open={this.state.isOpen}
                onOk={this.startGame}
                onCancel={this.onCancel}
            >
                <p>是否要重新游戏？</p>
            </Modal>
        	<img className="ko" ref = {this.koRef} src={require('../asset/pic/KO.png')} />
        	<img className="bar" ref = {this.bar} src={require('../asset/pic/bar.gif')} />
        	<img className="move" ref = {this.mRef} src={require('../asset/pic/go1.png')} />
        	<img className="boom" ref = {this.boom} src={require('../asset/pic/boom.png')} />
			<img className="boom1" ref = {this.boom1} src={require('../asset/pic/boom.png')} />
        	<img className="player2" ref = {this.player2} src={require('../asset/pic/stand.png')} />
        </div>
    }
}