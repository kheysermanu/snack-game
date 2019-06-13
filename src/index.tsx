import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app';
import 'typeface-roboto';
import { ThemeProvider } from '@material-ui/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import reducersApp from 'reducers/index';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import StatComponent  from './stat';
import * as Constants from './constants';
import FirstComponent from './firstComponent';
import thunk from 'redux-thunk';

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

const store = createStore(reducersApp,applyMiddleware(thunk));
const getRootComponent = () => (<AppComponent framework='React - HTML Canvas' />);
const routing = (
    <Provider store={store}>
        <Router>
            <ThemeProvider theme={theme}>
                <Route path={Constants.GAME_URL} component={FirstComponent} />
                <Route path={Constants.STATS_URL} component={StatComponent} />
                <Route path={Constants.ROOT_URL} component={getRootComponent} />
            </ThemeProvider>
        </Router>
    </Provider>
);
ReactDOM.render(routing, document.getElementById('root'));
