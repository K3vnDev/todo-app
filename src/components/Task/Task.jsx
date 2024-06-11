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
  const { setEditMode } = useListsContext()

  const resizeScroll = () => {
    const { current } = inputRef
    current.style.height = 'auto'
    current.style.height = current.scrollHeight + 'px'
    current.setSelectionRange(current.value.length, current.value.length)
  }

  const handleChange = (e) => {
    textChangeHandler(e)
    resizeScroll()
  }

  useEffect(() => {
    inputRef.current.focus()
    resizeScroll()

    const onKeyDown = e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        setEditMode(-1)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <textarea
      rows='1'
      type='text'
      className='task-text-input'
      ref={inputRef}
      onChange={handleChange}
      value={prevText}
    />
  )
}
