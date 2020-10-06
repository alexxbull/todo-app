import React, { useEffect, useState } from 'react'

// styles
import classes from './TodoList.module.css'

// components
import TodoItem from './TodoItem/TodoItem.js'
import AddTodoItem from './AddTodoItem/AddTodoItem.js'

// load task data from local storage
const loadTasks = () => {
    const jsonData = JSON.parse(localStorage.getItem('tasks'))
    const loadedTasks = []

    for (const task of jsonData)
        loadedTasks.push(task)

    return loadedTasks
}

// return a filtered list of tasks based status given
const getFilteredTasks = status => {
    const storedTasks = loadTasks()
    let filteredTasks = []

    switch (status) {
        case 'all':
            filteredTasks = [...storedTasks]
            break
        case 'active':
            storedTasks.forEach((task, index) => {
                if (!task.done) {
                    task.originalIndex = index
                    filteredTasks.push(task)
                }
            })
            break
        case 'completed':
            storedTasks.forEach((task, index) => {
                if (task.done) {
                    task.originalIndex = index
                    filteredTasks.push(task)
                }
            })
            break
        default:
            break
    }

    return filteredTasks
}

const TodoList = props => {
    const [tasks, setTasks] = useState([])

    // load tasks from storage on initial render
    useEffect(() => {
        if (localStorage['tasks'])
            setTasks(loadTasks())
    }, [])

    // save a new task and update local storage
    const saveTasks = newTask => {
        const storedTasks = loadTasks()
        const newTasks = [...storedTasks, newTask]
        setTasks(newTasks)
        localStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    // update the active status of a task and save it to local storage
    const updateStatus = (index, newStatus) => {
        const storedTasks = loadTasks()
        const updatedTasks = [...storedTasks]
        updatedTasks[index].done = newStatus

        localStorage.setItem('tasks', JSON.stringify(updatedTasks))

        // re-render the new filtered list
        const filteredTasks = getFilteredTasks(activeStatusBtn)
        setTasks(filteredTasks)
    }

    // remove completed tasks and save the remaining tasks to local storage
    const removeCompletedTasks = () => {
        const storedTasks = loadTasks()
        const activeTasks = storedTasks.filter(task => !task.done)

        setTasks(activeTasks)
        localStorage.setItem('tasks', JSON.stringify(activeTasks))
    }

    // set which status button is active and filter the tasks as appropriate
    const [activeStatusBtn, setActiveStatusBtn] = useState('all')
    const handleStatusBtn = event => {
        const status = event.target.name
        setActiveStatusBtn(status)
    }

    // filter visible tasks by the currently selected status button
    useEffect(() => {
        setTasks(getFilteredTasks(activeStatusBtn))
    }, [activeStatusBtn])


    // build a list of TodoItem from tasks
    let remainingTasks = 0
    const todoItems = tasks.map((task, index) => {
        if (!task.done)
            remainingTasks += 1

        return (
            <TodoItem
                content={task.content}
                done={task.done}
                key={task.id}
                index={index}
                originalIndex={task.originalIndex}
                updateStatus={updateStatus}
            />
        )
    })

    const getStatusBtnClasses = name => {
        if (name === activeStatusBtn)
            return [classes.StatusBtn, classes.ActiveBtn]
        else
            return [classes.StatusBtn]
    }

    return (
        <>
            <section className={classes.TodoList}>
                <AddTodoItem saveTasks={saveTasks} />
                {todoItems}
            </section>

            <section className={classes.StatusBar}>
                <div className={classes.TaskCount}>{remainingTasks} task left</div>
                <nav className={classes.StatusBtnGroup}>
                    <button className={getStatusBtnClasses('all').join(' ')} onClick={handleStatusBtn} name="all">all</button>
                    <button className={getStatusBtnClasses('active').join(' ')} onClick={handleStatusBtn} name="active">active</button>
                    <button className={getStatusBtnClasses('completed').join(' ')} onClick={handleStatusBtn} name="completed">completed</button>
                </nav>
                <button className={classes.RemoveCompletedBtn} onClick={removeCompletedTasks}>clear completed</button>
            </section>
        </>
    )
}

export default TodoList