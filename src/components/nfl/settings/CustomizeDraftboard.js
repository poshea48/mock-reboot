import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import playersObject from '../../../data/players';
import {
  ContentWrapper,
  Description,
} from '../../styles/SettingsCustomization';
import { useNflDispatch, useNflState } from '../../../context/nflContext';

const PlayersList = styled.ol`
  /* width: 100%; */
  height: ${(p) => (p.full ? '100%' : 'calc(100% - 30px + 0.5em)')};
  overflow-y: scroll;
  margin: 0;
  padding: 0;
  color: #fff;
`;

const Player = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 50px;
  cursor: move;
  /* padding: 0 0.5em; */
  .player-field {
    display: flex;
    .player {
      text-transform: uppercase;
      font-weight: 900;
      font-size: 20px;
      flex: 1 auto;
      @media screen and (max-width: 550px) {
        font-size: 16px;
        width: 25px;
      }
    }
    .rank {
      width: 50px;
      text-align: center;
      font-size: 18px;
      @media screen and (max-width: 550px) {
        font-size: 14px;
        width: 40px;
      }
    }
  }
  .pos-field {
    margin-left: 50px;
    display: flex;
    @media screen and (max-width: 550px) {
      margin-left: 40px;
    }
    span {
      font-size: 14px;
    }
  }
  button {
    width: 30px;
    padding: 10px;
    padding: 0;
    background: transparent;
    color: red;
    border: none;
    span {
      font-weight: 900;
    }
  }
  &.dropArea {
    background: #fff !important;
  }
  &:active,
  &:hover {
    background: ${(p) => p.theme.colors.primaryPalette.gray};
  }

  @media screen and (max-width: 450px) {
    padding: 0 0.25em;
    .rank {
      width: 25px;
    }
    .player {
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  flex-basis: calc(100% / 2);
  padding: 10px;
  background: red;
  text-align: center;
  display: flex;
  color: #fff;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 800;
  border: none;
  cursor: pointer;
`;

const ResetButton = styled(Button)`
  background: red;
`;

const SaveButton = styled(Button)`
  background: dodgerblue;
`;

const initialState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
  draggedIndex: null,
  updated: false,
};

const CustomizeDraftboard = () => {
  const {
    settingsState: { undraftedPlayers },
  } = useNflState();
  const [state, changeState] = useState(initialState);
  const { settingsDispatch } = useNflDispatch();

  // create local state array for undraftedPlayers so you can move undraftedPlayers around and
  // reset without messing with context
  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {
    if (undraftedPlayers) {
      setPlayersList(undraftedPlayers);
    }
  }, [undraftedPlayers]);

  const handleDragStart = (e) => {
    const initialPosition = Number(e.currentTarget.dataset.index);
    changeState({
      ...state,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: playersList,
    });
    // for Firefox
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    let newPlayersList = state.originalOrder;

    // index of dragged player
    const draggedFrom = state.draggedFrom;

    // index of drop area being hovered
    const draggedTo = Number(e.currentTarget.dataset.index);

    const playerDragged = newPlayersList[draggedFrom];
    const remainingPlayers = newPlayersList.filter(
      (player, i) => i !== draggedFrom
    );

    newPlayersList = [
      ...remainingPlayers.slice(0, draggedTo),
      playerDragged,
      ...remainingPlayers.slice(draggedTo),
    ];
    if (draggedTo !== state.draggedTo) {
      changeState({
        ...state,
        updatedOrder: newPlayersList,
        draggedTo,
      });
    }
  };

  const handleDrop = () => {
    let updated = false;
    if (state.draggedFrom !== state.draggedTo) {
      setPlayersList(state.updatedOrder);
      updated = true;
    }
    changeState({
      ...state,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
      updated,
    });
  };

  const handleDragLeave = () => {
    changeState({
      ...state,
      draggedTo: null,
    });
  };

  const playersDisplay = playersList.map((player, i) => (
    <Player
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      key={player}
      data-index={i}
      className={state && state.draggedTo === Number(i) ? 'dropArea' : ''}
    >
      <div className="player-field">
        <span className="rank">{i + 1}.</span>
        <span className="player">{playersObject[player].name}</span>
      </div>
      <div className="pos-field">
        <span>
          {playersObject[player].pos} | {playersObject[player].sch}
        </span>
      </div>
    </Player>
  ));

  const saveList = (e) => {
    e.preventDefault();
    settingsDispatch({
      type: 'updateUndrafted',
      payload: state.updatedOrder,
    });
    changeState((prev) => {
      return {
        ...prev,
        updated: false,
      };
    });
  };
  const resetList = (e) => {
    e.preventDefault();
    setPlayersList([...undraftedPlayers]);
    changeState((prev) => {
      return { ...prev, updated: false };
    });
  };

  return (
    <ContentWrapper>
      <Description>
        <p>** Modify Ranking. not available on mobile **</p>
      </Description>
      {playersList.length === 0 ? (
        <h4>You need to select a draft board type first</h4>
      ) : (
        <>
          <PlayersList full={!state.updated}>{playersDisplay}</PlayersList>
          {state.updated && (
            <ButtonWrapper>
              <SaveButton onClick={saveList}>Save</SaveButton>
              <ResetButton onClick={resetList}>Reset Draftboard</ResetButton>
            </ButtonWrapper>
          )}
        </>
      )}
    </ContentWrapper>
  );
};

export default CustomizeDraftboard;
