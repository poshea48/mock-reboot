import React from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Settings from '../components/nfl/Settings';
import Draftroom from '../components/nfl/Draftroom';
import { NFLProvider } from '../context/nflContext';
import SEO from '../components/layout/SEO';
import PrivateRoute from '../components/nfl/PrivateRoute';
import { useAppState } from '../context/appContext';

const colors = {
  brown: '#D1AB98',
  black: '#232323',
  gray: '#476A6F',
  teal: '#BFDBDD',
  white: '#F7F7F7',
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  width: 100vw;
  overflow-x: hidden;
  nav {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em 0;
    display: flex;
    justify-content: space-around;
    align-self: flex-end;
    height: 40px;
    span,
    a {
      margin: 0 1em;
    }

    span {
      &:last-of-type {
        margin: 0 0 0 1em;
      }
    }
    @media screen and (max-width: 800px) {
      span,
      a {
        margin: 0 0.5em;
        font-size: 16px;
      }
      span {
        &:last-of-type {
          margin: 0 0 0 0.5em;
        }
      }
    }
  }
  footer {
    display: flex;
    width: 100%;
    height: 40px;
    padding: 0.5em;
    text-align: center;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const NFL = () => {
  const { isNflSetup } = useAppState();
  return (
    <NFLProvider>
      <Container id="page-container">
        <SEO title="NFL Mock Draft" />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/nfl/settings">Settings</Link>
          <StyledLink to="/nfl/draftroom" disabled={!isNflSetup}>
            Draftroom
          </StyledLink>
        </nav>
        <Router>
          <PrivateRoute path="/nfl/draftroom" component={Draftroom} />
          <Settings path="/nfl/settings" default />
        </Router>
        <footer>Created by Paul O&apos;Shea 2020</footer>
      </Container>
    </NFLProvider>
  );
};

export default NFL;
