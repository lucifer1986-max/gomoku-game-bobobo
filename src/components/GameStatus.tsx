import React from 'react'
import { Player, GameMode } from '../types/game'
import './GameStatus.css'

interface GameStatusProps {
  currentPlayer: Player
  winner: Player | null
  gameMode: GameMode
  isGameOver: boolean
  isAIThinking?: boolean
}

const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  winner,
  gameMode,
  isGameOver,
  isAIThinking = false
}) => {
  const getPlayerName = (player: Player) => {
    if (gameMode === GameMode.PVE) {
      return player === Player.BLACK ? '玩家' : 'AI'
    }
    return player === Player.BLACK ? '黑棋' : '白棋'
  }

  const getStatusMessage = () => {
    if (winner) {
      return `🎉 ${getPlayerName(winner)} 获胜！`
    }

    if (isGameOver) {
      return '🤝 平局！'
    }

    if (isAIThinking) {
      return '🤖 AI正在思考中...'
    }

    return `轮到 ${getPlayerName(currentPlayer)} 下棋`
  }

  const getGameModeText = () => {
    return gameMode === GameMode.PVP ? '双人对战' : '人机对战'
  }

  return (
    <div className="game-status">
      <div className="status-header">
        <div className="game-mode-badge">
          {getGameModeText()}
        </div>
      </div>
      
      <div className={`status-message ${winner ? 'winner' : ''}`}>
        {getStatusMessage()}
      </div>
      
      <div className="player-indicators">
        <div className={`player-indicator ${currentPlayer === Player.BLACK ? 'active' : ''}`}>
          <div className="player-stone black"></div>
          <span>{getPlayerName(Player.BLACK)}</span>
        </div>
        
        <div className="vs-divider">VS</div>
        
        <div className={`player-indicator ${currentPlayer === Player.WHITE ? 'active' : ''}`}>
          <div className="player-stone white"></div>
          <span>{getPlayerName(Player.WHITE)}</span>
        </div>
      </div>
    </div>
  )
}

export default GameStatus
