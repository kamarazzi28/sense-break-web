import './Button.css';

function Button({name, color = 'purple', type = 'button', onClick}) {
    return (
        <button
            type={type}
            className={`button ${color}`}
            onClick={onClick}
        >
            {name}
        </button>
    );
}

export default Button;
