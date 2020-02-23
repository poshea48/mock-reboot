import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNflState, useNflDispatch } from '../../context/nflContext';
import DraftroomHeader from './DraftroomHeader';
import DraftorderDisplay from './DraftorderDisplay';
import BigBoard from './BigBoard';
import TeamSelectedPlayers from './TeamSelectedPlayers';
import prospects from '../../data/players';
import { NFLPOSITIONS } from '../../data/positions';

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    position: relative;
    display: flex;
    width: 100%;
    overflow: hidden;
    justify-content: space-evenly;

    @media only screen and(max-width: 800px) {
      justify-content: center;
    }
  }
`;

const StartButton = styled.button`
  position: absolute;
  top: 10px;
  right: 1em;
  padding: 0;
  border-radius: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  span {
    text-align: center;
    font-size: 2em;
  }
  @media only screen and(max-width: 600px) {
    right: 0;
  }
`;

const Draftroom = () => {
  const state = useNflState();
  const dispatch = useNflDispatch();
  let simulationTimeout;
  const {
    myTeam,
    teamOnTheClock,
    manualTeams,
    started,
    paused,
    finished,
    undraftedPlayers,
    currentPick,
    currentRound,
  } = state;

  let simulationTime;
  useEffect(() => {
    if (paused || !started || finished) return;
    if (manualTeams.includes(teamOnTheClock)) {
      return;
    } else {
      if ((currentPick - 1) % 32 === 0) {
        simulationTime = 1500;
      } else {
        simulationTime = 500;
      }
      simulationTimeout = setTimeout(simulatePick, simulationTime);
      // simulatePick();
    }
    return () => {
      clearTimeout(simulationTimeout);
      return;
    };
  }, [started, currentPick, paused]);
  // find index of player drafted
  // splice from undraftedPlayers list => return new list
  // add spliced player to results

  const draftPlayer = name => {
    let i = 0;
    let newUndraftedList = [...undraftedPlayers];
    let draftedPlayerInfo;
    // remove player name from newUndraftedList
    for (i; i < undraftedPlayers.length - 1; i++) {
      if (name === undraftedPlayers[i]) {
        draftedPlayerInfo = prospects[newUndraftedList.splice(i, 1)];
        break;
      }
    }
    //! add name to draftedPlayer object (will update in Production data)
    // update contex
    dispatch({
      type: 'draftPlayer',
      payload: {
        newUndraftedList,
        player: name,
        position: draftedPlayerInfo.pos,
        school: draftedPlayerInfo.sch,
      },
    });
  };

  const simulatePick = () => {
    // For now just take highest ranked player
    const player = undraftedPlayers[0];
    draftPlayer(player);
  };

  const handleDraftPlay = () => {
    if (!started) {
      // Start draft
      dispatch({ type: 'startDraft' });
    } else if (paused) {
      // resume draft
      dispatch({ type: 'resumeDraft' });
    } else {
      // pause draft
      dispatch({ type: 'pauseDraft' });
    }
  };
  return (
    <Container>
      {!finished && (
        <StartButton onClick={handleDraftPlay} alt="hello">
          {!started ? (
            <span
              role="img"
              title="start draft"
              aria-label="start draft action"
            >
              ▶️
            </span>
          ) : paused ? (
            <span role="img" title="resume" aria-label="resume draft action">
              ▶️
            </span>
          ) : (
            <span role="img" title="pause" aria-label="pause draft action">
              ⏸
            </span>
          )}
        </StartButton>
      )}
      <DraftroomHeader myTeam={myTeam} />
      <DraftorderDisplay
        currentRound={currentRound || 1}
        currentPick={currentPick || 1}
      />

      <main>
        <BigBoard positions={NFLPOSITIONS} draftPlayer={draftPlayer} />
        <TeamSelectedPlayers />
      </main>
    </Container>
  );
};

export default Draftroom;
