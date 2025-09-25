import React from "react"

const COLORS = [
  "#ff4081", "#2979ff", "#ffb300", "#00e676", "#7c4dff", "#ff1744", "#ffd54f", "#00bcd4"
]

function randomBetween(a, b) {
  return Math.random() * (b - a) + a
}

export default function Confetti({ show, pieces = 22 }) {
  if (!show) return null
  return (
    <div className="confetti-custom">
      {Array.from({ length: pieces }).map((_, i) => {
        const left = randomBetween(2, 98)
        const size = randomBetween(10, 22)
        const rotate = randomBetween(-40, 40)
        const color = COLORS[i % COLORS.length]
        const shape = Math.random() > 0.5 ? "circle" : "rect"
        const delay = randomBetween(0, 0.5)
        return shape === "circle" ? (
          <div
            key={i}
            className="confetti-piece circle"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: color,
              animationDelay: `${delay}s`,
              transform: `rotate(${rotate}deg)`
            }}
          />
        ) : (
          <div
            key={i}
            className="confetti-piece rect"
            style={{
              left: `${left}%`,
              width: size * 1.2,
              height: size * 0.5,
              background: color,
              borderRadius: size * 0.25,
              animationDelay: `${delay}s`,
              transform: `rotate(${rotate}deg)`
            }}
          />
        )
      })}
    </div>
  )
}