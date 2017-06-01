Array.prototype.concatAll = function() {
  return this.reduce((a,b) => a.concat(b), [])
}
// === VARS ===
const {Component} = React
const {render} = ReactDOM
// testSeed - feel free to alter
const testSeed = [
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,1,1,1,0],
  [0,1,1,1,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
]
// === HELPERS ===
// toString2D :: Array -> String
const toString2D = arr =>
  arr.map(row => row.join(' ')).join('\n')
// cloneArray :: Array -> Array
// note: only for, at most, 2Dimensions
const cloneArray = arr => 
  arr.slice().map(row => row.slice())

// === WRAPPER ===
const Wrapper = (props) => {
  return (
    <div className='wrapper'>
      {props.children}
    </div>
  )
}

// === BOARD ===
const BoardContainer = (props) => {
  const {board} = props
  const boardBlocks = board
    .map(row => {
      return row.map(val => {
        return <BoardBlock value={val} />
      })
    }).concatAll()
  return (
    <div className='board-container'>
      {boardBlocks ? boardBlocks : 'Loading...'}
    </div>
  )
}

const BoardBlock = (props) => {
  const bgColor = props.value === 1 
    ? '#EF4470' 
    : '#41407C'
  const blockStyle = {
    backgroundColor: bgColor,
    border: '.8em solid #111111',
    width: '16.666%',
    height: '5em'
  }
  return <div style={blockStyle}></div>
}

// === MAIN APP (LIFE) ===
class Life extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prevBoard: [],
      board: props.seed,
      height: props.seed.length,
      width: props.seed[0].length
    }
  }
  componentDidMount() {
    setInterval(() => {
      let stateToUpdate = this.next()
      this.setState(
        Object.assign(this.state, stateToUpdate)
      )
    }, 1300)
  }
  // <LIFE LOGIC/>
  next() {
    let {board,prevBoard,height,width} = this.state
    prevBoard = cloneArray(board)
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        let neighbors = this.aliveNeighbors(prevBoard, x, y)
        let alive = !!board[y][x]
        if (alive) {
          if (neighbors < 2 || neighbors > 3) {
            board[y][x] = 0
          }
        } else {
          if (neighbors == 3) {
            board[y][x] = 1
          }
        }
      }
    }
    return {board, prevBoard}
  }
  aliveNeighbors(arr, x, y) {
    const prevRow = arr[y-1] || []
    const nextRow = arr[y+1] || []
    return [
      prevRow[x-1], prevRow[x], prevRow[x+1],
      arr[y][x-1], arr[y][x+1],
      nextRow[x-1], nextRow[x], nextRow[x+1],
    ].reduce((acc, val) => acc + +!!val, 0)
  }
  render() {
    return (
      <Wrapper>
        <h1 className='app-header'>Game of Life</h1>
        <BoardContainer board={this.state.board} />
      </Wrapper>
    )
  }
}

render(<Life seed={testSeed} />, document.getElementById('app'))
