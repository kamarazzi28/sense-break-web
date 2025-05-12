import '../../index.css';

import TrainingCard from "../../components/TrainingCard/TrainingCard.jsx";
import Title from "../../components/Title/Title.jsx";

function Vision() {
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
                    onStart={() => console.log('Tracking Dot started')}/>
                <TrainingCard
                    title="Blinking Prompt"
                    description="Blink when prompted to relax eye muscles"
                    duration="~20–30 sec"
                    buttonColor="purple"
                    onStart={() => console.log('Blinking Prompt started')}/>
                <TrainingCard
                    title="Focus Shift"
                    description="Switch focus between near and far objects"
                    duration="~30–40 sec"
                    buttonColor="purple"
                    onStart={() => console.log('Focus Shift started')}/>
                <TrainingCard
                    title="Grid Tracking"
                    description="Track the moving shape across a grid"
                    duration="~45-60 sec"
                    buttonColor="purple"
                    onStart={() => console.log('Grid Tracking started')}/>
                <TrainingCard
                    title="Color Blink"
                    description="Blink only when a target color appears"
                    duration="~20–30 sec"
                    buttonColor="purple"
                    onStart={() => console.log('Color Blink started')}/>
            </div>
        </>
    )
}

export default Vision;