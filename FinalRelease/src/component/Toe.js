import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Square from "./Square";
import "./Toe.css";
import { message } from "antd";

class Toe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(""),
      turn: "x",
      winner: null,
      whoIsFirst : "x"
    };
    this.websocket = null;
    this.sign=null;
  }

  componentDidMount() {
    
    const userName = sessionStorage.getItem("uid");
    const baseUrl = "ws://localhost:8080/websocket/game/" + userName.toString();
    this.websocket = new WebSocket(baseUrl);

    this.websocket.onopen = () => {
      console.log("WebSocket连接已建立");
    };

    this.websocket.onmessage = (event) => {
      console.log("收到WebSocket消息:", event.data);
      if(event.data === "reset game"){
        this.setState({
          squares: Array(9).fill(""),
          turn: this.state.whoIsFirst === "x" ? "o" : "x",
          whoIsFirst : this.state.whoIsFirst === "x" ? "o" : "x",
          winner: null,
          });
      }
      else{
        const { squares, turn, winner } = this.state;
        if (squares[parseInt(event.data)] || winner) {
          return;
        }
        const s = squares.slice();
        s[parseInt(event.data)] = turn;
        this.setState({ squares: s, turn: turn === "x" ? "o" : "x" });

        const W = this.checkWinner(s);
        if (W) {
          this.setState({ winner: W });
        } else if (this.checkEndTheGame(s)) {
          this.setState({ winner: "x | o" });
        }
      }
    };

    this.websocket.onclose = () => {
      console.log("WebSocket连接已关闭");
    };
  }

  componentDidUpdate() {
    if(this.props.gameIsFinished){
      this.resetGame();
      this.props.setGameIsFinished();
    }
  }

  componentWillUnmount() {
    this.websocket.close();
  }

  checkEndTheGame(squares) {
    for (let square of squares) {
      if (!square) return false;
    }
    return true;
  }

  checkWinner(squares) {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  updateSquares(ind) {
    const { squares, turn, winner } = this.state;
    if (squares[ind] || winner) {
      return;
    }
    const s = squares.slice();
    
    if(this.sign === turn ){
        s[ind] = turn;
        this.websocket.send(sessionStorage.getItem("to_uid") + " " + ind);
        this.setState({ squares: s, turn: turn === "x" ? "o" : "x" });

        const W = this.checkWinner(s);
        if (W) {
        this.setState({ winner: W });
        } else if (this.checkEndTheGame(s)) {
        this.setState({ winner:"x | o" });
        }
    }
    else message.error("不是你的回合");
    
    }
    
    resetGame() {
      this.setState({
      squares: Array(9).fill(""),
      turn: this.state.whoIsFirst === "x" ? "o" : "x",
          whoIsFirst : this.state.whoIsFirst === "x" ? "o" : "x",
      winner: null,
      });
      console.log(sessionStorage.getItem("to_uid") + " " + "reset game");
      this.websocket.send(sessionStorage.getItem("to_uid") + " " + "reset game");
    }
    
    render() {
    const { squares, turn, winner } = this.state;
    const gameSender = this.props.gameSender;
    let sign = null;
    if (gameSender === sessionStorage.getItem("uid")) {
        this.sign = "x";
      } else {
        this.sign = "o";
      }
      
      return (
        <div className="body">
          <div className="tic-tac-toe">
            <h1> TIC-TAC-TOE </h1>
            <Button resetGame={() => this.resetGame()} />
            <div className="game">
              {Array.from("012345678").map((ind) => (
                <Square
                  key={ind}
                  ind={ind}
                  updateSquares={(index) => this.updateSquares(index)}
                  clsName={squares[ind]}
                />
              ))}
            </div>
            <div className={`turn ${turn === "o" ? "left" : "right"}`}>
              <Square clsName="x" />
              <Square clsName="o" />
            </div>
            <AnimatePresence>
              {winner && (
                <motion.div
                  key={"parent-box"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="winner"
                >
                  <motion.div
                    key={"child-box"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="text"
                  >
                    <motion.h2
                      initial={{ scale: 0, y: 100 }}
                      animate={{
                        scale: 1,
                        y: 0,
                        transition: {
                          y: { delay: 0.7 },
                          duration: 0.7,
                        },
                      }}
                    >
                      {winner === "x | o" ? "No Winner :/" : "Win !! :)"}
                    </motion.h2>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        transition: {
                          delay: 1.3,
                          duration: 0.2,
                        },
                      }}
                      className="win"
                    >
                      {winner === "x | o" ? (
                        <>
                          <Square clsName="x" />
                          <Square clsName="o" />
                        </>
                      ) : (
                        <>
                          <Square clsName={winner} />
                        </>
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        transition: { delay: 1.5, duration: 0.3 },
                      }}
                    >
                      <Button resetGame={() =>this.resetGame()} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }
}

export default Toe;      
