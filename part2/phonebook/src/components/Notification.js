import React from 'react'

const Notification = ({ message }) => {
    switch (true) {
        case message === null:
            return <div></div>
        case !message.includes('Removal'):
            return (
                <div className="added">{message}</div>
            )
        case message.includes('Removal'):
            return (
                <div className="removed">{message}</div>
            )
    }
}

export default Notification
