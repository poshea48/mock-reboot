import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import players from '../../data/players';
import { useNflState } from '../../context/nflContext';
import Modal from '../Modal';
import useModal from '../../customHooks/useModal';

const Container = styled.section`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-basis: 500px;
`;

const PositionsFilter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em 1em;
  width: 100%;
  height: 90px;
  h2 {
    text-align: center;
    text-transform: uppercase;
    margin: 0;
    font-weight: 700;
  }
  @media only screen and (max-width: 600px) {
    padding: 0.8em 0;
    h2 {
      font-size: 1.8em;
    }
  }
  @media only screen and (max-width: 450px) {
    padding: 0.5em 0;
    flex-direction: row;
    justify-content: flex-start;
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

const Table = styled.section`
  display: flex;
  flex-direction: column;
  flex-basis: 1 auto;
  position: relative;
  border-collapse: collapse;
  overflow: scroll;
  margin: 0 auto;
  width: 100%;
`;

const TR = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  &:hover,
  &:focus {
    background: #e6e6e6;
  }
`;

const TD = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 12%;
  .column-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    button {
      font-size: 20px;
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

const NameTD = styled(TD)`
  width: 80%;
`;

//TODO  make more generic for FF, prop => players, dispatch

const BigBoard = ({ positions, draftPlayer }) => {
  const { open, openModal, closeModal } = useModal();
  const buttonRef = useRef(null);
  const [position, changePosition] = useState('ALL');
  const [player, changePlayer] = useState(null);
  const state = useNflState();

  const handleDraftPlayerClick = e => {
    e.preventDefault();
    draftPlayer(player);
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
      : state.undraftedPlayers.filter(
          player => players[player].pos === position
        );

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
      <Table>
        {displayedPlayers.map((player, i) => (
          <TR key={player}>
            <TD>{i + 1}</TD>
            <NameTD className="name-column">
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
            </NameTD>
            <TD>
              <div className="column-content last">
                <span>{players[player].height}</span>
                <span>{players[player].weight} </span>
              </div>
            </TD>
          </TR>
        ))}
      </Table>
    </Container>
  );
};

BigBoard.propTypes = {
  positions: PropTypes.array.isRequired,
  draftPlayer: PropTypes.func.isRequired,
};
export default BigBoard;
