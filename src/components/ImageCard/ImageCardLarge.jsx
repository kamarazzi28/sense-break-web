import './ImageCard.css';
import Button from "../Button/Button";

function ImageCardLarge({
                            title,
                            description,
                            image,
                            buttonText = 'Start',
                            buttonColor = 'purple',
                            onClick,
                            imageStyle = {},
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
            <div><img src={image} alt="" className="card-image" style={imageStyle}/></div>
        </div>
    );
}

export default ImageCardLarge;