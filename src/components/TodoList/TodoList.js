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

            for (const task of jsonData)
                loadedTasks.push(task)

            setTasks(loadedTasks)
        }
    }, [])

    const [tasks, setTasks] = useState([])

    const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks))

    const todoItems = tasks.map(task => {
        const date = new Date()
        return (
            <TodoItem
                content={task.content}
                done={task.done}
                key={date.getTime()}
            />
        )
    })

    return (
        <div className={classes.TodoList}>
            <AddTodoItem tasks={tasks} saveTasks={saveTasks} />
            {todoItems}
        </div>
    )
}

export default TodoList