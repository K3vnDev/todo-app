import { useState, useEffect, useRef } from 'react'
import './task.css'
import { useListsContext } from '../../context/useListsContext'
import { useTask } from '../../hooks/useTask'
import { SaveIcon } from '../icons/SaveIcon'
import { DeleteIcon } from '../icons/DeleteIcon'

export function Task ({ i }) {
  const { lists, editMode } = useListsContext()
  const taskRef = useRef()

  const {
    textChangeHandler, toggleCheckbox, deleteButtonHandler,
    saveButtonHandler, setEditMode, listIndex
  } = useTask(i)
  const { text, done } = lists[listIndex].tasks[i]
  const [checked, setChecked] = useState(done)

  useEffect(() => {
    setChecked(done)
  }, [lists, i])

  const className =
    `task-container
    ${checked ? ' checked' : ''}
    ${editMode === i ? ' edit-mode' : ''}`

  const handleEditMode = ({ target }) => {
    if (taskRef.current.contains(target)) {
      setEditMode(i)
    } else if (
      !target.className.includes('task-container') &&
      !target.className.includes('add-task-btn') &&
      !target.className.includes('task-text-input')
    ) {
      setEditMode(-1)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleEditMode)
    return () => document.removeEventListener('click', handleEditMode)
  })

  if (editMode === i) {
    return (
      <form
        className={className}
        ref={taskRef}
      >
        <InputText
          textChangeHandler={textChangeHandler}
          prevText={text}
          editMode={editMode} i={i}
        />
        <button
          className='task-opt-btn save'
          onClick={saveButtonHandler}
        >
          <SaveIcon />
        </button>
        <button
          className='task-opt-btn delete'
          onClick={deleteButtonHandler}
        >
          <DeleteIcon />
        </button>
      </form>

    )
  }
  return (
    <div
      className={className}
      ref={taskRef}
    >
      <p className='task-text'>
        {text}
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

function InputText ({ textChangeHandler, prevText }) {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <input
      type='text'
      className='task-text-input'
      ref={inputRef}
      onChange={textChangeHandler}
      value={prevText}
    />
  )
}
