import '../index.css';
import Title from "../components/Title/Title.jsx";
import StreakCard from "../components/StreakCard/StreakCard.jsx";

function Progress() {
    return (
        <>
            <Title
                name="Your Progress"
                text={`Great job staying consistent! 
                \nKeep going and turn your short sessions into a healthy daily habit.`}
            />
            <StreakCard/>
        </>
    )
}

export default Progress;