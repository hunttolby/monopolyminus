import { Game } from './games'
import { Player } from './players'

export type Token =
  | 'dragon'
  | 'frog'
  | 'shrimp'
  | 'meteor'
  | 'shuttle-space'
  | 'ice-cream'
  | 'gamepad'
  | 'basketball'
  | 'futbol'
  | 'coins'
  | 'sack-dollar'
  | 'hat-cowboy-side'

export interface Database {
  public: {
    Tables: {
      games: {
        Row: Game
      }
      players: {
        Row: Player
      }
    }
  }
}
