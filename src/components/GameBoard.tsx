import React from 'react'
import { Board, Move } from '../types/game'
import { BOARD_SIZE } from '../utils/gameLogic'
import './GameBoard.css'

interface GameBoardProps {
  board: Board
  onCellClick: (row: number, col: number) => void
  lastMove?: Move
  disabled?: boolean
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, lastMove, disabled = false }) => {
  return (
    <div className={`game-board ${disabled ? 'disabled' : ''}`}>
      <div className="board-grid">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell ? 'occupied' : ''} ${
                lastMove && lastMove.row === rowIndex && lastMove.col === colIndex
                  ? 'last-move'
                  : ''
              } ${disabled ? 'disabled' : ''}`}
              onClick={() => !disabled && onCellClick(rowIndex, colIndex)}
            >
              {cell && (
                <div 
                  className={`stone ${cell}`}
                  style={{
                    animationDelay: `${(rowIndex + colIndex) * 0.02}s`
                  }}
                >
                  <div className="stone-inner" />
                  <div className="stone-highlight" />
                </div>
              )}
              
              {/* 星位标记 */}
              {isStarPoint(rowIndex, colIndex) && (
                <div className="star-point" />
              )}
            </div>
          ))
        )}
      </div>
      
      {/* 棋盘坐标 */}
      <div className="board-coordinates">
        <div className="row-numbers">
          {Array.from({ length: BOARD_SIZE }, (_, i) => (
            <div key={i} className="coordinate">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="col-letters">
          {Array.from({ length: BOARD_SIZE }, (_, i) => (
            <div key={i} className="coordinate">
              {String.fromCharCode(65 + i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 判断是否为星位
function isStarPoint(row: number, col: number): boolean {
  const starPoints = [
    [3, 3], [3, 11], [7, 7], [11, 3], [11, 11]
  ]
  return starPoints.some(([r, c]) => r === row && c === col)
}

export default GameBoard
