import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app';
import 'typeface-roboto';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducersApp from 'reducers';

const theme = createMuiTheme(
    {
        palette: {
            primary: {
                light: 'white',
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

const store = createStore(reducersApp);

ReactDOM.render(
    (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AppComponent framework='React - HTML Canvas' />
            </ThemeProvider>
        </Provider>
    ),
    document.getElementById('root')
);
