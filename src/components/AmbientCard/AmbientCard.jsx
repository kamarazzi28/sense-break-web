import {useEffect, useState} from 'react';
import './AmbientCard.css';
import IconButton from "../IconButton/IconButton.jsx";
import {Pause, Play} from "lucide-react";
import {getCurrentTitle, playAudio, resumeAudioIfNeeded, stopAudio, subscribeToTime} from "../../audioManager";

function AmbientCard({title, description, image, audioSrc}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        const unsub = subscribeToTime(setMinutes);
        const resumed = resumeAudioIfNeeded();
        if (resumed === title) setIsPlaying(true);
        return () => unsub();
    }, []);

    const toggleAudio = () => {
        if (isPlaying) {
            stopAudio();
            setIsPlaying(false);
        } else {
            playAudio(title, audioSrc);
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const active = getCurrentTitle();
            if (active !== title && isPlaying) {
                setIsPlaying(false);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [isPlaying, title]);

    return (
        <div className="ambient-card">
            <img src={image} alt={title} className="ambient-image"/>
            <div className="ambient-card-bottom">
                <div className="ambient-info">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    {isPlaying && <span className="time-counter">{minutes} min playing</span>}
                </div>
                <IconButton onClick={toggleAudio} className="green-icon-button">
                    {isPlaying ? <Pause size={25}/> : <Play size={25}/>}
                </IconButton>
            </div>
        </div>
    );
}

export default AmbientCard;
