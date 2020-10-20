/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import players from '../../../data/fantasy/players';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1em;
  width: 100%;
  height: calc(100vh - 80px);
  .playersList {
    display: flex;
    flex-direction: column;
    max-width: 650px;
    width: 100%;
    overflow: scroll;
  }
  .player-item {
    display: flex;
    justify-content: flex-start;
    margin: 1em 0;
  }
  .rank,
  .pos {
    width: 50px;
  }
  button {
    width: 25px;
    height: 25px;
    padding: 0;
    background-color: transparent;
    border: none;
  }
  .team {
    width: 100px;
  }
  .player {
    flex: 1;
  }
`;

const Draftroom = () => {
  const [availablePlayers, setPlayers] = useState(players);

  const removePlayer = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    const playersList = [...availablePlayers].filter((p, i) => {
      return i !== index;
    });
    setPlayers(playersList);
  };

  const displayPlayers = availablePlayers.map((player, i) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li key={i} className="player-item">
      <span className="rank">{i + 1}</span>
      <span className="player">{player.name}</span>
      <span className="pos">{player.pos}</span>
      <span className="team">{player.team}</span>
      <button onClick={removePlayer} data-index={i}>
        🗑
      </button>
    </li>
  ));

  return (
    <Container>
      <ul className="playersList">{displayPlayers}</ul>
    </Container>
  );
};

export default Draftroom;
