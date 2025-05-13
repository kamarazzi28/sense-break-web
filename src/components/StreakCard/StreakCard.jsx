import './StreakCard.css';

function StreakCard({streakCount}) {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const today = new Date().getDay(); // Sunday = 0
    const correctedToday = today === 0 ? 6 : today - 1;

    const completedDays = [];
    for (let i = 0; i < streakCount; i++) {
        const day = (correctedToday - i + 7) % 7;
        completedDays.unshift(day);
    }

    return (
        <div className="streak-card">
            <img src="/images/figures/fire.png" alt="streak" className="streak-icon"/>

            <div className="streak-text">
                <h3>{streakCount}-day streak!</h3>
                <p>Keep doing great</p>
            </div>

            <div className="streak-days">
                {days.map((label, index) => {
                    const isChecked = completedDays.includes(index);
                    const iconSrc = isChecked
                        ? '/images/figures/check_checked.svg'
                        : '/images/figures/check_unchecked.svg';

                    return (
                        <div key={index} className="streak-day">
                            <span className="day-label">{label}</span>
                            <img src={iconSrc} alt={isChecked ? 'checked' : 'unchecked'}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StreakCard;
