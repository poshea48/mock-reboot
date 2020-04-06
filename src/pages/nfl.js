import React from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Settings from '../components/nfl/settings/Settings';
import Draftroom from '../components/nfl/draftroom/Draftroom';
import Results from '../components/nfl/results/Results';
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
    /* background: ${p => p.theme.colors.white.grey}; */
    /* color: black; */
    
    width: 100%;
    height: 50px;
    padding: 0.5em;
    text-align: center;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const NFL = () => {
  const { isNflSetup, isNflFinished } = useAppState();
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

          {isNflFinished && (
            <StyledLink to="/nfl/results" disabled={!isNflSetup}>
              Results
            </StyledLink>
          )}
        </nav>
        <Router>
          <PrivateRoute path="/nfl/draftroom" component={Draftroom} />
          <Settings path="/nfl/settings" default />
          <Results path="/nfl/results" />
        </Router>
        <footer>Created by Paul O&apos;Shea 2020</footer>
      </Container>
    </NFLProvider>
  );
};

export default NFL;
