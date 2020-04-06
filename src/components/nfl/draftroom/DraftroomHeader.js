import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import nflTeams from '../../../data/nflTeams';

const HGroup = styled.hgroup`
  display: flex;
  width: 100%;
  text-transform: uppercase;
  text-align: left;
  min-height: 55px;
  flex-direction: column;
  align-items: center;
  margin-right: 1em;
  overflow: hidden;
  h2 {
    font-weight: 900;
    font-size: 2em;
    color: ${p => p.theme.colors.teamColors[p.team].primary};
    align-self: flex-start;
  }
  h3 {
    font-size: 1em;
    align-self: flex-start;
    color: ${p =>
      p.altColor
        ? p.theme.colors.teamColors[p.team].secondary2
        : p.theme.colors.teamColors[p.team].secondary1};
  }

  h4 {
    align-self: center;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;

    h2 {
      font-size: 1.8em;
    }
    h3 {
      font-size: 1em;
    }
  }
  @media screen and (max-width: 450px) {
    min-height: 50px;
  }
  @media screen and (max-width: 350px) {
    min-height: 45px;

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
    <HGroup team={myTeam} altColor={myTeam === 'IND'}>
      <h3>{nflTeams[myTeam].city}</h3>
      <h2>{nflTeams[myTeam].name}</h2>
    </HGroup>
  );
};

DraftroomHeader.propTypes = {
  myTeam: PropTypes.string.isRequired,
};

export default DraftroomHeader;
