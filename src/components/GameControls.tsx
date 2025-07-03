import React from 'react'
import { GameMode, Difficulty } from '../types/game'
import './GameControls.css'

interface GameControlsProps {
  gameMode: GameMode
  difficulty?: Difficulty
  onModeChange: (mode: GameMode) => void
  onDifficultyChange?: (difficulty: Difficulty) => void
  onNewGame: () => void
  onUndo: () => void
  canUndo: boolean
  isGameOver: boolean
  isAIThinking?: boolean
}

const GameControls: React.FC<GameControlsProps> = ({
  gameMode,
  difficulty = Difficulty.MEDIUM,
  onModeChange,
  onDifficultyChange,
  onNewGame,
  onUndo,
  canUndo,
  isGameOver,
  isAIThinking = false
}) => {
  return (
    <div className="game-controls">
      <div className="control-section">
        <h3>游戏模式</h3>
        <div className="mode-buttons">
          <button
            className={`mode-btn ${gameMode === GameMode.PVP ? 'active' : ''}`}
            onClick={() => onModeChange(GameMode.PVP)}
          >
            👥 双人对战
          </button>
          <button
            className={`mode-btn ${gameMode === GameMode.PVE ? 'active' : ''}`}
            onClick={() => onModeChange(GameMode.PVE)}
          >
            🤖 人机对战
          </button>
        </div>
      </div>

      {gameMode === GameMode.PVE && (
        <div className="control-section">
          <h3>AI难度</h3>
          <div className="difficulty-buttons">
            <button
              className={`difficulty-btn ${difficulty === Difficulty.EASY ? 'active' : ''}`}
              onClick={() => onDifficultyChange?.(Difficulty.EASY)}
              disabled={isAIThinking}
            >
              😊 简单
            </button>
            <button
              className={`difficulty-btn ${difficulty === Difficulty.MEDIUM ? 'active' : ''}`}
              onClick={() => onDifficultyChange?.(Difficulty.MEDIUM)}
              disabled={isAIThinking}
            >
              🤔 中等
            </button>
            <button
              className={`difficulty-btn ${difficulty === Difficulty.HARD ? 'active' : ''}`}
              onClick={() => onDifficultyChange?.(Difficulty.HARD)}
              disabled={isAIThinking}
            >
              🧠 困难
            </button>
          </div>
        </div>
      )}

      <div className="control-section">
        <h3>游戏操作</h3>
        <div className="action-buttons">
          <button
            className="action-btn new-game"
            onClick={onNewGame}
            disabled={isAIThinking}
          >
            🎮 新游戏
          </button>

          <button
            className="action-btn undo"
            onClick={onUndo}
            disabled={!canUndo || isGameOver || isAIThinking}
          >
            ↶ 悔棋
          </button>
        </div>
      </div>

      <div className="control-section">
        <h3>游戏说明</h3>
        <div className="game-rules">
          <p>• 先连成五子者获胜</p>
          <p>• 黑棋先手，白棋后手</p>
          <p>• 可横、竖、斜连线</p>
          <p>• 点击棋盘空位下棋</p>
        </div>
      </div>
    </div>
  )
}

export default GameControls
