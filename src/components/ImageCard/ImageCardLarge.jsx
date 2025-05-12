import './ImageCard.css';
import Button from "../Button/Button";

function ImageCardLarge({
                            title,
                            description,
                            image,
                            buttonText = 'Start',
                            buttonColor = 'purple',
                            onClick,
                        }) {

    return (
        <div className="image-card-large">
            <div className="card-content">
                <div className="card-text">
                    <h3>{title}</h3>
                    {description.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
                <div className="card-button">
                    <Button name={buttonText} color={buttonColor} onClick={onClick}/>
                </div>
            </div>
            <div className="card-image-large"><img src={image} alt="" className="card-image"/></div>
        </div>
    );
}

export default ImageCardLarge;