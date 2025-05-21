import '../index.css';
import Title from "../components/Title/Title.jsx";
import ImageCardSmall from "../components/ImageCard/ImageCardSmall.jsx";
import {useNavigate} from "react-router-dom";
import ImageCardLarge from "../components/ImageCard/ImageCardLarge.jsx";
import StreakCard from "../components/StreakCard/StreakCard.jsx";
import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {auth, db} from "../firebase.js";
import {onAuthStateChanged} from 'firebase/auth';

function Dashboard() {
    const navigate = useNavigate();

    const [streakCount, setStreakCount] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setStreakCount(data.streak || 0);
                }
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <>
            <div className="large-image-cards">
                <ImageCardLarge
                    title="It’s Training Time"
                    description={`You're on a ${streakCount}-day streak.\nKeep going to build a healthy habit!`}
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
                <StreakCard streakCount={streakCount}/>
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