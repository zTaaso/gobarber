import React, { forwardRef } from 'react';
import Proptypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, TInput } from './styles';

const Input = ({ style, icon, ...rest }, ref) => {
  return (
    <Container style={style}>
      {icon && (
        <MaterialIcons name={icon} size={20} color="rgba(255,255,255, 0.6)" />
      )}
      <TInput {...rest} ref={ref} />
    </Container>
  );
};

export default forwardRef(Input);

Input.propTypes = {
  icon: Proptypes.string,
  style: Proptypes.oneOfType([Proptypes.object, Proptypes.array]),
};

Input.defaultProps = {
  style: {},
  icon: null,
};
