import React from 'react';
import Board from './Board';

export default class Game extends React.Component {
  boardHistory = [];
  
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true
    };
  }

  onSquareClick(index) {
    if (calculateWinner(this.state.squares) || this.state.squares[index] !== null) {
      return;
    }

    const squares = this.state.squares.slice();
    squares[index] = this.state.isXNext ? 'X' : 'O';

    this.boardHistory.push(squares);
    
    this.setState({
      squares: squares,
      isXNext: !this.state.isXNext
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={ index => this.onSquareClick(index) }
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
      
    );
  }
}
  
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}  
