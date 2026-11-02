import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import ThemeToggle from './components/ThemeToggle'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const count = useSelector((state) => state.todos.length)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <h1 className="app__title">Taskboard</h1>
          <p className="app__sub">
            {count === 0 ? 'Nothing planned yet' : `${count} ${count === 1 ? 'task' : 'tasks'} on your list`}
          </p>
        </div>
        <ThemeToggle
          theme={theme}
          onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        />
      </header>

      <AddTodo />
      <Todos />
    </main>
  )
}

export default App
