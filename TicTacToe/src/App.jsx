import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TURNS = {
  x: 'x',
  o: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ' '}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    if (boardToCheck[4] && (boardToCheck[0] == boardToCheck[4] && boardToCheck[0] == boardToCheck[8]
      || boardToCheck[2] == boardToCheck[4] && boardToCheck[2] == boardToCheck[6]
    )) { return boardToCheck[4] }

    for (let i = 0; i < 8; i += 3) {
      if (boardToCheck[i] &&
        boardToCheck[i] == boardToCheck[i + 1] && boardToCheck[i] == boardToCheck[i + 2]
      ) { return boardToCheck[i] }
    }
    for (let i = 0; i < 2; i++) {
      if (boardToCheck[i] && boardToCheck[i] == boardToCheck[i + 3] && boardToCheck[i] == boardToCheck[i + 6]) { return boardToCheck[i] }
    }
    return null;
  }
  const checkEndGames = (newBoard) => {
    return newBoard.every((Square) => Square !== null)
  }
  const updateBoard = (index) => {

    if (board[index] || winner) return
    //finalizar si no es nulo
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //Actualizar la tabla con una copia en vez de la original

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn)
    // cambio de turnos

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGames(newBoard)) {
setWinner(false)
    }
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null);
  }
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>

      <button onClick={resetGame} >Empezar de nuevo</button>

      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.x} >
          {TURNS.x}
        </Square>
        <Square isSelected={turn === TURNS.o} >
          {TURNS.o}
        </Square>
      </section>
      {
        winner !== null && (<section className='winner'>
          <div className='text'>
            <h2>
              {winner === false ? 'Empate' : 'Ganó: '}
            </h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame} >Empezar de nuevo</button>
            </footer>
          </div>
        </section>)
      }
    </main>
  )
}


export default App
