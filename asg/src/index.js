import React from 'react';
import ReactDOM from 'react-dom';
import Route from './Components/Router'
import Store from './Store'
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={Store}>
    <Route />
  </Provider>,
  document.getElementById('root')
);

