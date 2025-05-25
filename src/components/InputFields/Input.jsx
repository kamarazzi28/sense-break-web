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
                   variant = 'outlined',
                   options = []
               }) {
    const wrapperClass = `input-wrapper ${variant} ${disabled ? 'disabled' : ''} ${error ? 'has-error' : ''}`;

    return (
        <div className={wrapperClass}>
            {label && <label className="input-label">{label}</label>}
            {helper && <div className="input-helper-text">{helper}</div>}

            {type === 'select' ? (
                <select
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="input-field"
                >
                    <option value="" disabled hidden>{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="input-field"
                />
            )}

            {error && <div className="input-error-text">{error}</div>}
        </div>
    );
}

export default Input;
