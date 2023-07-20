import { Game } from '@/data-access/games'
import { Player } from '@/data-access/players'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

import Button from '../Button/Button'

const GameLayout: FC<{ children: ReactNode; game: Game; players: Player[] }> = ({
  children,
  game,
  players,
}) => {
  const router = useRouter()
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-64 bg-l1 flex items-center px-16 justify-between">
        <div className="text-primary text-heading">{game?.name}</div>
        <Button onClick={() => router.push('/')}>Go to lobby</Button>
      </div>
      {children}
    </div>
  )
}

export default GameLayout
