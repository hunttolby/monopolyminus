import { Token } from '@/data-access/types'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBasketball,
  faCoins,
  faDragon,
  faFrog,
  faFutbol,
  faGamepad,
  faHatCowboySide,
  faIceCream,
  faMeteor,
  faSackDollar,
  faShrimp,
  faShuttleSpace,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

import SlideSelector, { SlideSelectorOption } from '../SlideSelector/SlideSelector'

const TOKENS: Token[] = [
  'basketball',
  'coins',
  'dragon',
  'frog',
  'futbol',
  'gamepad',
  'hat-cowboy-side',
  'ice-cream',
  'meteor',
  'sack-dollar',
  'shrimp',
  'shuttle-space',
]

export const tokenIconMap: Record<Token, IconDefinition> = {
  basketball: faBasketball,
  coins: faCoins,
  dragon: faDragon,
  frog: faFrog,
  futbol: faFutbol,
  gamepad: faGamepad,
  'hat-cowboy-side': faHatCowboySide,
  'ice-cream': faIceCream,
  meteor: faMeteor,
  'sack-dollar': faSackDollar,
  shrimp: faShrimp,
  'shuttle-space': faShuttleSpace,
}

type Props = {
  token: Token
  onChange: (t: Token) => void
}

const TokenSelector: FC<Props> = ({ token, onChange }) => {
  const tokenOptions: SlideSelectorOption[] = TOKENS.map(t => ({ label: t, value: t }))

  const renderItem = (opt: SlideSelectorOption) => {
    return (
      <div className="w-48 flex items-center justify-center">
        <FontAwesomeIcon
          size="2x"
          icon={tokenIconMap[opt.value as Token]}
          style={{ color: 'var(--color-text-primary)' }}
        />
      </div>
    )
  }
  return (
    <SlideSelector
      value={token}
      onChange={v => onChange(v as Token)}
      options={tokenOptions}
      renderItem={renderItem}
    />
  )
}

export default TokenSelector
