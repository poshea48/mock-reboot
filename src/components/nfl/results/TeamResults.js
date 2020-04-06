import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import nflTeams from '../../../data/nflTeams';
import { useNflState } from '../../../context/nflContext';
import TeamFilter from '../../styles/TeamFilter';
import DraftedPlayersContent from '../../styles/DraftedPlayersContent';

const Container = styled.div`
  flex: 1 auto;
  max-width: 750px;
  padding-top: 0.5em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Drafted = styled(DraftedPlayersContent)`
  width: 100% !important;
  max-width: none;
`;

const TeamResults = ({ round }) => {
  const {
    state: { results, myTeam },
  } = useNflState();
  const [team, changeTeam] = useState(myTeam);
  const players = results[team]
    .filter(s => s.round === round)
    .map(player => (
      <tr key={player.pick}>
        <td>{player.pick}</td>
        <td>{player.name}</td>
        <td>{player.pos}</td>
      </tr>
    ));
  const handleTeamChange = e => {
    changeTeam(e.target.value);
  };
  return (
    <Container>
      <Drafted team={team}>
        <TeamFilter team={team}>
          <h2>{nflTeams[team].name} Drafted</h2>
          <div className="select-wrapper">
            <label htmlFor="filterBy">
              <select
                name="filterBy"
                value={team}
                onChange={handleTeamChange}
                onBlur={e => e.target.blur()}
              >
                {Object.keys(nflTeams).map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </TeamFilter>
        <table>
          <thead>
            <tr>
              <th>pick</th>
              <th>player</th>
              <th>position</th>
            </tr>
          </thead>
          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan="3">No Selections</td>
              </tr>
            ) : (
              players
            )}
          </tbody>
        </table>
      </Drafted>
    </Container>
  );
};

TeamResults.propTypes = {
  round: PropTypes.number.isRequired,
};
export default TeamResults;
