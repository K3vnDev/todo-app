import { useListsContext } from '../context/useListsContext'
import { useLists } from './useLists'

export function useTask (index) {
  const { setLists, setEditMode } = useListsContext()
  const { listIndex } = useLists()

  const textChangeHandler = (e) => {
    setLists(l => {
      const newLists = structuredClone(l)
      const newList = l[listIndex]
      newList.tasks[index].text = e.target.value
      newLists.splice(listIndex, 1, newList)
      return newLists
    })
  }

  const toggleCheckbox = (e) => {
    e.stopPropagation()
    setEditMode(-1)
    setLists(l => {
      const newLists = structuredClone(l)
      const newList = l[listIndex]
      newList.tasks[index].done = !newList.tasks[index].done
      newLists.splice(listIndex, 1, newList)
      return newLists
    })
  }

  const deleteButtonHandler = () => {
    setEditMode(-1)
    setLists(l => {
      const newLists = structuredClone(l)
      const newList = l[listIndex]
      newList.tasks.splice(index, 1)
      newLists.splice(listIndex, 1, newList)
      return newLists
    })
  }

  const saveButtonHandler = (e) => {
    e.preventDefault()
    setEditMode(-1)
  }

  return { textChangeHandler, toggleCheckbox, deleteButtonHandler, saveButtonHandler, setEditMode, listIndex }
}
