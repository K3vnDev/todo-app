import { Task } from '../Task/Task.jsx'
import { AddTaskButton } from '../AddTaskButton.jsx'
import './tasksList.css'
import { useListsContext } from '../../context/useListsContext.js'
import { useListName } from '../../hooks/useListName.js'
import { ListOptions } from './ListOptions.jsx'

export function TasksList () {
  const { lists, setLists, editMode, setEditMode, selectedList } = useListsContext()
  const { name, tasks, color } = lists.find(l => l.id === selectedList)

  return (
    <div
      className='list-container'
      style={{ boxShadow: `0 -12px 1px ${color}` }}
    >
      <header>
        <ListName name={name} />
        <ListOptions color={color} />
      </header>
      <section className='list-display'>
        {
        tasks.length > 0 &&
          tasks.map((_, index) => (
            <Task
              key={index}
              i={index}
            />
          ))
        }
        <AddTaskButton
          setLists={setLists}
          setEditMode={setEditMode}
          editMode={editMode}
        />
      </section>
    </div>
  )
}

function ListName ({ name }) {
  const {
    inputName, editMode, toggleEditMode, handleInputChange, inputRef
  } = useListName({ name })

  const handleSubmit = e => {
    e.preventDefault()
    toggleEditMode()
  }

  if (!editMode) {
    return (
      <h1
        className='list-name'
        onClick={toggleEditMode}
      >
        {name}
      </h1>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='list-name-input'
        value={inputName}
        onChange={handleInputChange}
        onBlur={toggleEditMode}
        ref={inputRef}
      />
    </form>
  )
}
