import './TrainingHeader.css';
import IconButton from '../IconButton/IconButton.jsx';
import {XIcon} from 'lucide-react';
import {useEffect, useState} from 'react';

function TrainingHeader(props) {
    const {onClose} = props;
    const [seconds, setSeconds] = useState(0);

    // start timer
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (s) => {
        const mins = String(Math.floor(s / 60)).padStart(2, '0');
        const secs = String(s % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="training-header">
            <span className="timer">{formatTime(seconds)}</span>
            <IconButton onClick={onClose}><XIcon size={24}/></IconButton>
        </div>
    );
}

export default TrainingHeader;
