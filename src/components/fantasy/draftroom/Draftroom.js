/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import players from '../../../data/fantasy/players';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1em;
  width: 100%;
  height: 100%;
  .playersList {
    display: flex;
    flex-direction: column;
  }
  .player-item {
    display: grid;
    grid-template-columns: 50px 1fr 50px 100px 50px;
    margin: 1em 0;
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
        x
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
