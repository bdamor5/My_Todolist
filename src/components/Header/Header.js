import React from 'react'
import './Header.css';
import EventNoteIcon from '@material-ui/icons/EventNote';

const Header = () => {
    return (
        <>
            <div className='container mx-auto header'>
                <EventNoteIcon className='icon'/>
                <h2>To Do List App</h2>
            </div>
        </>
    )
}

export default Header
