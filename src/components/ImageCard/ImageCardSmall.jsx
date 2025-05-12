import './ImageCard.css';
import Button from "../Button/Button";

function ImageCardSmall({
                            title,
                            description,
                            duration,
                            image,
                            buttonText = 'Start',
                            buttonColor = 'purple',
                            onClick,
                        }) {

    return (
        <div className="image-card-small">
            <div className="card-content">
                <div className="card-text">
                    <h3>{title}</h3>
                    {description.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                    {duration && <p className="duration">{duration}</p>}
                </div>
                <div className="card-image-small"><img src={image} alt="" className="card-image"/></div>
            </div>

            <div className="card-button">
                <Button name={buttonText} color={buttonColor} onClick={onClick}/>
            </div>
        </div>
    );
}

export default ImageCardSmall;
