import './Input.css';

function Input({
                   type = 'text',
                   value,
                   onChange,
                   label,
                   placeholder,
                   error,
                   helper,
                   disabled = false,
                   variant = 'outlined', // 'outlined', 'filled', 'standard'
               }) {
    return (
        <div className={`input-wrapper ${variant} ${disabled ? 'disabled' : ''} ${error ? 'has-error' : ''}`}>
            {label && <label className="input-label">{label}</label>}
            {helper && <div className="input-helper-text">{helper}</div>}

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="input-field"
            />

            {error && <div className="input-error-text">{error}</div>}
        </div>
    );
}

export default Input;
