
/**
 * @format
 */
 import React from 'react';
 import ReactDOM from 'react-dom';
 import {AppRegistry} from 'react-native-web';
 import App from './App';
 import { render, screen } from '@testing-library/react';
 import {name as appName} from './app.json';
 import './index.css';
 AppRegistry.registerComponent(appName, () => App);


//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

//render(<App />);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);