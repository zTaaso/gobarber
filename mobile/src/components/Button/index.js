import React from 'react';
import { ActivityIndicator } from 'react-native';
import Proptypes from 'prop-types';
import { Container, Text } from './styles';

const Button = ({ children, loading, ...rest }) => {
  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="small" colo="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
};

export default Button;

Button.propTypes = {
  children: Proptypes.string.isRequired,
  loading: Proptypes.bool,
};

Button.defaultProps = {
  loading: false,
};
