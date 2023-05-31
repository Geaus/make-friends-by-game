import React from 'react';
import ReactDOM from 'react-dom';
import '../css/game.css';

let websocket;
// 一个方格
function Square(props) {
    // 胜利时的高亮样式  是一个数组  赢的那条线有独特的高亮颜色，其他棋盘各自没有特殊的高亮样式
    let hightLightClass = Array(9).fill('square')
    // 胜利的那条线  从Game传给Bord  再从Bord传给Square  没胜利线时为null
    const winLine = props.winLine
    // 当有胜利的那条线的时候，执行修改高亮样式数组操作
    if (winLine) {
        for (let i = 0; i < props.winLine.length; i++) {
            // num为胜利线的坐标号  通过遍历胜利线数组获取
            let num = winLine[i]
            // 根据胜利线坐标号 设置对应位置的棋盘格子的高亮样式
            hightLightClass[num] = 'hightLight square'
        }
    }
    // 返回H5
    return (
        // 每个button就是一个棋盘格子  数据和事件均通过props由父对象传入
        <button className={hightLightClass[props.index]} onClick={props.onClick} key={props.index}>
            {props.value}
        </button>
    )
}


// 整个棋盘  是Game的子元素  是Square的父元素
class Board extends React.Component {
    // i是棋盘格子个坐标号
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={
                    () => this.props.onClick(i)
                }
                winLine={
                    this.props.winLine
                }
                index={i}

            />
        )
    }
    render() {
        return (
            <div>
                {
                    Array(3).fill(null).map((itemx, indexx) => (
                        <div className="board-row" key={indexx}>
                            {
                                Array(3).fill(null).map((itemy, indexy) => (
                                    this.renderSquare(indexx * 3 + indexy)
                                ))
                            }
                        </div>
                    ))
                }

            </div>
        );
    }
}

// 顶级父组件
export class Game extends React.Component {
    // 要用到的数据的初始化
    constructor(props) {
        super(props);
        console.log(1);
        this.state = {
            // 历史记录数据  包含棋子的内容和位置
            history: [
                {
                    // 历史记录的棋子内容数据 ，每条记录坐标内的棋子内容（x/o）
                    squares: Array(9).fill(null),
                    // 历史纪录的棋子坐标数据
                    stX: -1,
                    stY: -1,
                }
            ],
            // 下一个棋子是X 
            XisNext: true,
            // 当前操作序号
            stepNumber: 0,
            // 默认历史记录升序
            up: true,
            click:true
        }


        let userName=sessionStorage.getItem('userName');
        let baseUrl = "ws://localhost:8080/websocket/game/"+userName;
        websocket = new WebSocket(baseUrl);
        websocket.onopen = ()=> {
            console.log("建立 websocket 连接...");
        };
        websocket.onmessage = (event) => {
            // 拿到没下这颗棋子之前的历史列表
            const history = this.state.history.slice(0, this.state.stepNumber + 1)
            // 拿到下这颗棋子之前的最后一条历史数据
            const current = history[history.length - 1]
            // 拿到下这颗棋子之前的那一条棋子内容数据（[x,x,o,o,x,o,...])
            const squares = current.squares.slice();
            const data = event.data;
            console.log(data);
            if(data.includes("history")){
                let historyIndex=data.substring(8,data.Length);
                this.setState({
                    //当前操作序号变为跳过去的历史编号
                    stepNumber: historyIndex,
                    XisNext: (historyIndex % 2) === 0,
                })
            }
            else{
            squares[data] = this.state.XisNext ? 'X' : 'O';
            this.setState({
                // 改变棋盘的状态
                history: history.concat([{
                    squares: squares,
                    stX: parseInt(data / 3) + 1,
                    stY: parseInt(data % 3) + 1,
                }]),
                // 改变下一颗棋子的形态
                XisNext: !this.state.XisNext,
                // 改变当前操作号
                stepNumber: history.length - 1 + 1,
            })
            this.state.click=true;
            }
        };
        websocket.onerror = (event) => {
            console.log("websocket发生错误..." + event + '\n');
        }

        websocket.onclose = ()=> {
            console.log("关闭 websocket 连接...");
        };
    }
    // 下棋之后的操作
    handleClick(i) {
        if(this.state.click===true){
        // 拿到没下这颗棋子之前的历史列表
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        // 拿到下这颗棋子之前的最后一条历史数据
        const current = history[history.length - 1]
        // 拿到下这颗棋子之前的那一条棋子内容数据（[x,x,o,o,x,o,...])
        const squares = current.squares.slice();
        // 当有人获胜或者其棋盘满了(重复按下过的地方)，就不给按
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        // 改变按下的那个位置的棋子的内容
        alert(i.toString());

        //需要更改，好友的id
        if(sessionStorage.getItem('userName')==='1') websocket.send('2'+' '+i.toString());
        else websocket.send('1'+' '+i.toString());
        squares[i] = this.state.XisNext ? 'X' : 'O';
        this.setState({
            // 改变棋盘的状态
            history: history.concat([{
                squares: squares,
                stX: parseInt(i / 3) + 1,
                stY: parseInt(i % 3) + 1,
            }]),
            // 改变下一颗棋子的形态
            XisNext: !this.state.XisNext,
            // 改变当前操作号
            stepNumber: history.length - 1 + 1,
        })
        this.state.click=false;
        }
        else alert("不是你的回合，请等待好友下棋");
    }
    // 跳到历史看记录去
    jumpTo(historyIndex) {
        //需要更改，
        if(sessionStorage.getItem('userName')==='1') websocket.send('2'+' '+'history'+' '+historyIndex.toString());
        else websocket.send('1'+' '+'history'+' '+historyIndex.toString());
        this.setState({
            //当前操作序号变为跳过去的历史编号
            stepNumber: historyIndex,
            XisNext: (historyIndex % 2) === 0,
        })

    }
    // 排序
    paixu() {
        this.setState({
            up: !this.state.up
        })
    }
    render() {
        const history = this.state.history;//历史列表
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares) && calculateWinner(current.squares).winPeople
        const winnerLine = calculateWinner(current.squares) && calculateWinner(current.squares).winLine
        // 判断胜利的文字
        let status;
        // 获胜提示标记  0为没有获胜 默认细字体  1为有人获胜  加粗字体
        let winClor = 0;
        // 历史记录按钮列表
        const moves = history.map((historyX, historyIndex) => {
            // 历史记录按钮文字
            const wenzi = historyIndex ? '到第' + historyIndex + '步' : '回到最开始'
            // 历史记录中坐标
            const stXY = historyX.stY < 0 && historyX.stX < 0 ? null : '(' + historyX.stX + ',' + historyX.stY + ')'
            // 历史记录加粗样式变量
            const blod = this.state.stepNumber === historyIndex ? 'blod' : null
            return (
                <li key={historyIndex} className={blod}>
                    <button className={blod} onClick={() => { this.jumpTo(historyIndex) }} >
                        {wenzi}
                    </button>
                    <span>{stXY}</span>
                </li>
            )
        })
        if (winner) {
            status = winner + '获胜啦'
            winClor = 1
        }
        else if (current.squares.indexOf(null) < 0) {
            status = '这是一个平局'
            winClor = 0
        }
        else {
            status = '下一个棋子是' + (this.state.XisNext ? 'X' : 'O')
            winClor = 0
        }
        // 获胜的高亮
        let winClorClass = winClor ? 'blod hightLight' : ''
        // 排序默认升序
        const up = this.state.up
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => { this.handleClick(i) }} winLine={winnerLine} />
                </div>
                <div className="game-info">
                    <div className={winClorClass}>{status}</div>
                    <button onClick={() => this.paixu()} style={{ backgroundColor: 'white', marginLeft: 50 + 'px', marginTop: 20 + 'px' }}>{up ? '降序' : '升序'}</button>
                    <ol>{up ? moves : moves.reverse()}</ol>
                </div>
            </div>
        );
    }
}


// 判断胜负
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return {
                winPeople: squares[a],
                winLine: lines[i]
            }
    }
    return null
}
