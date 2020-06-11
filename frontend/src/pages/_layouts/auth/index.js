import React from 'react';
import Proptypes from 'prop-types';

import { Wrapper, Content } from './styles';

function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default AuthLayout;

AuthLayout.propTypes = {
  children: Proptypes.element.isRequired,
};
