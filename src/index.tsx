import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app';
import 'typeface-roboto';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme(
    {
        palette: {
            primary: {
                light: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                dark: '#01579b',
                main: '#0d47a1',
                contrastText: '#bbdefb'
            }
        },
        typography: {
            useNextVariants: true
        }
    }
);

ReactDOM.render(
    (
        <ThemeProvider theme={theme}>
            <AppComponent framework='React - HTML Canvas' />
        </ThemeProvider>
    ),
    document.getElementById('root')
);
