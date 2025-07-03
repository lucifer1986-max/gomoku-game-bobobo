import { useState, useCallback, useEffect } from 'react'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import GameStatus from './components/GameStatus'
import { GameState, Player, GameMode, Difficulty } from './types/game'
import { checkWinner, isValidMove } from './utils/gameLogic'
import { AIPlayer } from './utils/aiPlayer'
import './App.css'

const BOARD_SIZE = 15

function App() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)),
    currentPlayer: Player.BLACK,
    gameMode: GameMode.PVP,
    winner: null,
    isGameOver: false,
    moveHistory: [],
    difficulty: Difficulty.MEDIUM
  })

  const [aiPlayer] = useState(() => new AIPlayer(Difficulty.MEDIUM, Player.WHITE))
  const [isAIThinking, setIsAIThinking] = useState(false)

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState.isGameOver || !isValidMove(gameState.board, row, col) || isAIThinking) {
      return
    }

    // 在人机对战模式下，只允许玩家（黑棋）下棋
    if (gameState.gameMode === GameMode.PVE && gameState.currentPlayer === Player.WHITE) {
      return
    }

    makeMove(row, col, gameState.currentPlayer)
  }, [gameState, isAIThinking])

  const makeMove = useCallback((row: number, col: number, player: Player) => {
    const newBoard = gameState.board.map(r => [...r])
    newBoard[row][col] = player

    const winner = checkWinner(newBoard, row, col, player)
    const newMoveHistory = [...gameState.moveHistory, { row, col, player }]

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: winner ? prev.currentPlayer : (prev.currentPlayer === Player.BLACK ? Player.WHITE : Player.BLACK),
      winner,
      isGameOver: !!winner,
      moveHistory: newMoveHistory
    }))
  }, [gameState])

  // AI移动逻辑
  useEffect(() => {
    if (gameState.gameMode === GameMode.PVE &&
        gameState.currentPlayer === Player.WHITE &&
        !gameState.isGameOver &&
        !isAIThinking) {

      setIsAIThinking(true)

      // 添加延迟让AI看起来在"思考"
      const thinkingTime = gameState.difficulty === Difficulty.HARD ? 1500 :
                          gameState.difficulty === Difficulty.MEDIUM ? 1000 : 500

      setTimeout(() => {
        const aiMove = aiPlayer.getBestMove(gameState.board)
        if (aiMove) {
          makeMove(aiMove.row, aiMove.col, Player.WHITE)
        }
        setIsAIThinking(false)
      }, thinkingTime)
    }
  }, [gameState.currentPlayer, gameState.gameMode, gameState.isGameOver, gameState.board, gameState.difficulty, isAIThinking, aiPlayer, makeMove])

  const handleNewGame = useCallback(() => {
    setIsAIThinking(false)
    setGameState({
      board: Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)),
      currentPlayer: Player.BLACK,
      gameMode: gameState.gameMode,
      winner: null,
      isGameOver: false,
      moveHistory: [],
      difficulty: gameState.difficulty
    })
  }, [gameState.gameMode, gameState.difficulty])

  const handleModeChange = useCallback((mode: GameMode) => {
    setIsAIThinking(false)
    setGameState(prev => ({
      ...prev,
      gameMode: mode
    }))
    handleNewGame()
  }, [handleNewGame])

  const handleDifficultyChange = useCallback((difficulty: Difficulty) => {
    aiPlayer.setDifficulty(difficulty)
    setGameState(prev => ({
      ...prev,
      difficulty
    }))
  }, [aiPlayer])

  const handleUndo = useCallback(() => {
    if (gameState.moveHistory.length === 0 || isAIThinking) return

    let newHistory = [...gameState.moveHistory]
    let newBoard = gameState.board.map(r => [...r])

    // 在人机对战模式下，需要撤销两步（玩家和AI的移动）
    if (gameState.gameMode === GameMode.PVE && newHistory.length >= 2) {
      // 撤销AI的移动
      const aiMove = newHistory.pop()!
      newBoard[aiMove.row][aiMove.col] = null

      // 撤销玩家的移动
      const playerMove = newHistory.pop()!
      newBoard[playerMove.row][playerMove.col] = null
    } else if (gameState.gameMode === GameMode.PVP && newHistory.length >= 1) {
      // 双人模式只撤销一步
      const lastMove = newHistory.pop()!
      newBoard[lastMove.row][lastMove.col] = null
    }

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: Player.BLACK, // 撤销后总是轮到黑棋
      winner: null,
      isGameOver: false,
      moveHistory: newHistory
    }))
  }, [gameState, isAIThinking])

  return (
    <div className="app">
      <div className="game-container">
        <h1 className="game-title">🎮 五子棋游戏</h1>
        
        <GameStatus
          currentPlayer={gameState.currentPlayer}
          winner={gameState.winner}
          gameMode={gameState.gameMode}
          isGameOver={gameState.isGameOver}
          isAIThinking={isAIThinking}
        />

        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          lastMove={gameState.moveHistory[gameState.moveHistory.length - 1]}
          disabled={isAIThinking}
        />

        <GameControls
          gameMode={gameState.gameMode}
          difficulty={gameState.difficulty}
          onModeChange={handleModeChange}
          onDifficultyChange={handleDifficultyChange}
          onNewGame={handleNewGame}
          onUndo={handleUndo}
          canUndo={gameState.moveHistory.length > 0}
          isGameOver={gameState.isGameOver}
          isAIThinking={isAIThinking}
        />
      </div>
    </div>
  )
}

export default App
