import '../../index.css';
import Title from "../../components/Title/Title.jsx";
import TrainingCard from "../../components/TrainingCard/TrainingCard.jsx";

function Hearing() {
    return (
        <>
            <Title
                name="Pick your training for today"
                text={`Take a moment to reset with calming audio exercises.
                \nHeadphones are recommended for the best experience.`}
            />
            <div className="training-cards">
                <TrainingCard
                    title="Sound Level Guess"
                    description="Listen to short sounds and guess which one is louder."
                    duration="~30–45 sec"
                    buttonColor="orange"
                    onStart={() => console.log('Sound Level Guess started')}/>
                <TrainingCard
                    title="Sound Detection"
                    description="Identify where the sound is coming from."
                    duration="~30–60 sec"
                    buttonColor="orange"
                    onStart={() => console.log('Sound Detection started')}/>
                <TrainingCard
                    title="Tone Matching"
                    description="Compare sounds and match their pitch."
                    duration="~60–120 sec"
                    buttonColor="orange"
                    onStart={() => console.log('Tone Matching started')}/>
            </div>
        </>
    )
}

export default Hearing;