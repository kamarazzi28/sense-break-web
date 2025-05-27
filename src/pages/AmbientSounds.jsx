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
                name="Your Ambient Sounds"
                text={`Take a mindful break with ambient nature sounds.
                \nUse headphones for better experience. Start, relax, and refocus.`}
            />
            <div className="ambient-cards">
                <AmbientCard
                    id="birds"
                    isActive={activeSoundId === 'birds'}
                    onToggle={handleToggle}
                    title="Birdsong Morning"
                    description="Calm morning with birds chirping around you."
                    image="/images/pics/birds.jpg"
                    audioSrc="/sounds/morning-birds.wav"
                />

                <AmbientCard
                    id="rain"
                    isActive={activeSoundId === 'rain'}
                    onToggle={handleToggle}
                    title="Forest Rain"
                    description="Gentle rain falling through a quiet forest."
                    image="/images/pics/rain.jpg"
                    audioSrc="/sounds/rain-long-loop.wav"
                />

                <AmbientCard
                    id="ocean"
                    isActive={activeSoundId === 'ocean'}
                    onToggle={handleToggle}
                    title="Ocean Waves"
                    description="Soothing sounds of waves crashing ashore."
                    image="/images/pics/ocean.jpg"
                    audioSrc="/sounds/waves.wav"
                />
            </div>
        </>
    );
}

export default AmbientSounds;
