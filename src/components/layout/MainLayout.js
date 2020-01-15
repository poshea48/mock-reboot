import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import theme from '../../../config/theme';
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

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Global
          styles={css`
            *,
            *:before,
            *:after {
              box-sizing: inherit;
            }
            html {
              text-rendering: optimizeLegibility;
              overflow-x: hidden;
              box-sizing: border-box;
              -ms-overflow-style: scrollbar;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              font-family: sans-serif;
              -webkit-text-size-adjust: 100%;
            }
            html,
            body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
            }

            body {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
            article,
            aside,
            details,
            figcaption,
            figure,
            footer,
            header,
            main,
            menu,
            nav,
            section,
            summary {
              display: block;
            }
            audio,
            canvas,
            progress,
            video {
              display: inline-block;
            }
            audio:not([controls]) {
              display: none;
              height: 0;
            }
            progress {
              vertical-align: baseline;
            }
            [hidden],
            template {
              display: none;
            }
            a {
              color: ${theme.colors.black.blue};
              transition: color 0.5s;
              text-decoration: none;
            }
            a:hover {
              text-decoration: none;
              color: ${theme.colors.primary.base};
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
