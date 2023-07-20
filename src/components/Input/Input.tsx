import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'

type Props = {
  value: string
  onChange?: (v: string) => void
  placeholder?: string
}

const Input: FC<Props> = ({ value: _value, onChange, placeholder }) => {
  const [value, setValue] = useState<string>(_value)
  useEffect(() => {
    setValue(_value)
  }, [_value])

  const handleChange = (v: string) => {
    setValue(v)
    onChange?.(v)
  }
  return (
    <input
      value={value}
      onChange={e => handleChange(e.target.value)}
      placeholder={placeholder}
      className={clsx(
        'appearance-none outline-none bg-l1 rounded-4 text-emphasis text-primary px-10 py-6',
        'focus:shadow-input-border-active',
        'placeholder:text-tertiary',
      )}
    />
  )
}

export default Input
