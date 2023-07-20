import GameLayout from '@/components/GameLayout/GameLayout'
import Loader from '@/components/Loader/Loader'
import LoggedInLayout from '@/components/LoggedInLayout/LoggedInLayout'
import { $monoUse } from '@/data-access'
import { useRouter } from 'next/router'

const GamePage = () => {
  const router = useRouter()
  const { gameId } = router.query
  const { data, isFetching } = $monoUse(
    'games/get',
    { id: gameId as string },
    { enabled: !!gameId },
  )

  if (isFetching || !data) return <Loader size="screen" />

  const { players, game } = data

  return (
    <LoggedInLayout>
      <GameLayout game={game} players={players}>
        {game?.name}
        <div>
          {players?.map(p => (
            <div key={p.id}>
              {p.display_name}
              {p.owned_properties?.length}
            </div>
          ))}
        </div>
      </GameLayout>
    </LoggedInLayout>
  )
}

export default GamePage
