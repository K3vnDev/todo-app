import { ListsContext } from './ListsContext'
import { useContext } from 'react'

export function useListsContext () {
  const {
    lists, setLists, editMode, setEditMode, selectedList, setSelectedList
  } = useContext(ListsContext)

  return {
    lists, setLists, editMode, setEditMode, selectedList, setSelectedList
  }
}
