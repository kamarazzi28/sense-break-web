import '../index.css';
import Title from '../components/Title/Title.jsx';
import AmbientCard from '../components/AmbientCard/AmbientCard.jsx';
import {useState} from "react";

function AmbientSounds() {
    const [activeSoundId, setActiveSoundId] = useState(null);

    const handleToggle = (soundId) => {
        setActiveSoundId(prev =>
            prev === soundId ? null : soundId
        );
    };
    return (
        <>
            <Title
                name="Escape the noise of the day with soothing nature sounds."
                text={`Press play, close your eyes, and let your mind drift.
\nHeadphones recommended for the full experience.`}
            />
            <div className="ambient-cards">
                <AmbientCard
                    id="birds"
                    isActive={activeSoundId === 'birds'}
                    onToggle={handleToggle}
                    title="Birdsong Morning"
                    description="Calm morning with birds chirping around you."
                    image="/images/pics/birds.png"
                    audioSrc="/sounds/morning-birds.wav"
                />

                <AmbientCard
                    id="rain"
                    isActive={activeSoundId === 'rain'}
                    onToggle={handleToggle}
                    title="Forest Rain"
                    description="Gentle rain falling through a quiet forest."
                    image="/images/pics/rain.png"
                    audioSrc="/sounds/rain-long-loop.wav"
                />

                <AmbientCard
                    id="ocean"
                    isActive={activeSoundId === 'ocean'}
                    onToggle={handleToggle}
                    title="Ocean Waves"
                    description="Soothing sounds of waves crashing ashore."
                    image="/images/pics/ocean.png"
                    audioSrc="/sounds/waves.wav"
                />
            </div>
        </>
    );
}

export default AmbientSounds;
