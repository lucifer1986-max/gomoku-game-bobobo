export enum Player {
  BLACK = 'black',
  WHITE = 'white'
}

export enum GameMode {
  PVP = 'pvp',      // 双人对战
  PVE = 'pve'       // 人机对战
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export type CellValue = Player | null

export type Board = CellValue[][]

export interface Position {
  row: number
  col: number
}

export interface Move extends Position {
  player: Player
}

export interface GameState {
  board: Board
  currentPlayer: Player
  gameMode: GameMode
  winner: Player | null
  isGameOver: boolean
  moveHistory: Move[]
  difficulty?: Difficulty
}

export interface GameStats {
  blackWins: number
  whiteWins: number
  draws: number
  totalGames: number
}

export interface AIConfig {
  depth: number
  difficulty: Difficulty
}
