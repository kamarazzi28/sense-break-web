import './IconButton.css';

function IconButton({type = 'button', children, onClick, icon, className = ''}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`icon-button ${className}`}
        >
            {children}
            {icon}
        </button>
    );
}

export default IconButton;
