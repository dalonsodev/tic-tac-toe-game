import React from "react"

export default function Square({ value, onClick, highlight }) {
   return (
      <button 
         className={`square${highlight ? " highlight" : ""}${value ? " filled" : ""}`}
         onClick={onClick}
         disabled={!!value}
      >
         <span className={`square-value ${value === "X" ? "x-color" : value === "O" ? "o-color" : ""}`}>
            {value}
         </span>
      </button>
   )
}