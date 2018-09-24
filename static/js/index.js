var React = require('react');
var ReactDOM = require('react-dom');
import { Provider } from 'react-redux'
import ShadowCoach from './components/shadowCoach.js';
import store from './stores/index.js';

ReactDOM.render(
  <Provider store={store}>
    <ShadowCoach/>
  </Provider>,
  document.getElementById('content')
);
