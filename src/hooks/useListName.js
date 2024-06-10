import { useState, useEffect, useRef } from 'react'
import { useListsContext } from '../context/useListsContext'
import { useLists } from './useLists'

export function useListName ({ name }) {
  const [editMode, setEditMode] = useState(false)
  const [inputName, setInputName] = useState(name)
  const { setLists, selectedList } = useListsContext()
  const inputRef = useRef()
  const { listIndex } = useLists()

  const toggleEditMode = () => {
    setEditMode(e => !e)
  }

  const handleInputChange = e => {
    const { value } = e.target
    if (value.length < 30) {
      setInputName(value)
    }
  }

  useEffect(() => {
    if (inputRef.current && editMode) {
      inputRef.current.focus()
    }
  }, [inputRef, editMode])

  useEffect(() => {
    setLists(l => {
      const newLists = structuredClone(l)
      newLists[listIndex].name = inputName
      return newLists
    })
  }, [inputName])

  useEffect(() => {
    setInputName(name)
  }, [selectedList])

  return { inputName, editMode, toggleEditMode, handleInputChange, inputRef }
}
