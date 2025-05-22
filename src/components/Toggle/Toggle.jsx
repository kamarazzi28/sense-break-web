import React from 'react';
import './Toggle.css';

function Toggle({isOn, onToggle}) {
    return (
        <div className={`toggle ${isOn ? 'on' : ''}`} onClick={onToggle}>
            <div className="toggle-thumb"/>
        </div>
    );
}

export default Toggle;
