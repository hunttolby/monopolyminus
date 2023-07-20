import { $monoDo, $monoUse } from '@/data-access'
import { Player } from '@/data-access/players'
import { Token } from '@/data-access/types'
import { User } from '@supabase/supabase-js'
import { useState } from 'react'

import Button from '../Button/Button'
import Input from '../Input/Input'
import Loader from '../Loader/Loader'
import LoggedInLayout from '../LoggedInLayout/LoggedInLayout'
import GameRow from './GameRow'
import TokenSelector from './TokenSelector'

const Lobbys = () => {
  const { data: user } = $monoUse('auth/me')
  const { data: players } = $monoUse('players/list')

  const [gameName, setGameName] = useState<string>('')
  const [gamePassword, setGamePassword] = useState<string>('')
  const [joinName, setJoinName] = useState<string>('')
  const [joinPassword, setJoinPassword] = useState<string>('')
  const [createToken, setCreateToken] = useState<Token>('hat-cowboy-side')
  const [joinToken, setJoinToken] = useState<Token>('gamepad')

  const createGame = $monoDo('games/create')
  const createPlayer = $monoDo('players/create')
  const joinGame = $monoDo('games/join')

  const handleCreateGame = async () => {
    const newPlayer = await createPlayer.mutateAsync({
      token: createToken,
      user_id: user?.id as string,
      display_name: user?.user_metadata?.displayName ?? user?.email,
    })

    await createGame.mutateAsync({
      name: gameName,
      password: gamePassword,
      whose_turn: newPlayer?.id as string,
      player_ids: [newPlayer?.id as string],
      user_ids: [user?.id as string],
    })

    setGameName('')
    setGamePassword('')

    // move to game page
  }

  const handleJoinGame = async () => {
    const newPlayer = await createPlayer.mutateAsync({
      token: createToken,
      user_id: user?.id as string,
      display_name: user?.user_metadata?.displayName ?? user?.email,
    })

    await joinGame.mutateAsync({
      name: joinName,
      password: joinPassword,
      player_id: newPlayer.id,
      user_id: user?.id as string,
    })

    setJoinName('')
    setJoinPassword('')
    // move to game page
  }

  const { data: games, isFetching } = $monoUse('games/list', { user_ids: [user?.id as string] })

  return (
    <LoggedInLayout>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-364 bg-l0 shadow-modal rounded-xl flex flex-col">
          <div className="w-full h-full border-b border-b-l1 flex flex-col px-16 py-12 gap-16">
            <div className="text-heading text-primary">Create</div>
            <Input placeholder="Game Name" value={gameName} onChange={setGameName} />
            <Input placeholder="Password" value={gamePassword} onChange={setGamePassword} />
            <div className="flex items-end justify-between">
              <TokenSelector token={createToken} onChange={setCreateToken} />
              <Button onClick={() => handleCreateGame()} loading={createGame.isLoading}>
                Create
              </Button>
            </div>
          </div>
          <div className="w-full h-full py-12 flex flex-col">
            <div className="flex flex-col gap-16 px-16 pb-24 border-b border-b-l3">
              <div className="text-heading text-primary">Join</div>
              <Input placeholder="Game Name" value={joinName} onChange={setJoinName} />
              <Input placeholder="Password" value={joinPassword} onChange={setJoinPassword} />
              <div className="flex items-end justify-between">
                <TokenSelector token={joinToken} onChange={setJoinToken} />
                <Button onClick={() => handleJoinGame()}>Join</Button>
              </div>
            </div>
            <div className="max-h-320 overflow-y-auto">
              {isFetching && (
                <div className="flex items-center justify-center h-64">
                  <Loader size="medium" />
                </div>
              )}
              {games?.map((game, idx) => (
                <GameRow
                  key={game.id}
                  game={game}
                  players={players as Player[]}
                  isLast={idx === games.length - 1}
                  user={user as User}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  )
}

export default Lobbys
