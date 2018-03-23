import React from 'react';
import { hot } from 'react-hot-loader';
import styles from './app.scss';

const App = () => <div className={styles.app}>Hello World!</div>;

export default hot(module)(App);
