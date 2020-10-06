import React, { useEffect, useState } from 'react'

// styles
import classes from './TodoList.module.css'

// components
import TodoItem from './TodoItem/TodoItem.js'
import AddTodoItem from './AddTodoItem/AddTodoItem.js'

const TodoList = props => {
    // load tasks from storage on initial render
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

    // save a new task to tasks in local storage and update state
    const saveTasks = newTask => {
        const newTasks = [...tasks, newTask]
        setTasks(newTasks)
        localStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    const updateStatus = (index, newStatus) => {
        const updatedTasks = [...tasks]
        updatedTasks[index].done = newStatus

        setTasks(updatedTasks)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }

    const todoItems = tasks.map((task, index) => {
        return (
            <TodoItem
                content={task.content}
                done={task.done}
                key={task.id}
                index={index}
                updateStatus={updateStatus}
            />
        )
    })

    return (
        <section className={classes.TodoList}>
            <AddTodoItem saveTasks={saveTasks} />
            {todoItems}
        </section>
    )
}

export default TodoList