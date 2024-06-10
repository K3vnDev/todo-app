import { TasksList } from './components/TasksList/TasksList.jsx'
import { ListsMenu } from './components/ListsMenu/ListsMenu.jsx'
import { useListsContext } from './context/useListsContext.js'

function App () {
  const { selectedList } = useListsContext()
  return (
    <>
      <section className='lists-section'>
        <h1 style={{ color: 'white' }}>TODO APP</h1>
        <ListsMenu />
      </section>
      {
        selectedList &&
          <TasksList />
      }
      <div className='background-base'>
        <div className='background-color' />
      </div>
    </>
  )
}

export default App
