import { supabase } from '@/pages'

import { UserId } from './auth'
import { $monoRefetch, FetchRequestMap } from './mono-fetch'
import { Token } from './types'

export type PlayerId = string
type PropertyId = string
export type Player = {
  id: PlayerId
  created_at: string
  user_id: UserId
  game_id: string
  display_name: string
  token: Token
  money: number
  owned_properties: {
    id: PropertyId
    houses: number //max 5 at 5 we move to hotel
    mortgaged: boolean
  }[]
  bankrupt: boolean
  position: PropertyId
}

export type PlayerUpdate = {
  token: string
  user_id: UserId
  display_name: string
}

export interface PlayersFetch {
  'players/list': [{ ids: PlayerId[] }, Player[]]
  'players/create': [PlayerUpdate, Player]
}

export const playersFetch = {
  'players/list': async (req: FetchRequestMap<'players/list'>) => {
    let resp = null
    if (req?.ids?.length > 0) {
      resp = await supabase.from('players').select().in('id', req.ids)
    } else {
      resp = await supabase.from('players').select()
    }
    return resp.data
  },
  'players/create': async (req: FetchRequestMap<'players/create'>) => {
    const resp = await supabase.from('players').upsert(req).select()
    $monoRefetch(['players/list'])
    return resp.data?.[0]
  },
}
