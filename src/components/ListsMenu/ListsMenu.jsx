import { useEffect, useState } from 'react'
import { useListsContext } from '../../context/useListsContext'
import { useLists } from '../../hooks/useLists'
import './listsMenu.css'
import { AddIcon } from '../icons/AddIcon'

export function ListsMenu () {
  const { createNewList } = useLists()
  const { lists } = useListsContext()

  return (
    <section className='lists-menu'>
      <h3>My Lists 👌</h3>
      <ul>
        {
          lists.map(list => (
            <List
              id={list.id}
              name={list.name}
              color={list.color}
              key={list.id}
            />
          ))
        }
      </ul>
      {
        lists.length < 10 &&
          <button onClick={createNewList}>
            <AddIcon />
          </button>
      }
    </section>
  )
}

function List ({ id, name, color }) {
  const { setSelectedList, setEditMode, selectedList } = useListsContext()
  const initialClassName = id === selectedList
    ? 'selected'
    : 'non-selected'
  const [className, setClassName] = useState(initialClassName)

  useEffect(() => {
    setClassName(
      id === selectedList
        ? 'selected'
        : 'non-selected'
    )
  }, [selectedList])

  const handleClick = () => {
    setSelectedList(id)
    setEditMode(-1)
  }

  return (
    <li
      className={className}
      onClick={handleClick}
    >
      <div
        className='color-box'
        style={{ background: color }}
      />
      <span>{name}</span>
      {
        className !== 'selected' &&
          <div className='shine-deco' />
      }
    </li>
  )
}
