import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo, editTodo } from '../features/todo/todoSlice'
import { EditIcon, TrashIcon, CheckIcon, CloseIcon } from './Icons'

const EXIT_MS = 260

function Todos() {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [leavingId, setLeavingId] = useState(null)

  const handleEdit = (todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditText('')
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const text = editText.trim()
    if (!text) return
    dispatch(editTodo({ id: editId, text }))
    cancelEdit()
  }

  // Play the exit animation first, then remove from the store
  const handleDelete = (id) => {
    setLeavingId(id)
    setTimeout(() => {
      dispatch(removeTodo(id))
      setLeavingId(null)
    }, EXIT_MS)
  }

  if (todos.length === 0) {
    return (
      <div className="empty">
        <p className="empty__title">No tasks yet</p>
        <p className="empty__text">Type a task above and press Add task to get started.</p>
      </div>
    )
  }

  return (
    <ul className="list">
      {todos.map((todo) => (
        <li key={todo.id} className={`item ${leavingId === todo.id ? 'is-leaving' : ''}`}>
          <div className="item__shell">
            {editId === todo.id ? (
              <form className="task task--editing" onSubmit={handleUpdate}>
                <input
                  className="task__input"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && cancelEdit()}
                  aria-label="Edit task"
                  autoFocus
                />
                <div className="task__actions">
                  <button type="submit" className="icon-btn icon-btn--save" aria-label="Save changes" title="Save changes">
                    <CheckIcon />
                  </button>
                  <button type="button" className="icon-btn" onClick={cancelEdit} aria-label="Cancel editing" title="Cancel">
                    <CloseIcon />
                  </button>
                </div>
              </form>
            ) : (
              <div className="task">
                <span className="task__dot" aria-hidden="true" />
                <span className="task__text">{todo.text}</span>
                <div className="task__actions">
                  <button type="button" className="icon-btn icon-btn--edit" onClick={() => handleEdit(todo)} aria-label="Edit task" title="Edit task">
                    <EditIcon />
                  </button>
                  <button type="button" className="icon-btn icon-btn--delete" onClick={() => handleDelete(todo.id)} aria-label="Delete task" title="Delete task">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Todos
