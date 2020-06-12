import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

import store from '~/store';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

function RouteWrapper({ component: Component, isPrivate, ...rest }) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default RouteWrapper;

RouteWrapper.propTypes = {
  isPrivate: Proptypes.bool,
  component: Proptypes.oneOfType([Proptypes.element, Proptypes.func])
    .isRequired,
};
RouteWrapper.defaultProps = {
  isPrivate: false,
};
