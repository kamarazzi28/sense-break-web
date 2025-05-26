import '../index.css';
import Title from "../components/Title/Title.jsx";
import TrainingCard from "../components/TrainingCard/TrainingCard.jsx";
import ImageCardLarge from "../components/ImageCard/ImageCardLarge.jsx";
import {onStartTraining} from "../firebaseHelpers.js";

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
                    onStart={() => onStartTraining('hearing')}
                />
                <TrainingCard
                    title="Sound Detection"
                    description="Identify where the sound is coming from."
                    duration="~30–60 sec"
                    buttonColor="orange"
                    onStart={() => onStartTraining('hearing')}
                />
                <TrainingCard
                    title="Tone Matching"
                    description="Compare sounds and match their pitch."
                    duration="~60–120 sec"
                    buttonColor="orange"
                    onStart={() => onStartTraining('hearing')}
                />
            </div>
            <ImageCardLarge
                title="Ambient Noise Session"
                description={`Take a break with calming sounds.\nUse headphones for a deeper experience.`}
                image="/images/girl/girl_with_headphones.png"
                imageStyle={{
                    height: '250px',
                    right: '-60px',
                    bottom: '0'
                }}
                buttonText="Start Today’s Session"
                buttonColor="green"
                onClick={() => onStartTraining('relaxation')}
            />
        </>
    )
}

export default Hearing;