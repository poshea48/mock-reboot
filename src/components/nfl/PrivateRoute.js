import React from 'react';
import PropTypes from 'prop-types';
import { useAppState } from '../../context/appContext';

import { navigate } from 'gatsby';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isNflSetup } = useAppState();
  const isBrowser = typeof window !== 'undefined';
  if (
    !isNflSetup &&
    isBrowser &&
    window.location.pathname !== '/nfl/settings'
  ) {
    // If draftroom is not setup, redirect to the settings page.
    navigate('/nfl/settings');
    return null;
  }
  return <Component {...rest} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};
export default PrivateRoute;
