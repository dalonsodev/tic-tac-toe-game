import React, { useState, useEffect } from "react"
import Board from "./Board"
import { calculateWinner } from "../helpers"

function FireworkBurst({ show }) {
   if (!show) return null
   return (
      <svg
         className="firework-burst"
         width="120"
         height="120"
         viewBox="0 0 120 120"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <g>
            {[...Array(8)].map((_, i) => (
               <line
                  key={i}
                  x1="60"
                  y1="60"
                  x2={60 + 48 * Math.cos((i * Math.PI) / 4)}
                  y2={60 + 48 * Math.sin((i * Math.PI) / 4)}
                  stroke={i % 2 === 0 ? "#ff4081" : "#2979ff"}
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="burst-line"
                  style={{ animationDelay: `${i * 0.07}s` }}
               />
            ))}
            <circle
               cx="60"
               cy="60"
               r="18"
               fill="#ffb300"
               opacity="0.7"
               className="burst-center"
            />
         </g>
      </svg>
   )
}

export default function Game() {
   const [history, setHistory] = useState([new Array(9).fill(null)])
   const [stepNumber, setStepNumber] = useState(0)
   const [xIsNext, setXisNext] = useState(true)
   const [showHistory, setShowHistory] = useState(false)
   const [showFirework, setShowFirework] = useState(false)
   const result = calculateWinner(history[stepNumber])
   const winner = result?.winner
   const winningLine = result?.line || []

   useEffect(() => {
      if (winner) {
         setShowFirework(true)
         const timeout = setTimeout(() => setShowFirework(false), 1400)
         return () => clearTimeout(timeout)
      } else {
         setShowFirework(false)
      }
   }, [winner])

   function handleClick(i) {
      const timeInHistory = history.slice(0, stepNumber + 1)
      const current = timeInHistory[stepNumber]
      const squares = [...current]
      if (winner || squares[i]) return
      squares[i] = xIsNext ? "X" : "O"
      setHistory([...timeInHistory, squares])
      setStepNumber(timeInHistory.length)
      setXisNext(prev => !prev)
   }

   function jumpTo(step) {
      setStepNumber(step)
      setXisNext(step % 2 === 0)
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
         <div style={{position: "absolute", left: 0, right: 0, top: -60, display: "flex", justifyContent: "center", pointerEvents: "none"}}>
            <FireworkBurst show={showFirework} />
         </div>
         <h1>
            <span role="img" aria-label="Tic Tac Toe">🎲</span> Tic Tac Toe
         </h1>
         <div className="status">
            {winner 
               ? <span className="winner-text">🎉 Winner: <span className={winner === "X" ? "turn-x" : "turn-o"}>{winner}</span> 🎉</span>
               : <>Next Player: <span className={xIsNext ? "turn-x" : "turn-o"}>{xIsNext ? "X" : "O"}</span></>
            }
         </div>
         <Board squares={history[stepNumber]} onClick={handleClick} winningLine={winningLine} />
         <div className="history-accordion">
            <button
               className="history-toggle-btn"
               title="Show move history"
               onClick={() => setShowHistory(v => !v)}
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
      </div>
   )
}