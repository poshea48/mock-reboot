import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNflState } from '../../context/nflContext';
import nflTeams from '../../data/nflTeams';
import useModal from '../../customHooks/useModal';
import ToggleButton from '../ToggleButton';

const Container = styled.div`
  display: block;
  span {
    @media screen and (min-width: 801px) {
      display: none;
    }
  }
`;

const Content = styled.div`
  display: flex;
  padding: 1em;
  overflow-y: scroll;
  flex-direction: column;
  flex-basis: 500px;
  color: ${p => p.theme.colors.teamColors[p.team].primary};
  height: 100%;
  table {
    th,
    td {
      text-align: center;
    }
  }
  @media screen and (max-width: 800px) {
    position: absolute;
    top: 0;
    right: 1em;
    background: ${p => p.theme.colors.teamColors[p.team].secondary1};
    max-width: 500px;
    width: ${({ open }) => (open ? '100%' : '0px')};
    z-index: ${({ open }) => (open ? '20' : '-5')};
    transition: 0.5s ease-in-out;
    transform: ${({ open }) => (open ? 'translateX(1em)' : 'translateX(100%)')};
  }
`;

const TeamFilter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 90px;
  h2 {
    text-align: center;
    text-transform: uppercase;
    margin: 0;
    font-weight: 700;
    font-size: 1.2em;
  }
  @media screen and (max-width: 600px) {
    padding: 0.8em 0;
    h2 {
      font-size: 1.4em;
    }
  }
  @media screen and (max-width: 450px) {
    padding: 0.5em 0;
    flex-direction: row;
    justify-content: space-between;
    h2 {
      font-size: 1.4em;
    }
  }
  .select-wrapper {
    display: flex;

    label {
      display: inline-block;
      margin: 0 0.25em;
    }
  }
  select {
    font-size: 16px;
    font-weight: 900;
    color: ${p => p.theme.colors.teamColors[p.team].primary};
  }
`;

const TeamSelectedPlayers = () => {
  const state = useNflState();
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
            <td>{player.player}</td>
            <td>{player.position}</td>
          </tr>
        );
      })
    );
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
