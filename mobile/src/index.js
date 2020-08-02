import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

import App from './App';
import { persistor, store } from './store';

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      </PersistGate>
    </Provider>
  );
};

export default Index;
