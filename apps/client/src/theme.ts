import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    typography: {
        fontFamily: 'Lunasima',
    },
    palette: {
        primary: {
            main: '#8D90CA',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
