import { Board, Player, Position } from '../types/game'

export const BOARD_SIZE = 15
export const WIN_COUNT = 5

// 检查位置是否有效
export function isValidMove(board: Board, row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && 
         col >= 0 && col < BOARD_SIZE && 
         board[row][col] === null
}

// 检查是否获胜
export function checkWinner(board: Board, row: number, col: number, player: Player): Player | null {
  const directions = [
    [0, 1],   // 水平
    [1, 0],   // 垂直
    [1, 1],   // 主对角线
    [1, -1]   // 副对角线
  ]

  for (const [dx, dy] of directions) {
    let count = 1 // 包含当前落子

    // 向一个方向检查
    let r = row + dx
    let c = col + dy
    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
      count++
      r += dx
      c += dy
    }

    // 向相反方向检查
    r = row - dx
    c = col - dy
    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
      count++
      r -= dx
      c -= dy
    }

    if (count >= WIN_COUNT) {
      return player
    }
  }

  return null
}

// 检查是否平局
export function isDraw(board: Board): boolean {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === null) {
        return false
      }
    }
  }
  return true
}

// 获取所有可能的落子位置
export function getAvailableMoves(board: Board): Position[] {
  const moves: Position[] = []
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === null) {
        moves.push({ row, col })
      }
    }
  }
  return moves
}

// 获取智能的候选位置（在已有棋子附近）
export function getSmartMoves(board: Board, radius: number = 2): Position[] {
  const moves: Position[] = []
  const visited = new Set<string>()

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] !== null) {
        // 在已有棋子周围寻找空位
        for (let dr = -radius; dr <= radius; dr++) {
          for (let dc = -radius; dc <= radius; dc++) {
            const newRow = row + dr
            const newCol = col + dc
            const key = `${newRow},${newCol}`
            
            if (newRow >= 0 && newRow < BOARD_SIZE && 
                newCol >= 0 && newCol < BOARD_SIZE && 
                board[newRow][newCol] === null && 
                !visited.has(key)) {
              moves.push({ row: newRow, col: newCol })
              visited.add(key)
            }
          }
        }
      }
    }
  }

  // 如果没有找到智能位置，返回中心位置
  if (moves.length === 0) {
    const center = Math.floor(BOARD_SIZE / 2)
    if (board[center][center] === null) {
      moves.push({ row: center, col: center })
    }
  }

  return moves
}

// 评估位置的分数（用于AI）
export function evaluatePosition(board: Board, row: number, col: number, player: Player): number {
  let score = 0
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]]

  for (const [dx, dy] of directions) {
    score += evaluateDirection(board, row, col, dx, dy, player)
  }

  return score
}

// 评估特定方向的分数
function evaluateDirection(board: Board, row: number, col: number, dx: number, dy: number, player: Player): number {
  let score = 0
  let count = 1
  let openEnds = 0

  // 向正方向检查
  let r = row + dx
  let c = col + dy
  while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
    if (board[r][c] === player) {
      count++
    } else if (board[r][c] === null) {
      openEnds++
      break
    } else {
      break
    }
    r += dx
    c += dy
  }

  // 向负方向检查
  r = row - dx
  c = col - dy
  while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
    if (board[r][c] === player) {
      count++
    } else if (board[r][c] === null) {
      openEnds++
      break
    } else {
      break
    }
    r -= dx
    c -= dy
  }

  // 根据连子数和开放端数计算分数
  if (count >= 5) {
    score += 100000
  } else if (count === 4) {
    score += openEnds === 2 ? 10000 : 1000
  } else if (count === 3) {
    score += openEnds === 2 ? 1000 : 100
  } else if (count === 2) {
    score += openEnds === 2 ? 100 : 10
  }

  return score
}

// 复制棋盘
export function copyBoard(board: Board): Board {
  return board.map(row => [...row])
}
