import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from './theme';
import {BrowserRouter} from 'react-router-dom';
import '@fontsource/roboto';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
