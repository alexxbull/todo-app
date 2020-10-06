import React from 'react'

// styles
import classes from './TodoItem.module.css'

const TodoItem = props => {
    const completeIcon = (
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-check-circle-fill" fill="#2f69e1" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
    )

    const incompleteIcon = (
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-circle" fill="#e0e0e0" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        </svg>
    )

    const taskClasses = [classes.Task]
    let statusIcon = incompleteIcon

    if (props.done) {
        statusIcon = completeIcon
        taskClasses.push(classes.Completed)
    }

    return (
        <div className={classes.TodoItem}>
            <button className={classes.CheckBtn} onClick={() => props.updateStatus(props.index, !props.done)}>
                {statusIcon}
            </button>
            <div className={taskClasses.join(' ')}>{props.content}</div>
        </div>
    )
}

export default TodoItem