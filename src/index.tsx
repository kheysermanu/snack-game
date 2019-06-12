import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app';
import 'typeface-roboto';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducersApp from 'reducers';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { StatComponent } from 'stat';
import * as Constants from './constants';

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
const routing = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <AppComponent framework='React - HTML Canvas' />
                <Route path={Constants.STATS_URL} component={StatComponent} />
            </Router>
        </ThemeProvider>
    </Provider>
);
ReactDOM.render(routing, document.getElementById('root'));
