import '../index.css';

import Title from "../components/Title/Title.jsx";
import ImageCardSmall from "../components/ImageCard/ImageCardSmall.jsx";
import {useNavigate} from "react-router-dom";
import ImageCardLarge from "../components/ImageCard/ImageCardLarge.jsx";
import StreakCard from "../components/StreakCard/StreakCard.jsx";

function Dashboard() {
    const navigate = useNavigate();
    const streak_count = 4;

    return (
        <>
            <div className="large-image-cards">
                <ImageCardLarge
                    title="It’s Training Time"
                    description={`You're on a ${streak_count}-day streak.\nKeep going to build a healthy habit!`}
                    image="/images/girl/girl_with_streak.png"
                    imageStyle={{
                        width: '210px',
                        right: '10px',
                        bottom: '0'
                    }}
                    buttonText="Start Today’s Session"
                    buttonColor="purple"
                    onClick={() => console.log('Start session')}
                />
                <StreakCard streakCount={streak_count}/>
            </div>

            <Title name="Choose training" text=""/>

            <div className="small-image-cards">
                <ImageCardSmall
                    title="Vision"
                    description={'Focus tracking\nand reaction speed'}
                    image="/images/figures/eyes.svg"
                    onClick={() => navigate('/Vision')}
                    buttonColor="purple"
                />
                <ImageCardSmall
                    title="Hearing"
                    description={'Tone recognition\nand precision'}
                    image="/images/figures/ear.svg"
                    onClick={() => navigate('/Hearing')}
                    buttonColor="orange"
                />
            </div>
        </>
    )
}

export default Dashboard;