import { Board, Player, Position, Difficulty } from '../types/game'
import {
  BOARD_SIZE,
  checkWinner,
  getSmartMoves,
  copyBoard,
  evaluatePosition
} from './gameLogic'

export class AIPlayer {
  private difficulty: Difficulty
  private maxDepth: number
  private player: Player
  private opponent: Player

  constructor(difficulty: Difficulty = Difficulty.MEDIUM, player: Player = Player.WHITE) {
    this.difficulty = difficulty
    this.player = player
    this.opponent = player === Player.BLACK ? Player.WHITE : Player.BLACK
    
    // 根据难度设置搜索深度
    switch (difficulty) {
      case Difficulty.EASY:
        this.maxDepth = 2
        break
      case Difficulty.MEDIUM:
        this.maxDepth = 4
        break
      case Difficulty.HARD:
        this.maxDepth = 6
        break
    }
  }

  // 获取AI的最佳移动
  public getBestMove(board: Board): Position | null {
    const availableMoves = getSmartMoves(board, 2)
    
    if (availableMoves.length === 0) {
      return null
    }

    // 如果是第一步，选择中心位置
    if (this.isFirstMove(board)) {
      const center = Math.floor(BOARD_SIZE / 2)
      return { row: center, col: center }
    }

    // 检查是否有立即获胜的机会
    const winningMove = this.findWinningMove(board, this.player)
    if (winningMove) {
      return winningMove
    }

    // 检查是否需要阻止对手获胜
    const blockingMove = this.findWinningMove(board, this.opponent)
    if (blockingMove) {
      return blockingMove
    }

    // 使用Minimax算法寻找最佳移动
    let bestMove: Position | null = null
    let bestScore = -Infinity

    for (const move of availableMoves.slice(0, 20)) { // 限制搜索范围提高性能
      const newBoard = copyBoard(board)
      newBoard[move.row][move.col] = this.player

      const score = this.minimax(
        newBoard, 
        this.maxDepth - 1, 
        false, 
        -Infinity, 
        Infinity
      )

      if (score > bestScore) {
        bestScore = score
        bestMove = move
      }
    }

    return bestMove || availableMoves[0]
  }

  // Minimax算法实现（带Alpha-Beta剪枝）
  private minimax(
    board: Board, 
    depth: number, 
    isMaximizing: boolean, 
    alpha: number, 
    beta: number
  ): number {
    // 检查游戏结束条件
    const winner = this.checkGameEnd(board)
    if (winner === this.player) return 10000 + depth
    if (winner === this.opponent) return -10000 - depth
    if (depth === 0) return this.evaluateBoard(board)

    const moves = getSmartMoves(board, 1).slice(0, 15) // 限制搜索范围
    if (moves.length === 0) return 0

    if (isMaximizing) {
      let maxScore = -Infinity
      for (const move of moves) {
        const newBoard = copyBoard(board)
        newBoard[move.row][move.col] = this.player

        const score = this.minimax(newBoard, depth - 1, false, alpha, beta)
        maxScore = Math.max(maxScore, score)
        alpha = Math.max(alpha, score)

        if (beta <= alpha) break // Alpha-Beta剪枝
      }
      return maxScore
    } else {
      let minScore = Infinity
      for (const move of moves) {
        const newBoard = copyBoard(board)
        newBoard[move.row][move.col] = this.opponent

        const score = this.minimax(newBoard, depth - 1, true, alpha, beta)
        minScore = Math.min(minScore, score)
        beta = Math.min(beta, score)

        if (beta <= alpha) break // Alpha-Beta剪枝
      }
      return minScore
    }
  }

  // 寻找获胜移动
  private findWinningMove(board: Board, player: Player): Position | null {
    const moves = getSmartMoves(board, 2)
    
    for (const move of moves) {
      const newBoard = copyBoard(board)
      newBoard[move.row][move.col] = player
      
      if (checkWinner(newBoard, move.row, move.col, player)) {
        return move
      }
    }
    
    return null
  }

  // 检查是否是第一步
  private isFirstMove(board: Board): boolean {
    let count = 0
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] !== null) count++
      }
    }
    return count <= 1
  }

  // 检查游戏结束
  private checkGameEnd(board: Board): Player | null {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] !== null) {
          const winner = checkWinner(board, i, j, board[i][j]!)
          if (winner) return winner
        }
      }
    }
    return null
  }

  // 评估棋盘局面
  private evaluateBoard(board: Board): number {
    let score = 0
    
    // 评估所有位置
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] === this.player) {
          score += evaluatePosition(board, i, j, this.player)
        } else if (board[i][j] === this.opponent) {
          score -= evaluatePosition(board, i, j, this.opponent)
        }
      }
    }

    // 添加位置权重（中心位置更有价值）
    const center = Math.floor(BOARD_SIZE / 2)
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] === this.player) {
          const distance = Math.abs(i - center) + Math.abs(j - center)
          score += Math.max(0, 10 - distance)
        }
      }
    }

    return score
  }

  // 设置难度
  public setDifficulty(difficulty: Difficulty): void {
    this.difficulty = difficulty
    switch (difficulty) {
      case Difficulty.EASY:
        this.maxDepth = 2
        break
      case Difficulty.MEDIUM:
        this.maxDepth = 4
        break
      case Difficulty.HARD:
        this.maxDepth = 6
        break
    }
  }

  // 获取当前难度
  public getDifficulty(): Difficulty {
    return this.difficulty
  }
}
