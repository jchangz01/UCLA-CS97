import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  var mark = <div className={props.selected}>{props.value}</div>;
  return (
    <button 
    className={props.style}
    onClick={ () => props.onClick()}
    >
      {mark}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    if (this.props.winner !== null)
      var x = this.props.winner.includes(i);
  
    return <Square
      style={x ? "square winner" : "square"} 
      value={this.props.squares[i]}
      selected={this.props.selected === i ? "selected " : ""}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      insertionCount: 0,
      stepNumber: 0,
      xIsNext: true,
      pieceSelectedPos: null,
      invalidMove: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    
    //player has won make no more changes 
    if (calculateWinner(squares))
      return;
      
    //once 6 pieces have been inserted, do not insert
    if (this.state.insertionCount >= 6)
    {
      //if square is vacant and a piece was selected
      if (!squares[i] && this.state.pieceSelectedPos !== null){
        const adjPos = getAdjacentPositions (this.state.pieceSelectedPos);
      
        //check to see if selected movement position is adjacent to current position
        if (adjPos.includes(i)) {
          //makes players remove mark from center square or make a winning move
          if ((squares[4] === 'X' && this.state.xIsNext) || (squares[4] === 'O' && !this.state.xIsNext)) {
            const temp = squares.slice();
            temp[i] = this.state.xIsNext ? 'X' : 'O';
            temp[this.state.pieceSelectedPos] = null;
            if (this.state.pieceSelectedPos !== 4 && !calculateWinner(temp)) {
              console.log('meow')
              this.setState({
                pieceSelectedPos: null,
                invalidMove: true
              })
              return
            }
          }
          squares[i] = this.state.xIsNext ? 'X' : 'O';
          squares[this.state.pieceSelectedPos] = null;

          this.setState({
            history: history.concat([{
              squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            pieceSelectedPos: null,
          })
        }
        else
        {
          console.log('meow') 
          return;
        }
      }
      else if (squares[i] === 'X' && this.state.xIsNext === true){
        this.setState({pieceSelectedPos: i, invalidMove: false})
      }
      else if (squares[i] === 'O' && this.state.xIsNext === false){
        this.setState({pieceSelectedPos: i,  invalidMove: false})
      }
    }

    else
    {
      if (squares[i])
        return;
      
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        insertionCount: this.state.insertionCount+1,
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      })
    }

  }
  
  jumpTo(step) {
    this.setState({
      insertionCount: step,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
  
    let status
    if (winner)
      status = 'Winner ' + current.squares[winner[0]];
    else
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O') ;

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            winner={winner}
            squares={current.squares}
            selected={this.state.pieceSelectedPos}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            {this.state.insertionCount >= 6 && !winner ? 
              (this.state.pieceSelectedPos !== null ? "You have selected a piece, place your piece at an adjacent position or switch selections by clicking another piece! " 
                                                    : "You have inserted the MAXIMUM number of pieces on the board, please select a piece you would like to move!")
              : "" }
          </div>
          <div>{this.state.invalidMove ? "Invalid Move!!! Vacate center square or make a winning move!" : null}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function getAdjacentPositions(pos){
  switch (pos) {
    case 0:
      return [1, 3, 4]
    case 1: 
      return [0, 2, 3, 4, 5]
    case 2:
      return [1, 4, 5]
    case 3:
      return [0, 1, 4, 6, 7]
    case 4: 
      return [0, 1, 2, 3, 5, 6, 7, 8]
    case 5:
      return [1, 2, 4, 7, 8]
    case 6:
      return [3, 4, 7]
    case 7: 
      return [3, 4, 5, 6, 8]
    case 8: 
      return [4, 5, 7]
    default: 
      return false;
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
      //return positions of winning marks
      return [a, b, c];
    }
  }
  return null;
}