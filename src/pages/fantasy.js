import React from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
// import { NFLProvider } from '../context/nflContext';
import Draftroom from '../components/fantasy/draftroom/Draftroom';

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
  /* min-height: 100vh; */
  padding: 0 1em;
  /* overflow: hidden; */
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

const StyledRouter = styled(Router)`
  height: calc(100vh - 80px);
`;

// const Draftroom = () => (
//   <div style={{ marginTop: '5em' }}>
//     <h1 style={{ textAlign: 'center' }}>
//       Fantasy Draftroom Under Construction
//     </h1>
//   </div>
// );

const Fantasy = () => {
  return (
    <Container>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/nfl/settings">NFL Setup</Link>
        <span>Profile</span>
        <span>Sign in</span>
      </nav>
      <StyledRouter>
        <Draftroom path="/fantasy/draftroom" default />
      </StyledRouter>
      <footer>Created by Paul O&apos;Shea 2020</footer>
    </Container>
  );
};

export default Fantasy;
