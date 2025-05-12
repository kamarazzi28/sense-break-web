import './ImageCard.css';
import Button from "../Button/Button";

function ImageCard({
                       title,
                       description,
                       duration,
                       image,
                       buttonText = 'Start',
                       buttonColor = 'orange',
                       onClick,
                       large = false
                   }) {
    return (
        <div className={`image-card ${large ? 'large' : 'small'}`}>
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                {duration && <p className="duration">{duration}</p>}
                <Button name={buttonText} color={buttonColor} onClick={onClick}/>
            </div>
            <img src={image} alt="" className="card-image"/>
        </div>
    );
}

export default ImageCard;
