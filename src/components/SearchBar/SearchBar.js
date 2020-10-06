import React, { useState } from 'react'

// styles
import classes from './SearchBar.module.css'

const SearchBar = props => {
    const [query, setQuery] = useState('')

    // update query to the value entered in the input tag
    const handleInput = event => {
        const newQuery = event.target.value
        setQuery(newQuery)
        props.handleSearch(newQuery)
    }

    return (
        <form className={classes.SearchBar} aria-labelledby="Search for a task">
            <input
                type="text"
                name="search"
                placeholder={'Search'}
                onChange={handleInput}
                value={query}
                aria-labelledby="Enter text to search for task" />
        </form>
    )

}

export default SearchBar