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
  const [winner, serWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    if (boardToCheck[0] == boardToCheck[4] && boardToCheck[0] == boardToCheck[8]
      || boardToCheck[2] == boardToCheck[4] && boardToCheck[0] == boardToCheck[6]
    ) { return boardToCheck[4] }

    for (let i = 0; i < 8; i += 3) {
      if (
        boardToCheck[i] == boardToCheck[i + 1] && boardToCheck[i]== boardToCheck[i + 2]
        || boardToCheck[i] == boardToCheck[i + 3] && boardToCheck[i] == boardToCheck[i + 6]
      ) { return boardToCheck[i] }


    }
    return null;
  }
  const updateBoard = (index) => {
    if (board[index]||winner) return
    //finalizar si no es nulo
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //Actualizar la tabla con una copia en vez de la original

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn)
    // cambio de turnos

    const newWinner = checkWinner(newBoard)

    if(newWinner){
      serWinner(newWinner)
    }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
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
    </main>
  )
}


export default App
