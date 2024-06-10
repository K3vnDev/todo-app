import { useListsContext } from '../context/useListsContext'
import { useLists } from '../hooks/useLists'

export const AddTaskButton = ({ setTasks, editMode, setEditMode }) => {
  const { listIndex } = useLists()
  const { setLists } = useListsContext()

  const handleAddTaskButton = () => {
    setLists(l => {
      const newLists = structuredClone(l)
      const newList = l[listIndex]
      const { tasks } = newList
      tasks.push({
        text: '',
        done: false
      })
      setEditMode(tasks.length - 1)
      newLists.splice(listIndex, 1, newList)
      return newLists
    })
  }

  return (
    <button
      className='add-task-btn'
      onClick={handleAddTaskButton}
    >
      +
    </button>
  )
}
