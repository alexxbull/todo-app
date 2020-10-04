import React from 'react'

// styles
import classes from './App.module.css'

// components
import TodoList from './components/TodoList/TodoList.js'
import SearchBar from './components/SearchBar/SearchBar.js'

function App() {
  return (
    <div className={classes.App}>

      <header>
        <SearchBar />
        <h1>todo list</h1>
        <div className={classes.filler}></div>
      </header>

      <main>
        <TodoList />
      </main>

    </div>
  )
}

export default App