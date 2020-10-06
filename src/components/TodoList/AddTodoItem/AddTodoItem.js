import React, { useState } from 'react'

// styles
import classes from './AddTodoItem.module.css'

const AddTodoItem = props => {
    const [task, setTask] = useState('')

    // update task to the value entered in the input tag
    const handleInput = event => setTask(event.target.value)

    // add new task
    const handleSubmit = event => {
        event.preventDefault()

        if (task) {
            // load current id value from local storage
            const id = JSON.parse(localStorage.getItem('id'))
            const newValue = id ? id.value + 1 : 1

            const newTask = ({
                content: task,
                done: false,
                id: newValue,
            })

            // save new id value to local storage
            const newId = { value: newValue, }
            localStorage.setItem('id', JSON.stringify(newId))

            // save new task
            props.saveTasks(newTask)
            setTask('')
        }
    }

    return (
        <form className={classes.AddTodoItem} onSubmit={handleSubmit}>
            <input type="text" name="task" placeholder={'What needs to be done?'} onChange={handleInput} value={task} />
        </form>
    )
}

export default AddTodoItem