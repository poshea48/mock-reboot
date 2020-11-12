import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import theme from '../../../config/theme';
import globalStyles from './globalStyles';
// import Header from '../header'
import SEO from './SEO';

const MainLayout = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const handleResize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Global
          styles={css`
            ${globalStyles()}
            a {
              color: ${theme.colors.black.blue};
            }

            h1 {
              font-family: ${theme.fontFamily.heading};
            }
          `}
        />
        <SEO title={site.siteMetadata.title} />
        {children}
      </Fragment>
    </ThemeProvider>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
