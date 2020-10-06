import React from 'react'

// styles
import classes from './App.module.css'

// components
import TodoList from './components/TodoList/TodoList.js'

function App() {
  return (
    <div className={classes.App}>

      <header>
        <h1>todo list</h1>
      </header>

      <main>
        <TodoList />
      </main>

    </div>
  )
}

export default App