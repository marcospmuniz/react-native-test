/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src'; // vai importar o ./src/index.js
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
