import {useEffect, useRef} from 'react';
import IconButton from "../IconButton/IconButton";
import {Pause, Play} from "lucide-react";
import './AmbientCard.css';

function AmbientCard({id, title, description, image, audioSrc, isActive, onToggle}) {
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audioSrc);
            audioRef.current.loop = true;
        }

        if (isActive) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [isActive, audioSrc]);

    return (
        <div className="ambient-card">
            <img src={image} alt={title} className="ambient-image"/>
            <div className="ambient-card-bottom">
                <div className="ambient-info">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <IconButton
                    onClick={() => onToggle(id)}
                    className="green-icon-button"
                >
                    {isActive ? <Pause size={20}/> : <Play size={20}/>}
                </IconButton>
            </div>
        </div>
    );
}

export default AmbientCard;
