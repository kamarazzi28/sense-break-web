import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#7E4AFF',
        },
        secondary: {
            main: '#FEA329',
        },
        background: {
            white: '#FFFFFF',
        },
        text: {
            primary: '#000000',
            secondary: '#625B71',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;
