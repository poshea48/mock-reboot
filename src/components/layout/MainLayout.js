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

  useEffect(() => {
    if (typeof window == 'undefined') return;
    window.addEventListener('resize', setVh);
    setVh();
    return () => window.removeEventListener('resize', setVh);

    //************************** */
    function setVh() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Global
          styles={css`
            ${globalStyles()}
            a {
              color: ${theme.colors.black.blue};
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
