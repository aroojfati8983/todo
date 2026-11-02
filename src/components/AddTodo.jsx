import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'
import { PlusIcon } from './Icons'

function AddTodo() {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    dispatch(addTodo(text))
    setInput('')
  }

  return (
    <form className="add" onSubmit={addTodoHandler}>
      <input
        type="text"
        className="add__input"
        placeholder="What needs doing?"
        aria-label="New task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="btn btn--primary" disabled={!input.trim()}>
        <PlusIcon />
        <span className="btn__label">Add task</span>
      </button>
    </form>
  )
}

export default AddTodo
