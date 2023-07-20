import { supabase } from '@/pages'

import { UserId } from './auth'
import { $monoRefetch, FetchRequestMap } from './mono-fetch'
import { Player, PlayerId } from './players'

export type GameId = string
export type Game = {
  id: GameId
  name: string
  password: string
  created_at: string
  player_ids: PlayerId[]
  user_ids: UserId[]
  whose_turn: PlayerId
  started: boolean
}

export type GameCreate = {
  name: string
  password: string
  player_ids: PlayerId[]
  user_ids: UserId[]
  whose_turn: PlayerId
}

export type GameJoin = {
  name: string
  password: string
  player_id: PlayerId
  user_id: UserId
}

export interface GamesFetch {
  'games/create': [GameCreate, never]
  'games/list': [{ user_ids?: UserId[] }, Game[]]
  'games/get': [{ id: GameId }, { game: Game; players: Player[] }]
  'games/join': [GameJoin, void]
}

export const gamesFetch = {
  'games/create': async (req: FetchRequestMap<'games/create'>) => {
    await supabase.from('games').upsert(req)
    $monoRefetch(['games/list'])
  },
  'games/join': async (req: FetchRequestMap<'games/join'>) => {
    const { data: currGame } = await supabase
      .from('games')
      .select()
      .ilike('name', req.name)
      .like('password', req.password)
    const resp = await supabase
      .from('games')
      .update({
        player_ids: [...currGame?.[0].player_ids, req.player_id],
        user_ids: [...currGame?.[0]?.user_ids, req.user_id],
      })
      .ilike('name', req.name)
      .like('password', req.password)
    $monoRefetch(['games/list'])
    return resp
  },
  'games/list': async (req: FetchRequestMap<'games/list'>) => {
    const resp = await supabase
      .from('games')
      .select()
      .overlaps('user_ids', req?.user_ids ?? [])

    return resp.data
  },
  'games/get': async (req: FetchRequestMap<'games/get'>) => {
    const resp = await supabase.from('games').select().eq('id', req.id)
    const playerResp = await supabase.from('players').select().in('id', resp.data?.[0].player_ids)
    return {
      game: resp.data?.[0],
      players: playerResp.data,
    }
  },
}
