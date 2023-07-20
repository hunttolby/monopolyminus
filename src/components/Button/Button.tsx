import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import Loader from '../Loader/Loader'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'small' | 'large'

type Props = {
  children: ReactNode
  onClick: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
}

const Button: FC<Props> = ({
  children,
  onClick,
  size = 'small',
  variant = 'primary',
  disabled,
  loading,
}) => {
  const sizeStyles: Record<ButtonSize, string> = {
    small: 'px-10 py-6 text-strong',
    large: 'px-16 py-10 text-large-strong',
  }
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-button-primary hover:bg-button-primary-hover disabled:bg-button-primary-disabled text-black',
    secondary:
      'bg-button-secondary hover:bg-button-secondary-hover disabled:bg-button-secondary-disabled text-primary',
  }
  return (
    <button
      onClick={onClick}
      className={clsx(
        'relative select-none appearance-none px-10 py-6 rounded-4 min-w-[64px] disabled:cursor-not-allowed flex items-center justify-center',
        sizeStyles[size],
        variantStyles[variant],
      )}
      disabled={disabled}
    >
      {loading && (
        <div className="absolute right-[50%] translate-x-[50%]">
          <Loader size={size} />
        </div>
      )}
      <div className={clsx(loading && 'opacity-0 pointer-events-none')}>{children}</div>
    </button>
  )
}

export default Button
