import React from 'react'

// styles
import classes from './TodoList.module.css'

// components
import TodoItem from './TodoItem/TodoItem.js'
import AddTodoItem from './AddTodoItem/AddTodoItem.js'

const TodoList = props => {

    return (
        <div className={classes.TodoList}>
            Todo
            <AddTodoItem />
            <TodoItem />
        </div>
    )
}

export default TodoList