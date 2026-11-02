import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  todos: [{ id: 1, text: 'Hello Arooj' }],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: nanoid(), text: action.payload })
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload
      const existing = state.todos.find((todo) => todo.id === id)
      if (existing) existing.text = text
    },
  },
})

export const { addTodo, removeTodo, editTodo } = todoSlice.actions
export default todoSlice.reducer
