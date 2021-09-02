/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import players from '../../../data/fantasy/2021_players';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1em;
  width: 100%;
  height: calc(100vh - 80px);
  h2 {
    margin: 20px 0;
  }
  button {
    width: 25px;
    height: 25px;
    padding: 0;
    background-color: transparent;
    border: none;
  }
  header {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 800px;
  }
`;

const Table = styled.table`
  width: 100%;
  display: grid;
  border-collapse: collapse;
  overflow: scroll;

  thead,
  tbody,
  tr {
    display: contents;
  }

  th,
  td {
    padding: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
    font-size: 12px;
    height: 50px;
  }

  th {
    position: sticky;
    top: 0;
    background: #6c7ae0;
    text-align: left;
    font-weight: normal;
    font-size: 12px;
    color: white;
  }

  th:last-child {
    border: 0;
  }

  tbody tr:hover td {
    background: lightgray;
    color: black;
    font-weight: 600;
    transition: font-weight ease-in-out 1s;
  }
  td {
    padding-top: 10px;
    padding-bottom: 10px;
    color: #808080;
  }

  tr:nth-of-type(even) td {
    background: #f8f6ff;
  }
`;

const PlayersTable = styled(Table)`
  max-width: 800px;
  min-height: 65%;
  flex: 1;
  grid-template-columns:
    minmax(75px, 10%)
    minmax(100px, 45%)
    minmax(75px, 10%)
    minmax(75px, 10%)
    minmax(100px, 25%);
  .action-header {
    text-align: center;
  }
  .action {
    display: flex;
    justify-content: space-around;
  }
  .draft-icon {
    color: transparent;
    text-shadow: 0 0 green;
    font-weight: 800;
  }
`;

const TeamTable = styled(Table)`
  max-width: 500px;
  grid-template-columns:
    minmax(200px, 60%)
    minmax(75px, 20%)
    minmax(75px, 20%)
    minmax(75px, 20%);
`;

const keeperTeam = [{ name: 'Josh Allen', pos: 'QB', team: 'BUF', round: 6 }];

const Draftroom = () => {
  const [availablePlayers, setPlayers] = useState(players);
  const [myTeam, setTeam] = useState(keeperTeam);
  const [round, setRound] = useState(1);
  const [pick, setPick] = useState(1);

  function IncrementDraft(pick, round) {
    setPick(pick + 1);
    setRound(pick % 10 == 0 ? round + 1 : round);
  }

  const removePlayer = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    const playersList = [...availablePlayers].filter((p, i) => {
      return i !== index;
    });
    setPlayers(playersList);
    IncrementDraft(pick, round);
  };

  const draftPlayer = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    let player;
    const playersList = [...availablePlayers].filter((p, i) => {
      if (i === index) {
        player = p;
      }
      return i !== index;
    });
    setTeam([...myTeam, { ...player, round }]);
    setPlayers(playersList);
    IncrementDraft(pick, round);
  };

  const tabledPlayers = availablePlayers.map((player, i) => (
    <tr key={i} className="player-row">
      <td>{i + 1}</td>
      <td>{player.name}</td>
      <td>{player.pos}</td>
      <td>{player.team}</td>
      <td className="action">
        <button data-index={i} onClick={draftPlayer} title="draft player">
          <span role="img" className="draft-icon" aria-label="draft player">
            ✔︎
          </span>
        </button>
        <button onClick={removePlayer} data-index={i} title="remove player">
          <span role="img" aria-label="remove player">
            ❌
          </span>
        </button>
      </td>
    </tr>
  ));

  const myTeamPlayers = myTeam.map((player, i) => (
    <tr key={i} className="my-player-row">
      <td>{player.name}</td>
      <td>{player.pos}</td>
      <td>{player.team}</td>
      <td>{player.round}</td>
    </tr>
  ));

  return (
    <Container>
      <header>
        <h2>Current Round: {round}</h2>
        <h2>Current Pick: {pick}</h2>
      </header>
      <PlayersTable>
        <thead>
          <tr>
            <th>RANK</th>
            <th>PLAYER</th>
            <th>POS</th>
            <th>TEAM</th>
            <th className="action-header">ACTION</th>
          </tr>
        </thead>
        <tbody>{tabledPlayers}</tbody>
      </PlayersTable>
      <h2>My Team</h2>
      <TeamTable>
        <thead>
          <tr>
            <th>PLAYER</th>
            <th>POS</th>
            <th>TEAM</th>
            <th>ROUND</th>
          </tr>
        </thead>
        <tbody>{myTeamPlayers}</tbody>
      </TeamTable>
    </Container>
  );
};

export default Draftroom;
