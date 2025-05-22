import React from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';

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
                          placeholder = 'Select...'
                      }) {
    return (
        <FormControl
            required={required}
            error={error}
            disabled={disabled}
            sx={{minWidth, height: 40}}
        >
            {label && <InputLabel>{label}</InputLabel>}
            <Select
                value={value}
                onChange={onChange}
                inputProps={readOnly ? {readOnly: true} : {}}
                displayEmpty
                label={label}
                sx={{
                    borderRadius: '8px',
                    height: '40px',
                    color: '#625B71',
                    backgroundColor: 'white',
                    fontSize: '14px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '2px',
                        borderColor: '#625B71',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#625B71',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#7b3ff2',
                        borderWidth: '2px',
                    },
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
    );
}

export default CustomSelect;
