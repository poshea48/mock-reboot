import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNflState } from '../../../context/nflContext';
import nflTeams from '../../../data/nflTeams';
import useModal from '../../../customHooks/useModal';
import ToggleButton from '../../ToggleButton';
import DraftedPlayersContent from '../../styles/DraftedPlayersContent';
import TeamFilter from '../../styles/TeamFilter';

const Container = styled.div`
  display: block;
  flex: 0.5 auto;
  max-width: 550px;
  @media screen and (max-width: 800px) {
    flex: none;
  }
`;

const Content = styled(DraftedPlayersContent)`
  @media screen and (max-width: 800px) {
    position: absolute;
    top: 0;
    right: 1em;
    background: ${p => p.theme.colors.teamColors[p.team].secondary1};
    max-width: 500px;
    min-width: 0;
    width: ${({ open }) => (open ? '100%' : '0px')};
    z-index: ${({ open }) => (open ? '20' : '-5')};
    transition: 0.5s ease-in-out;
    transform: ${({ open }) => (open ? 'translateX(1em)' : 'translateX(100%)')};
  }
`;

const TeamNeedsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ul {
    flex: 1 auto;
    justify-content: flex-start;
    display: flex;
    li {
      margin: 0 0.25em;
    }
  }
  .label {
    text-transform: uppercase;
    font-size: 12px;
  }
  .needs {
    text-transform: uppercase;
    font-size: 14px;
  }
`;

const TeamSelectedPlayers = () => {
  const { state } = useNflState();
  const [selectedTeam, changeSelectedTeam] = useState(state.myTeam);

  const { open, openModal, closeModal } = useModal();
  const handleTeamChange = e => {
    changeSelectedTeam(e.target.value);
  };
  const players =
    state.results[selectedTeam].length === 0 ? (
      <tr>
        <td colSpan="3">No Selections</td>
      </tr>
    ) : (
      state.results[selectedTeam].map(player => {
        return (
          <tr key={player.pick}>
            <td>{player.pick}</td>
            <td>{player.name}</td>
            <td>{player.pos}</td>
          </tr>
        );
      })
    );
  const teamNeeds = Object.keys(state.teamNeeds[selectedTeam])
    .sort(
      (a, b) =>
        state.teamNeeds[selectedTeam][b].wt -
        state.teamNeeds[selectedTeam][a].wt
    )
    .map((n, i) => {
      if (i === 9) {
        return (
          <li key={n} className="needs">
            {n}
          </li>
        );
      } else {
        return (
          <li key={n} className="needs">
            {n},
          </li>
        );
      }
    });

  return (
    <Container>
      <ToggleButton
        open={open}
        openModal={openModal}
        closeModal={closeModal}
        team={selectedTeam}
      />
      <Content open={open} team={selectedTeam}>
        <TeamFilter team={selectedTeam}>
          <h2>{nflTeams[selectedTeam].name} Drafted</h2>
          <div className="select-wrapper">
            <label htmlFor="filterBy">
              <select
                name="filterBy"
                value={selectedTeam}
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
        <TeamNeedsList>
          <span className="label">Adjusted Team Needs:</span>
          <ul>{teamNeeds}</ul>
        </TeamNeedsList>
        <table>
          <thead>
            <tr>
              <th>pick</th>
              <th>player</th>
              <th>position</th>
            </tr>
          </thead>
          <tbody>{players}</tbody>
        </table>
      </Content>
    </Container>
  );
};

export default TeamSelectedPlayers;
