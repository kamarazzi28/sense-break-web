import './Button.css';

function Button({name, color = "purple", onClick}) {
    return (
        <>
            <button
                type="button"
                className={`button ${color}`}
                onClick={onClick}>{name}</button>
        </>
    )
}

export default Button;