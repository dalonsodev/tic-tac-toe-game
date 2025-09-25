import React, { useState, useEffect } from "react"
import Board from "./Board"
import { calculateWinner } from "../helpers"
import Confetti from "./Confetti"

export default function Game() {
   const [history, setHistory] = useState([new Array(9).fill(null)])
   const [stepNumber, setStepNumber] = useState(0)
   const [xIsNext, setXisNext] = useState(true)
   const [showHistory, setShowHistory] = useState(false)
   const [showConfetti, setShowConfetti] = useState(false)
   const result = calculateWinner(history[stepNumber])
   const winner = result?.winner
   const winningLine = result?.line || []

   // Check for tie: no winner and all squares filled
   const isTie = !winner && history[stepNumber].every(Boolean)

   useEffect(() => {
      if (winner) {
         setShowConfetti(true)
         const timeout = setTimeout(() => setShowConfetti(false), 1400)
         return () => clearTimeout(timeout)
      } else {
         setShowConfetti(false)
      }
   }, [winner])

   function handleClick(i) {
      const timeInHistory = history.slice(0, stepNumber + 1)
      const current = timeInHistory[stepNumber]
      const squares = [...current]
      if (winner || squares[i] || isTie) return
      squares[i] = xIsNext ? "X" : "O"
      setHistory([...timeInHistory, squares])
      setStepNumber(timeInHistory.length)
      setXisNext(prev => !prev)
   }

   function jumpTo(step) {
      setStepNumber(step)
      setXisNext(step % 2 === 0)
   }

   function handleNewGame() {
      setHistory([new Array(9).fill(null)])
      setStepNumber(0)
      setXisNext(true)
      setShowConfetti(false)
   }

   function renderMoves() {
      return (
         <ul className="moves-list">
            {history.map((_step, move) => {
               const destination = move ? `Go to move #${move}` : "Go to start"
               return (
                  <li key={move}>
                     <button onClick={() => jumpTo(move)}>{destination}</button>
                  </li>
               )
            })}
         </ul>
      )
   }

   return (
      <div className="game-container" style={{position: "relative", minHeight: 420}}>
         <h1>
            <span role="img" aria-label="Tic Tac Toe">🎲</span> Tic Tac Toe
         </h1>
         <div className="status">
            {winner 
               ? <span className="winner-text">🎉 Winner: <span className={winner === "X" ? "turn-x" : "turn-o"}>{winner}</span> 🎉</span>
               : isTie
                  ? <span className="winner-text">🤝 It's a tie!</span>
                  : <>Next Player: <span className={xIsNext ? "turn-x" : "turn-o"}>{xIsNext ? "X" : "O"}</span></>
            }
         </div>
         <Board squares={history[stepNumber]} onClick={handleClick} winningLine={winningLine} />
         {(winner || isTie) && (
            <button className="new-game-btn" onClick={handleNewGame}>
               New Game
            </button>
         )}
         <div className="history-accordion">
            <button
               className="history-toggle-btn"
               title="Show move history"
               onClick={() => setShowHistory(prev => !prev)}
               aria-label="Show move history"
            >
               <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="11" stroke="#4b4b7c" strokeWidth="2"/>
                  <path d="M14 9v5l3 3" stroke="#4b4b7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.5 14a6.5 6.5 0 1 1 6.5 6.5" stroke="#4b4b7c" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <polyline points="7.5,16 7.5,14 9.5,14" stroke="#4b4b7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
               </svg>
            </button>
            <div className={`history-panel-accordion${showHistory ? " open" : ""}`}>
               {renderMoves()}
            </div>
         </div>
         <Confetti show={showConfetti} />
      </div>
   )
}