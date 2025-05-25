import React from 'react';
import '../InputFields/Input.css';
import {FormControl, FormHelperText, MenuItem, Select} from '@mui/material';

function CustomSelect({
                          label = '',
                          value,
                          onChange,
                          options,
                          error = false,
                          required = false,
                          disabled = false,
                          helperText = '',
                          minWidth = 140,
                          readOnly = false,
                          placeholder = 'Select...',
                          variant
                      }) {
    return (
        <div className="input-wrapper">
            {label && <div className="input-label">{label}</div>}

            <FormControl
                required={required}
                error={error}
                disabled={disabled}
                sx={{minWidth, height: 40}}
                fullWidth
            >
                <Select
                    value={value}
                    onChange={onChange}
                    inputProps={readOnly ? {readOnly: true} : {}}
                    renderValue={(selected) => {
                        if (!selected) {
                            return <span style={{color: '#909090'}}>{placeholder}</span>;
                        }
                        return options.find(opt => opt.value === selected)?.label;
                    }}
                    displayEmpty
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 200,
                                marginTop: 4,
                            },
                        },
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        getContentAnchorEl: null,
                    }}
                    sx={{
                        borderRadius: '8px',
                        height: variant === 'input' ? '46.67px' : '40px',
                        color: variant === 'input' ? '#1E1E1E' : '#625B71',
                        backgroundColor: 'white',
                        fontSize: variant === 'input' ? '16px' : '14px',
                        fontWeight: variant === 'input' ? 500 : 'normal',
                        paddingRight: variant === 'input' ? '40px' : 'inherit',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '2px',
                            borderColor: variant === 'input' ? '#65558F' : '#625B71'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#65558F'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#7b3ff2',
                            borderWidth: '2px'
                        },
                        '& .MuiSelect-icon': {
                            cursor: 'pointer',
                        }
                    }}
                >
                    <MenuItem value="" disabled>{placeholder}</MenuItem>
                    {options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>

                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        </div>
    );
}

export default CustomSelect;
