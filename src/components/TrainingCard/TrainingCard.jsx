import './TrainingCard.css';
import Button from '../Button/Button.jsx';

function TrainingCard({title, description, duration, buttonColor, onStart}) {
    return (
        <div className="training-card">
            <h3 className="training-title">{title}</h3>
            <p className="training-description">{description}</p>
            <p className="training-duration">{duration}</p>
            <Button
                name="Start"
                color={buttonColor}
                onClick={onStart}
            />
        </div>
    );
}

export default TrainingCard;
