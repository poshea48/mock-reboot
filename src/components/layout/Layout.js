import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import { Global, css } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'
import theme from '../../../config/theme'
// import Header from '../header'
import SEO from './SEO'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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
        <SEO />
        {children}
      </Fragment>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
