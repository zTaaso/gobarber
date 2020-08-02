import React from 'react';
import { YellowBox } from 'react-native';
import { useSelector } from 'react-redux';

import Routes from './routes';

// import { Container } from './styles';

YellowBox.ignoreWarnings(['']);

const App = () => {
  const signed = useSelector((state) => state.auth.signed);

  return <Routes signed={false} />;
};

export default App;
