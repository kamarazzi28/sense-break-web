import '../index.css';
import Title from "../components/Title/Title.jsx";
import StreakCard from "../components/StreakCard/StreakCard.jsx";
import StatsGrid from "../components/StatsGrid/StatsGrid.jsx";
import {getUserStats, listenToUserStats} from "../firebaseHelpers.js";
import {useEffect, useState} from "react";

function Progress() {
    const [stats, setStats] = useState(null);
    const [streakCount, setStreakCount] = useState(0);

    useEffect(() => {
        // Load stats including streak
        getUserStats().then(stats => {
            if (stats && typeof stats.streak === 'number') {
                setStreakCount(stats.streak);
            }
        });
    }, []);

    useEffect(() => {
        const unsubscribe = listenToUserStats((updatedStats) => {
            setStats(updatedStats);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <Title
                name="Your Progress"
                text={`Great job staying consistent! 
                \nKeep going and turn your short sessions into a healthy daily habit.`}
            />
            {stats && <StatsGrid stats={stats}/>}
            <div className="streak-wide">
                <StreakCard streakCount={streakCount} noShadow={true}/>
            </div>
        </>
    );
}

export default Progress;
