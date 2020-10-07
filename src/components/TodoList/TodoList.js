import React, { useEffect, useState } from 'react'

// styles
import classes from './TodoList.module.css'

// components
import TodoItem from './TodoItem/TodoItem.js'
import AddTodoItem from './AddTodoItem/AddTodoItem.js'
import SearchBar from '../SearchBar/SearchBar'

// load task data from local storage
const loadTasks = () => {
    const jsonData = JSON.parse(localStorage.getItem('tasks'))
    const loadedTasks = []

    if (jsonData) {
        for (const task of jsonData)
            loadedTasks.push(task)
    }

    return loadedTasks
}

// return a filtered list of tasks based status given
const getFilteredTasks = (status, search) => {
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

    if (search)
        filteredTasks = filteredTasks.filter(task => task.content.includes(search))

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

        localStorage.setItem('tasks', JSON.stringify(activeTasks))

        // re-render the new filtered list
        const filteredTasks = getFilteredTasks(activeStatusBtn)
        setTasks(filteredTasks)
    }

    // set which status button is active and filter the tasks as appropriate
    const [activeStatusBtn, setActiveStatusBtn] = useState('all')
    const handleStatusBtn = event => {
        const status = event.target.name
        setActiveStatusBtn(status)
    }

    // filter visible tasks by the currently selected status button
    const [query, setQuery] = useState('')
    useEffect(() => {
        setTasks(getFilteredTasks(activeStatusBtn, query))
    }, [activeStatusBtn, query])


    // filter tasks by search value
    const handleSearch = query => {
        setQuery(query)
    }

    // remove task from the list with the given id
    const deleteTask = id => {
        const remainingTasks = loadTasks().filter(task => task.id !== id)
        setTasks(remainingTasks)
        localStorage.setItem('tasks', JSON.stringify(remainingTasks))
    }

    // build a list of TodoItem from tasks
    let remainingTasks = 0
    const todoItems = tasks.map((task, index) => {
        if (!task.done)
            remainingTasks += 1

        return (
            <TodoItem
                content={task.content}
                delete={deleteTask}
                done={task.done}
                key={task.id}
                id={task.id}
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
            <SearchBar
                tasks={tasks}
                handleSearch={handleSearch}
            />
            <section className={classes.TodoList} aria-labelledby="List of tasks">
                <AddTodoItem saveTasks={saveTasks} />
                {todoItems}
            </section>

            <section className={classes.StatusBar} aria-labelledby="Status Filter">
                <div className={classes.TaskCount} aria-labelledby="Uncompleted Task Count" aria-valuemin="0" aria-valuenow={remainingTasks} >{remainingTasks} task left</div>
                <nav className={classes.StatusBtnGroup} aria-labelledby="Filter by status">
                    <button className={getStatusBtnClasses('all').join(' ')} onClick={handleStatusBtn} name="all" aria-labelledby="all">all</button>
                    <button className={getStatusBtnClasses('active').join(' ')} onClick={handleStatusBtn} name="active" aria-labelledby="active">active</button>
                    <button className={getStatusBtnClasses('completed').join(' ')} onClick={handleStatusBtn} name="completed" aria-labelledby="completed"> completed</button>
                </nav>
                <button className={classes.RemoveCompletedBtn} onClick={removeCompletedTasks} aria-labelledby="Remove compeleted tasks">clear completed</button>
            </section>
        </>
    )
}

export default TodoList