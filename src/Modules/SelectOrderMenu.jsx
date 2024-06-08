/* eslint-disable react/prop-types */

const SelectOrderMenu = ( { setRenderMode, setEditMode } ) => {
  const handleValueChange = (e) => {
    setRenderMode(e.target.value)
    setEditMode(em => Array(em.length).fill(false))
  }
  return (
    <label className='select-order-menu'>
      <span>Show:</span>
      <select onChange={handleValueChange}>
        <option value="all">All</option>
        <option value="to-do">To Do</option>
        <option value="done">Done</option>
      </select>
    </label>
  )
}

export default SelectOrderMenu