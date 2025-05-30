import '../index.css';

import TrainingCard from "../components/TrainingCard/TrainingCard.jsx";
import Title from "../components/Title/Title.jsx";
import {onStartTraining} from "../firebaseHelpers.js";
import {useNavigate} from "react-router-dom";

function Vision() {
    const navigate = useNavigate();
    return (
        <>
            <Title
                name="Pick your training for today"
                text={`Short exercises that help reduce eye strain and keep your vision sharp.
                    \nChoose one or try them all – it only takes a few minutes.`}
            />
            <div className="training-cards">
                <TrainingCard
                    title="Tracking Dot"
                    description="Follow the moving dot across the screen"
                    duration="~30–45 sec"
                    buttonColor="purple"
                    onStart={() => {
                        navigate('/trainings/vision/tracking-dot');
                    }}
                />
                <TrainingCard
                    title="Blinking Prompt"
                    description="Blink when prompted to relax eye muscles"
                    duration="~20–30 sec"
                    buttonColor="purple"
                    onStart={() => onStartTraining('vision')}/>
                <TrainingCard
                    title="Focus Shift"
                    description="Switch focus between near and far objects"
                    duration="~30–40 sec"
                    buttonColor="purple"
                    onStart={() => onStartTraining('vision')}/>
                <TrainingCard
                    title="Grid Tracking"
                    description="Track the moving shape across a grid"
                    duration="~45-60 sec"
                    buttonColor="purple"
                    onStart={() => onStartTraining('vision')}/>
                <TrainingCard
                    title="Color Blink"
                    description="Blink only when a target color appears"
                    duration="~20–30 sec"
                    buttonColor="purple"
                    onStart={() => onStartTraining('vision')}/>
            </div>
        </>
    )
}

export default Vision;