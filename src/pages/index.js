import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import SEO from '../components/layout/SEO';
import BackgroundImg from '../components/layout/SplashImg';
import { useAppState } from '../context/appContext';

const colors2 = {
  eerieBlack: '#1c1d21',
  vanDykeBrown: '#634133',
  dodgerBlue: '#2191fb',
  gray: '#bebbbb',
  cadetGrey: '#93a3b1',
};
const Container = styled.div`
  display: flex;
  /* background: ${colors2.vanDykeBrown}; */
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  height: calc((var(--vh, 1vh) * 100));
  text-align: center;
`;

const Title = styled.h1`
  color: ${colors2.dodgerBlue};
  margin-bottom: 0;
  font-family: 'Gill Sans', sans-serif;
  font-size: 3em;
  font-weight: 800;
  text-shadow: 0 10px 5px ${colors2.eerieBlack};
`;

const MainTitle = styled.h1`
  color: ${colors2.gray};
  font-size: 4em;
  font-weight: 700;
  text-shadow: 0 10px 5px ${colors2.eerieBlack};
  margin: 5px 0;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${colors2.dodgerBlue};
  box-shadow: 5px 5px 5px ${colors2.eerieBlack};
  padding: 5px;
  border-radius: 10px;
  width: 180px;
  height: 40px;
  font-size: 0.8rem;
  align-self: center;
  margin: 0.5em;
  transition: all 0.3s ease-in-out;
  color: ${colors2.gray};
  color: #fff;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(p) => (p.disabled ? 'none' : 'auto')};
  font-weight: 900;

  &:disabled {
    background-color: ${colors2.eerieBlack};
    cursor: not-allowed;
    box-shadow: none;
    transform: translateX(2px) translateY(2px);
    a {
      cursor: not-allowed;
      color: ${colors2.cadetGrey};
    }
  }

  &:hover {
    /* box-shadow: none;
    transform: translateX(2px) translateY(2px); */
    text-decoration: underline;
  }
`;
const IndexPage = () => {
  const state = useAppState();
  return (
    <BackgroundImg>
      <Container>
        <Title>Mock Draft</Title>
        <SEO
          title="Home"
          keywords={[
            'Mock Draft',
            'NFL',
            'Fantasy Football',
            'Draft Simulation',
          ]}
        />
        <MainTitle>NFL</MainTitle>
        <LinksContainer>
          {state.isNflSetup ? (
            <StyledLink to="/nfl/draftroom">NFL Draftroom</StyledLink>
          ) : (
            <StyledLink to="/nfl/settings">NFL Draftroom</StyledLink>
          )}
          <StyledLink to="/fantasy/">Fantasy Draftroom</StyledLink>
        </LinksContainer>
        <MainTitle>Fantasy Football</MainTitle>
      </Container>
    </BackgroundImg>
  );
};

export default IndexPage;
