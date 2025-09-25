import React from "react"
import Square from "./Square"

export default function Board({ squares, onClick, winningLine = [] }) {
   return (
      <div className="board">
         {squares.map((square, i) => (
            <Square 
               key={i} 
               value={square} 
               onClick={() => onClick(i)}
               highlight={winningLine.includes(i)}
            />
         ))}
      </div>
   )
}