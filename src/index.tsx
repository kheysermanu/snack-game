import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './app';
import 'typeface-roboto';

ReactDOM.render(
    <AppComponent compiler='TSX' framework='React+Canvas' />,
    document.getElementById('root')
);
