import { MoreIcon } from '../icons/MoreIcon.jsx'
import { useEffect, useRef, useState } from 'react'
import { ArrowBack } from '../icons/ArrowBack.jsx'
import { PaletteIcon } from '../icons/PaletteIcon.jsx'
import { DeleteForeverIcon } from '../icons/DeleteForeverIcon.jsx'
import { useLists } from '../../hooks/useLists.js'

export function ListOptions ({ color }) {
  const [collapsed, setCollapsed] = useState(true)
  const optionsRef = useRef()

  const className = collapsed
    ? 'list-options collapsed'
    : 'list-options expanded'

  const handleCollapse = e => {
    setCollapsed(!optionsRef.current.contains(e.target))
  }

  useEffect(() => {
    document.addEventListener('click', handleCollapse)
    return () => {
      document.removeEventListener('click', handleCollapse)
    }
  }, [])

  return (
    <div
      className={className}
      ref={optionsRef}
    >
      <div className='buttons'>
        <MoreButton
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <ColorButton color={color} />
        <DeleteButton
          collapsed={collapsed}
        />
      </div>
    </div>
  )
}

function MoreButton ({ collapsed, setCollapsed }) {
  const handleClick = () => {
    setCollapsed(c => !c ? !c : c)
  }

  return (
    <button
      onClick={handleClick}
      className='more-btn'
    >
      {
        collapsed
          ? <MoreIcon />
          : <ArrowBack />
      }
    </button>
  )
}

function DeleteButton ({ collapsed }) {
  const { deleteList } = useLists()

  return (
    <button onClick={deleteList}>
      <DeleteForeverIcon />
    </button>
  )
}

function ColorButton ({ color }) {
  const { changeListColor } = useLists()
  const inputRef = useRef()
  const handleChange = e => {
    changeListColor(e.target.value)
  }
  const handleClick = () => {
    inputRef.current.click()
  }

  return (
    <button
      className='color-picker-btn'
      onClick={handleClick}
    >
      <input
        type='color'
        value={color}
        onChange={handleChange}
        ref={inputRef}
      />
      <PaletteIcon />
    </button>
  )
}
