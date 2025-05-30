import {useEffect, useState} from 'react';
import './AmbientCard.css';
import IconButton from "../IconButton/IconButton.jsx";
import {Pause, Play} from "lucide-react";
import {
    getCurrentSeconds,
    getCurrentTitle,
    getSavedAudioInfo,
    isAudioActiveFor,
    playAudio,
    stopAudio
} from "../../audioManager";
import {auth, db} from "../../firebase";
import {doc, increment, updateDoc} from "firebase/firestore";

function AmbientCard({title, description, image, audioSrc}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // ⏱ Firestore update every full minute
    const handleTick = async () => {
        console.log("🧩 Tick +1 min from audio");
        setMinutes(prev => prev + 1);

        const user = auth.currentUser;
        if (!user) return;

        const ref = doc(db, "progress", user.uid);
        try {
            await updateDoc(ref, {
                relaxationMinutes: increment(1)
            });
            console.log("✅ relaxationMinutes +1 stored");
        } catch (e) {
            console.error("❌ Failed to update relaxationMinutes", e);
        }
    };

    // ✅ Инициализация: если звук активен, восстанавливаем
    useEffect(() => {
        const saved = getSavedAudioInfo();
        const stillPlaying = isAudioActiveFor(title);

        if (saved && stillPlaying) {
            setIsPlaying(true);

            const ms = Date.now() - parseInt(saved.start, 10);
            setMinutes(Math.floor(ms / 60000));
            setSeconds(Math.floor(ms / 1000));
        } else {
            setIsPlaying(false);
            setMinutes(0);
            setSeconds(0);
        }
    }, []);


    // ⏱ Секундный таймер
    useEffect(() => {
        if (!isPlaying) return;

        const id = setInterval(() => {
            setSeconds(getCurrentSeconds());
        }, 1000);
        return () => clearInterval(id);
    }, [isPlaying]);

    // ⛔ Автоматическое выключение чужого звука
    useEffect(() => {
        const interval = setInterval(() => {
            const active = getCurrentTitle();
            if (active !== title && isPlaying) {
                setIsPlaying(false);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [isPlaying, title]);

    const toggleAudio = () => {
        if (isPlaying) {
            stopAudio();
            setIsPlaying(false);
        } else {
            playAudio(title, audioSrc, handleTick);
            setIsPlaying(true);
        }
    };

    const displayTime = minutes < 1
        ? `${seconds} sec playing`
        : `${minutes} min playing`;

    return (
        <div className="ambient-card">
            <img src={image} alt={title} className="ambient-image"/>
            <div className="ambient-card-bottom">
                <div className="ambient-info">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    {isPlaying && <span className="time-counter">{displayTime}</span>}
                </div>
                <IconButton onClick={toggleAudio} className="green-icon-button">
                    {isPlaying ? <Pause size={25}/> : <Play size={25}/>}
                </IconButton>
            </div>
        </div>
    );
}

export default AmbientCard;
