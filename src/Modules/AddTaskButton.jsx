/* eslint-disable react/prop-types */

const AddTaskButton = ({ setTasks, editMode, setEditMode }) => {
  const handleAddTaskButton = () => {
    if (editMode.length > 0){
      setEditMode(em => Array(em.length).fill(false))
    }

    setEditMode(em => [...em, true])
    setTasks(t => [...t, 
      {
        text: '',
        done: false,
      }
    ])
  }

  return(
    <button 
    className="add-task-btn"
    onClick={ handleAddTaskButton }
    >+</button>
  )
}

export default AddTaskButton