import React, { useState } from 'react'

// styles
import classes from './AddTodoItem.module.css'

const AddTodoItem = props => {
    const [task, setTask] = useState('')

    const handleInput = event => setTask(event.target.value)

    const handleSubmit = event => {
        event.preventDefault()

        console.log('new task', task)

        if (task) {
            props.tasks.push({
                content: task,
                done: false,
            })
            props.saveTasks()
        }
    }

    return (
        <form className={classes.AddTodoItem} onSubmit={handleSubmit}>
            <input type="text" name="task" placeholder={'What needs to be done?'} onChange={handleInput} />
        </form>
    )
}

export default AddTodoItem