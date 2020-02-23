import React from 'react';
import MainLayout from './src/components/layout/MainLayout';
import PropTypes from 'prop-types';
import { AppProvider } from './src/context/appContext';

export const wrapRootElement = ({ element, props }) => {
  return (
    <MainLayout {...props}>
      <AppProvider {...props}>{element}</AppProvider>
    </MainLayout>
  );
};

// export const wrapRootElement = ({ element, props }) => {
//   return <AppProvider {...props}>{element}</AppProvider>;
// };

// wrapPageElement.propTypes = {
//   props: PropTypes.object,
//   element: PropTypes.func,
// };

wrapRootElement.propTypes = {
  props: PropTypes.object,
  element: PropTypes.func,
};
