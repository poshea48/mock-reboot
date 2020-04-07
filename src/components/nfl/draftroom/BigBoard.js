import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import players from '../../../data/players';
import { useNflState } from '../../../context/nflContext';
import Modal from '../../Modal';
import useModal from '../../../customHooks/useModal';

const Container = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1 auto;
  max-width: 550px;
`;

const PositionsFilter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em 1em;
  width: 100%;
  min-height: 90px;
  h2 {
    text-align: center;
    text-transform: uppercase;
    margin: 0;
    font-weight: 700;
  }
  @media screen and (max-width: 600px) {
    padding: 0.8em 0;
    h2 {
      font-size: 1.8em;
    }
  }
  @media screen and (max-width: 450px) {
    flex-direction: row;
    justify-content: flex-start;
    min-height: 40px;
    padding: 0.5em 0;
    box-sizing: border-box;
    h2 {
      font-size: 1.4em;
    }
  }
  .positions-wrapper {
    display: flex;

    label {
      display: inline-block;
      margin: 0 0.25em;
    }
  }
  select {
    font-size: 16px;
  }
`;

const PlayersList = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  border-collapse: collapse;
  overflow-y: scroll;
  margin: 0 auto;
  width: 100%;
`;

const PlayerLi = styled.li`
  display: flex;
  width: 100%;
  min-height: 70px;
  padding: 0.5em;

  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  &:hover,
  &:focus {
    background: #e6e6e6;
  }

  @media screen and (max-width: 450px) {
    padding: 0.25em;
    min-height: 55px;
  }
`;

const Column = styled.div`
  width: 12%;
  .column-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    button {
      font-size: 18px;
      font-weight: 800;
      align-self: flex-start;
      text-transform: uppercase;
      background: transparent;
      cursor: pointer;
      border: 0;
      padding: 0;
      &:hover,
      &:focus {
        transform: scale(1.1);
        outline: none;
        color: #0e2be1;
      }

      @media screen and (min-width: 450px) and (max-width: 800px) {
        font-size: 20px;
      }

      @media screen and (max-width: 375px) {
        font-size: 16px;
      }

      @media screen and (max-width: 350px) {
        font-size: 15px;
      }
    }
    span {
      font-size: 14px;
    }
  }
  .last {
    text-align: right;
    span {
      &:last-of-type {
        padding-right: 0.3em;
      }
    }
  }
`;

const NameColumn = styled(Column)`
  width: 80%;
`;

const BigBoard = ({ positions, draftPlayer }) => {
  const { open, openModal, closeModal } = useModal();
  const buttonRef = useRef(null);
  const [position, changePosition] = useState('ALL');
  const [player, changePlayer] = useState(null);
  // const [filteredPlayers, changeFilteredPlayers] = useState([]);
  const { state } = useNflState();

  const handleDraftPlayerClick = e => {
    e.preventDefault();
    draftPlayer(players[player]);
    closeModal();
    buttonRef.current = null;
  };

  const showDraftPlayerWindow = () => {
    return (
      <>
        <h3>{player}</h3>
        <h4>
          {players[player].pos} | {players[player].sch}
        </h4>
        <button
          onClick={handleDraftPlayerClick}
          disabled={!state.manualTeams.includes(state.teamOnTheClock)}
        >
          Draft
        </button>
      </>
    );
  };

  const displayedPlayers =
    position === 'ALL'
      ? state.undraftedPlayers
      : state.undraftedPlayers.reduce((acc, player, i) => {
          if (players[player].pos === position) {
            acc.push(`${player}*${i + 1}`);
          }
          return acc;
        }, []);

  const handlePositionChange = e => {
    changePosition(e.target.value);
  };

  const handlePlayerClick = e => {
    changePlayer(e.target.value);
    buttonRef.current = e.target;
    openModal();
  };
  return (
    <Container>
      {open ? (
        <Modal
          buttonRef={buttonRef}
          close={closeModal}
          render={showDraftPlayerWindow}
        />
      ) : null}
      <PositionsFilter>
        <h2>Big Board</h2>
        <div className="positions-wrapper">
          <label htmlFor="filterBy">
            <select
              name="filterBy"
              value={position}
              onChange={handlePositionChange}
              onBlur={e => e.target.blur()}
            >
              {positions.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>
      </PositionsFilter>
      <PlayersList>
        {displayedPlayers.map((p, i) => {
          let [player, overall] = p.split('*');
          return (
            <PlayerLi key={player}>
              {overall ? <Column>{overall}</Column> : <Column>{i + 1}</Column>}
              <NameColumn className="name-column">
                <div className="column-content">
                  <button
                    ref={buttonRef}
                    value={player}
                    onClick={handlePlayerClick}
                  >
                    {player}
                  </button>
                  <span>
                    {players[player].pos} | {players[player].sch}
                  </span>
                </div>
              </NameColumn>
              <Column>
                <div className="column-content last">
                  <span>{players[player].height}</span>
                  <span>{players[player].weight} </span>
                </div>
              </Column>
            </PlayerLi>
          );
        })}
      </PlayersList>
    </Container>
  );
};

BigBoard.propTypes = {
  positions: PropTypes.array.isRequired,
  draftPlayer: PropTypes.func.isRequired,
};
export default BigBoard;
