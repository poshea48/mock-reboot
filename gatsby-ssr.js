import React from 'react';
import MainLayout from './src/components/layout/MainLayout';
import PropTypes from 'prop-types';

export const wrapPageElement = ({ element, props }) => {
  return <MainLayout {...props}>{element}</MainLayout>;
};

wrapPageElement.propTypes = {
  props: PropTypes.object,
  element: PropTypes.func,
};
