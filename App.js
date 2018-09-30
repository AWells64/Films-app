import React from 'react';
import RootNavigator from './navigation';
import { Provider } from 'react-redux';
import store from './data/store';

const App = () => (
  <Provider store={ store }>
    <RootNavigator />
  </Provider>
);


export default App;
