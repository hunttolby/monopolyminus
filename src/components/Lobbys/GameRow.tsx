import { Game } from '@/data-access/games'
import { Player } from '@/data-access/players'
import { Token } from '@/data-access/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { User } from '@supabase/supabase-js'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import { tokenIconMap } from './TokenSelector'

type Props = {
  game: Game
  players: Player[]
  user?: User
  isLast: boolean
}

const GameRow: FC<Props> = ({ game, players = [], user, isLast }) => {
  const router = useRouter()
  const currPlayer = players?.find((pl: Player) => pl.user_id === user?.id)
  const [displayHover, setDisplayHover] = useState<string>('')
  return (
    <div
      className={clsx(
        'h-64 w-full px-16 py-8 flex flex-col justify-between hover:bg-l1 cursor-pointer select-none',
        !isLast && 'border-b border-b-l3',
      )}
      onClick={() => router.push(`/game/${game.id}`)}
    >
      <div className="flex flex-row h-full w-full justify-between items-center">
        <div className="flex items-center gap-8">
          {game.started && <div className="w-10 h-10 rounded-full bg-accent" />}
          <div className="text-primary text-emphasis">{game.name}</div>
        </div>
        <div className="text-small-emphasis text-tertiary">${currPlayer?.money}</div>
      </div>
      <div className="flex flex-row h-full w-full justify-between items-center">
        <div className="flex items-center gap-8">
          {game.player_ids.map(p => {
            const player = players.find(pl => pl.id === p)
            const isYou = player?.user_id === user?.id
            return (
              <div
                key={p}
                className="text-small text-tertiary"
                onMouseEnter={() => setDisplayHover(isYou ? 'You' : player?.display_name ?? '')}
                onMouseLeave={() => setDisplayHover('')}
              >
                <FontAwesomeIcon
                  icon={tokenIconMap[player?.token as Token]}
                  className={clsx(isYou ? 'text-accent' : 'text-secondary')}
                />
              </div>
            )
          })}
          {displayHover !== '' && (
            <div className="text-small-emphasis text-tertiary w-112 truncate">{displayHover}</div>
          )}
        </div>
        <div className="text-small text-secondary">
          Properties: {currPlayer?.owned_properties?.length ?? 0}
        </div>
      </div>
    </div>
  )
}

export default GameRow
