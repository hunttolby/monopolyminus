import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, ReactNode, useEffect, useState } from 'react'

export type SlideSelectorOption = {
  label: string
  value: string
}

type Props = {
  onChange: (v: string) => void
  value: string
  options: SlideSelectorOption[]
  renderItem: (currOption: SlideSelectorOption) => ReactNode
}

const SlideSelector: FC<Props> = ({
  onChange,
  renderItem = () => undefined,
  value,
  options = [],
}) => {
  const [currVal, setCurrVal] = useState<string>(value)
  const currValIdx = options.findIndex(o => o.value === currVal)
  useEffect(() => {
    setCurrVal(value)
  }, [value])

  const handleRotateUp = () => {
    const newIdx = currValIdx === options.length - 1 ? 0 : currValIdx + 1

    onChange(options[newIdx].value)
    setCurrVal(options[newIdx].value)
  }

  const handleRotateDown = () => {
    const newIdx = currValIdx === 0 ? options.length - 1 : currValIdx - 1

    onChange(options[newIdx].value)
    setCurrVal(options[newIdx].value)
  }

  return (
    <div className="flex items-center gap-12 select-none">
      <FontAwesomeIcon
        size="1x"
        icon={faAngleLeft}
        className="text-primary hover:text-accent cursor-pointer"
        onClick={handleRotateDown}
      />
      {renderItem(options[currValIdx])}
      <FontAwesomeIcon
        size="1x"
        icon={faAngleRight}
        className="text-primary hover:text-accent cursor-pointer"
        onClick={handleRotateUp}
      />
    </div>
  )
}

export default SlideSelector
