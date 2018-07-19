import React from 'react';
import Board from './Board';
import BoardHistory from './BoardHistory';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardHistory: [
        {
          squares: Array(9).fill(null)
        }
      ],
      currentStep: 0
    };
  }

  isXNext() {
    return (this.state.currentStep % 2) !== 1
  }
  
  currentSquares() {
    return this.state.boardHistory[this.state.currentStep].squares;
  }
  
  onSquareClick(index) {
    if (calculateWinner(this.currentSquares()) || this.currentSquares()[index] !== null) {
      return;
    }

    const squares = this.currentSquares().slice();
    squares[index] = this.isXNext() ? 'X' : 'O';

    this.state.boardHistory.push({
      squares: squares
    });
    
    this.setState({
      boardHistory: this.state.boardHistory,
      currentStep: this.state.currentStep + 1
    });
  }

  onStepClick(index) {
    this.setState({ currentStep: index });
  }
  
  render() {
    const winner = calculateWinner(this.currentSquares());
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.isXNext() ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.currentSquares()}
            onClick={ index => this.onSquareClick(index) }
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <BoardHistory
            boardHistory={this.state.boardHistory}
            onClick={index => this.onStepClick(index)}
            currentStep={this.state.currentStep}
          />
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
