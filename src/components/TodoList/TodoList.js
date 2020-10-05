import React, { useEffect, useState } from 'react'

// styles
import classes from './TodoList.module.css'

// components
import TodoItem from './TodoItem/TodoItem.js'
import AddTodoItem from './AddTodoItem/AddTodoItem.js'

const TodoList = props => {
    useEffect(() => {
        if (localStorage['tasks']) {
            const jsonData = JSON.parse(localStorage.getItem('tasks'))
            const loadedTasks = []

            for (const task of jsonData) {
                loadedTasks.push(task)
            }

            setTasks(loadedTasks)
        }
    }, [])

    const [tasks, setTasks] = useState([])

    const todoItems = tasks.map(task => {
        return (
            <TodoItem
                content={task.content}
                done={task.done}
            />
        )
    })

    return (
        <div className={classes.TodoList}>
            Todo
            <AddTodoItem />
            {todoItems}
        </div>
    )
}

export default TodoList