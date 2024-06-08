/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Task from './Modules/TaskModule/Task.jsx'
import SelectOrderMenu from './Modules/SelectOrderMenu.jsx'
import AddTaskButton from './Modules/AddTaskButton.jsx'


function App() {

  const [tasks, setTasks] = useState(() => {
    const loadFromStorage = JSON.parse(
      localStorage.getItem('tasks')
    )
    return loadFromStorage ?? []
  })
  const [editMode, setEditMode] = useState(() => {
    const loadFromStorage = JSON.parse(
      localStorage.getItem('editMode')
    )
    return loadFromStorage ?? []
  })
  const [renderMode, setRenderMode] = useState('all')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('editMode', JSON.stringify(editMode))
  }, [tasks, editMode])


  const displayTasks = () => {
    return(
      tasks.map((task, index) => {
        switch (renderMode){
          case 'to-do': if (task.done) return null; break
          case 'done': if (!task.done) return null; break
          default: break
        }
        return (
          <Task
          tasks={tasks}
          setTasks={setTasks}
          key={index}
          i={index}
          setEditMode={setEditMode}
          editMode={editMode}
          />
        )
    })
    )
  }

  return (
    <div className="main-container">
      <header className='header'>
        <h1>TO-DO LIST APP 👌</h1>
        <SelectOrderMenu 
        setRenderMode = {setRenderMode}
        setEditMode = {setEditMode}
        />
      </header>
      <section className='list-display'>
        {displayTasks()}
        <AddTaskButton 
        setTasks={ setTasks }
        setEditMode={ setEditMode }
        editMode={ editMode }
        />
      </section>
    </div>
  )
}

export default App
