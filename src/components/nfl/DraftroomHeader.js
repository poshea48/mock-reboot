import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import nflTeams from '../../data/nflTeams';

const Container = styled.header`
  display: flex;
  width: 100%;
  text-transform: uppercase;
  text-align: left;
  hgroup {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1em;
    height: 60px;
  }
  h2 {
    font-weight: 900;
    font-size: 2em;
    color: ${p => p.theme.colors.teamColors[p.team].primary};
  }
  h3 {
    font-size: 1em;
    align-self: flex-start;
    color: ${p => p.theme.colors.teamColors[p.team].secondary1};
  }

  h4 {
    align-self: center;
  }
  @media (max-width: 500px) {
    hgroup {
      flex-direction: column;
    }
  }
  @media (max-width: 350px) {
    h2 {
      font-size: 1.6em;
    }
    h3 {
      font-size: 0.8em;
    }
  }
`;
const DraftroomHeader = ({ myTeam }) => {
  return (
    <Container team={myTeam}>
      <hgroup>
        <h3>{nflTeams[myTeam].city}</h3>
        <h2>{nflTeams[myTeam].name}</h2>
      </hgroup>
    </Container>
  );
};

DraftroomHeader.propTypes = {
  myTeam: PropTypes.string.isRequired,
};

export default DraftroomHeader;
