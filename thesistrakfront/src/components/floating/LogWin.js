import React from 'react'

const LogWin = ({ show, onClose, children }) => {
    if(!show){
        return null;
    }

    return (
        <div className="floating-window-overlay">
            <div className="floating-window">
                <button className="close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    )
}

export default LogWin
