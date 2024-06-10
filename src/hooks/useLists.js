import { useEffect } from 'react'
import { useListsContext } from '../context/useListsContext'
import { generateId } from '../services/generateId'
import { generateRandomColor } from '../services/generateRandomColor'

export function useLists () {
  const {
    lists, setLists, selectedList, setSelectedList
  } = useListsContext()

  const listIndex = lists.findIndex(l => l.id === selectedList)

  const createNewList = () => {
    const newListId = generateId(lists)
    setLists(l => [...l,
      {
        id: newListId,
        name: 'my list',
        color: generateRandomColor(lists),
        tasks: []
      }
    ])
    setSelectedList(newListId)
  }

  const deleteList = () => {
    setLists(l => {
      const newLists = structuredClone(l)
      newLists.splice(listIndex, 1)
      return newLists
    })
    setSelectedList(null)
  }

  const changeListColor = color => {
    setLists(l => {
      const newLists = structuredClone(l)
      newLists[listIndex].color = color
      return newLists
    })
  }

  useEffect(() => {
    document.title = selectedList
      ? `TODO - ${lists[listIndex].name}`
      : 'TODO'

    window.localStorage.setItem('lists', JSON.stringify(lists))
    window.localStorage.setItem('selectedList', selectedList)
  }, [selectedList, lists])

  return { createNewList, deleteList, changeListColor, listIndex }
}
