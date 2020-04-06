import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import PlayersInfo from '../../../data/players';
import { useNflState } from '../../../context/nflContext';

const Container = styled.div`
  flex: 1 auto;
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DraftedList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Selection = styled.li`
  display: flex;
  padding: 0.5em;
  height: 40px;
  @media screen and (max-width: 400px) {
    padding: 0.25em;
  }
  span {
    display: inline-block;
    height: 100%;
    align-self: center;
  }
  .pick {
    width: 60px;
    font-size: 15px;
    @media screen and (max-width: 500px) {
      font-size: 12px;
      width: 50px;
    }
  }
  .team {
    width: 50px;
    color: ${p => p.theme.colors.teamColors[p.team].primary};
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 800;
    padding: 0 0.25em;
    @media screen and (max-width: 500px) {
      font-size: 14px;
      width: 40px;
      padding: 0;
    }
    @media screen and (max-width: 450px) {
      font-size: 12px;
      font-weight: 700;
      width: 30px;
    }

    @media screen and (max-width: 400px) {
      font-size: 10px;
    }
  }
  .player {
    flex: 1 auto;
    text-align: left;
    font-weight: 800;
    color: ${p => p.theme.colors.teamColors[p.team].primary};
    text-transform: uppercase;
    padding: 0 1em;
    .pos {
      font-size: 14px;
      @media screen and (max-width: 400px) {
        font-size: 10px;
      }
    }
    @media screen and (max-width: 550px) {
      font-size: 16px;
      padding: 0 0.25em;
    }
    @media screen and (max-width: 400px) {
      font-size: 12px;
      padding: 0;
    }
  }
  .sch {
    /* width: 120px; */
    font-size: 12px;
    text-transform: uppercase;
    text-align: right;
    @media screen and (max-width: 500px) {
      font-size: 10px;
    }
  }
`;

const OverallResults = ({ round }) => {
  const {
    state: { draftOrder },
  } = useNflState();
  const players = draftOrder[round].map((selection, i) => {
    let playerDrafted = PlayersInfo[selection.result];
    return (
      <Selection key={selection.overallPick} team={selection.team}>
        <span className="pick">
          {i + 1}({selection.overallPick})
        </span>
        <span className="team">{selection.team}</span>
        <span className="player">
          {selection.result}, <span className="pos">{playerDrafted.pos}</span>
        </span>
        <span className="sch">{playerDrafted.sch}</span>
      </Selection>
    );
  });
  return (
    <Container>
      <DraftedList>{players}</DraftedList>
    </Container>
  );
};

OverallResults.propTypes = {
  round: PropTypes.number.isRequired,
};
export default OverallResults;
