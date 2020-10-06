import React, { useState } from 'react'

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

    const deleteIcon = (
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
        </svg>
    )

    const taskClasses = [classes.Task]
    let statusIcon = incompleteIcon

    if (props.done) {
        statusIcon = completeIcon
        taskClasses.push(classes.Completed)
    }

    const [deleteBtnClasses, setDeleteBtnClassess] = useState([classes.DeleteBtn])
    // show delete button on hover
    const handleMouseEnter = () => {
        console.log('enter')
        setDeleteBtnClassess([classes.DeleteBtn, classes.Show])
    }

    // hide delete button on hover exit
    const handleMouseLeave = () => {
        console.log('exit')
        setDeleteBtnClassess([classes.DeleteBtn])
    }

    return (
        <section className={classes.TodoItem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className={classes.CheckBtn} onClick={() => props.updateStatus(props.originalIndex || props.index, !props.done)}>
                {statusIcon}
            </button>
            <div className={taskClasses.join(' ')}>{props.content}</div>
            <button className={deleteBtnClasses.join(' ')} onClick={() => props.delete(props.id)}>
                {deleteIcon}
            </button>
        </section>
    )
}

export default TodoItem