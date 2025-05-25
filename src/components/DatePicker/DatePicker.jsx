// noinspection JSValidateTypes

import React from 'react';
import {DatePicker as MUIDatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale';
import '../InputFields/Input.css';

function DatePicker({label, value, onChange, error, helper, disabled = false, locale = 'en'}) {
    dayjs.locale(locale);

    return (
        <div className={`input-wrapper outlined ${disabled ? 'disabled' : ''} ${error ? 'has-error' : ''}`}>
            {label && <label className="input-label">{label}</label>}

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <MUIDatePicker
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    format="DD/MM/YYYY"
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error || helper,
                            InputProps: {
                                className: 'input-field',
                                style: {
                                    height: '46.67px',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    paddingRight: '12px',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    boxSizing: 'border-box',
                                },
                            },
                            inputProps: {
                                style: {
                                    padding: '12px 16px',
                                },
                            },
                            sx: {
                                '& .MuiOutlinedInput-root': {
                                    height: '46.67px',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none !important'
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent !important',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent !important',

                                    },
                                    '&::before, &::after': {
                                        border: 'none !important',
                                        outline: 'none !important',
                                    },
                                    boxShadow: 'none',
                                },
                                '& fieldset': {
                                    border: 'none !important',
                                },
                            }

                        }
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}

export default DatePicker;
