import '../index.css';
import Title from "../components/Title/Title.jsx";
import StreakCard from "../components/StreakCard/StreakCard.jsx";
import StatsGrid from "../components/StatsGrid/StatsGrid.jsx";
import {listenToUserStats} from "../firebaseHelpers.js";
import {useEffect, useState} from "react";

function Progress() {
    const [stats, setStats] = useState(null);

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
            {stats && (
                <div className="streak-wide">
                    <StreakCard streakCount={stats.streak?.current || 0} noShadow={true}/>
                    <div className="streak-values">
                        <div className="stat-wide-card">
                            <p className="label">Current Streak</p>
                            <p className="value">{stats.streak?.current || 0} {stats.streak?.current === 1 ? 'day' : 'days'}</p>
                        </div>
                        <div className="stat-wide-card">
                            <p className="label">Longest Streak</p>
                            <p className="value">{stats.streak?.longest || 0} {stats.streak?.longest === 1 ? 'day' : 'days'}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Progress;
