import { createContext, useState } from 'react'
import { generateId } from '../services/generateId'
import { generateRandomColor } from '../services/generateRandomColor'
export const ListsContext = createContext()

const listsFromStorage = JSON.parse(window.localStorage.getItem('lists'))
const selectedListFromStorage = window.localStorage.getItem('selectedList')
const initialListId = generateId([])

export function ListsContextProvider ({ children }) {
  const [lists, setLists] = useState(
    listsFromStorage ??
    [{
      id: initialListId,
      name: 'my list',
      color: generateRandomColor([]),
      tasks: []
    }]
  )
  const [selectedList, setSelectedList] = useState(
    selectedListFromStorage ?? initialListId
  )
  const [editMode, setEditMode] = useState(-1)

  return (
    <ListsContext.Provider
      value={{
        lists, setLists, editMode, setEditMode, selectedList, setSelectedList
      }}
    >
      {children}
    </ListsContext.Provider>
  )
}
