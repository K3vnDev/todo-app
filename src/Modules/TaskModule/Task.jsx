/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './task.css'

const InputText = ({ textChangeHandler, prevText, toggleEditMode, editMode, i }) => {
  useEffect(() => {
    if (editMode[i]) {
      const thisElement = document.querySelector('.task-text-input')
      thisElement.value = prevText
      thisElement.focus()
    }
  }, [prevText, editMode, i])

  return (
    <input
      type='text'
      className='task-text-input'
      formAction={toggleEditMode}
      onChange={textChangeHandler}
    />
  )
}

const Task = ({ tasks, setTasks, editMode, setEditMode, i }) => {
  const [checked, setChecked] = useState(tasks[i].done)

  useEffect(() => {
    setChecked(tasks[i].done)
  }, [tasks, i])

  const textChangeHandler = (e) => {
    setTasks(t => {
      const newObject = {
        ...t[i],
        text: e.target.value
      }
      const newTasks = [...t]
      newTasks.splice(i, 1, newObject)
      return newTasks
    })
  }
  const toggleCheckbox = () => {
    setTasks(t => {
      const newObject = {
        ...t[i],
        done: !t[i].done
      }
      setChecked(!t[i].done)

      const newTasks = [...t]
      newTasks.splice(i, 1, newObject)
      return newTasks
    })
  }
  const deleteButtonHandler = () => {
    setEditMode(em => {
      const newEM = [...em]
      newEM.splice(i, 1)
      return newEM
    })
    setTasks(t => {
      const newTasks = [...t]
      newTasks.splice(i, 1)
      return newTasks
    })
    console.log(editMode, tasks)
  }
  const toggleEditMode = () => {
    setEditMode(em => {
      const newEM = [...em]
      newEM.splice(i, 1, !em[i])
      return newEM
    })
  }
  const enterEditModeHandler = () => {
    setEditMode(em => {
      const newEM = [...em]
      for (let j = 0; j < newEM.length; j++) {
        newEM[j] = i === j
      }
      return newEM
    })
  }
  const saveButtonHandler = () => {
    setEditMode(em => {
      const newEM = [...em]
      newEM.splice(i, 1, false)
      return newEM
    })
  }

  const className = checked
    ? 'task-container checked'
    : 'task-container'

  return editMode[i]
    ? (
      <form className={`${className} edit-mode`}>
        <InputText
          toggleEditMode={toggleEditMode}
          textChangeHandler={textChangeHandler}
          prevText={tasks[i].text}
          editMode={editMode} i={i}
        />
        <button
          className='task-opt-btn save'
          onClick={saveButtonHandler}
        >Save
        </button>
        <button
          className='task-opt-btn delete'
          onClick={deleteButtonHandler}
        >Delete
        </button>
      </form>
      )
    : (
      <div className={className}>
        <p
          className='task-text'
          onClick={enterEditModeHandler}
        >
          {tasks[i].text}
        </p>
        <div
          className='task-checkbox'
          onClick={toggleCheckbox}
        >
          <div className='checkbox-img' />
        </div>
      </div>
      )
}
export default Task
