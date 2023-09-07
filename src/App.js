import './App.css';
import {
  Component
} from 'react';
import StartButton from './start-button';
import Snake from './Snake';
import Dot from './Dot';
import {
  findRenderedDOMComponentWithClass
} from 'react-dom/test-utils';


const getDotPosition = (min, max) => {
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  isGameStarted: false,
  snakePositions: [
    [0, 2],
    [0, 4],
    [0, 6]
  ],
  movement: 'D',
  dot: getDotPosition(1, 98)
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  startGame = () => {
    this.setState({
      isGameStarted: true,
    });
  }
  componentDidMount() {
    setInterval(this.changeSnake, 100);
    document.onkeydown = this.onArrowKeyPress;
  }
  componentDidUpdate() {
    this.onSnakeBoundaryTouch();
    this.onSelfEat();
    this.onEating();
  }
  onArrowKeyPress = e => {
    e = e || window.event;
    if (e.keyCode == 37 && this.state.movement !== 'R') {
      this.setState({
        movement: "L"
      });
    } else if (e.keyCode == 38 && this.state.movement !== 'D') {
      this.setState({
        movement: "U"
      });
    } else if (e.keyCode == 39 && this.state.movement !== 'L') {
      this.setState({
        movement: "R"
      });
    } else if (e.keyCode == 40 && this.state.movement !== 'U') {
      this.setState({
        movement: "D"
      });
    }
  };
  changeSnake = () => {
    let position = [...this.state.snakePositions];
    let front = position[position.length - 1];
    if (this.state.isGameStarted) {
      switch (this.state.movement) {
        case "R":
          front = [front[0] + 2, front[1]];
          break;
        case "L":
          front = [front[0] - 2, front[1]];
          break;
        case "D":
          front = [front[0], front[1] + 2];
          break;
        case "U":
          front = [front[0], front[1] - 2];
          break;
      }
      position.push(front);
      position.shift();
      this.setState({
        snakePositions: position
      });
    }
  };
  onSnakeBoundaryTouch() {
    let position = [...this.state.snakePositions];
    let front = position[position.length - 1];
    if (this.state.isGameStarted) {
      if (front[1] < 0) {
        // front = [front[0], front[1] + 100];
        // position.push(front);
        // position.shift();
        // this.setState({
        //   snakePositions: position
        // });
        this.gameOver();
      } else if (front[0] < 0) {
        // front = [front[0] + 100, front[1]];
        // position.push(front);
        // position.shift();
        // this.setState({
        //   snakePositions: position
        // });
        this.gameOver();
      } else if (front[1] >= 100) {
        // front = [front[0], front[1] - 100];
        // position.push(front);
        // position.shift();
        // this.setState({
        //   snakePositions: position
        // });
        this.gameOver();
      } else if (front[0] >= 100) {
        // front = [front[0] - 100, front[1]];
        // position.push(front);
        // position.shift();
        // this.setState({
        //   snakePositions: position
        // });
        this.gameOver();
      }
    }
  }
  onEating() {
    let front = this.state.snakePositions[this.state.snakePositions.length - 1];
    let dot = this.state.dot;
    if (front[0] == dot[0] && front[1] == dot[1]) {
      this.setState({
        dot: getDotPosition(1, 98)
      });
      this.sizeAdd();
    }
  }
  sizeAdd() {
    let newPositions = [...this.state.snakePositions];
    newPositions.unshift([]);
    this.setState({
      snakePositions: newPositions
    });
  }
  onSelfEat() {
    let position = [...this.state.snakePositions];
    let front = position[position.length - 1];
    position.pop();
    position.forEach(dot => {
      if (front[0] == dot[0] && front[1] == dot[1]) {
        this.gameOver();
      }
    });
  }
  gameOver() {
    alert(`GAME OVER & score is ${this.state.snakePositions.length - 3}`);
    this.setState(initialState);
  }
  render() {
    let state = this.state;
    return ( <div > {
        state.isGameStarted === false ? ( < StartButton startGame = {
            this.startGame
          }
          />) : 
          ( <div>
            <div className = 'main-div' >
            <Snake snakeDots = {state.snakePositions}/> 
            <Dot dot = {state.dot}/> 
            </div> 
            </div>
          )
        } </div>
      );
    }
  }

  export default App;