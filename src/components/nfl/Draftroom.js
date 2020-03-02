import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNflState, useNflDispatch } from '../../context/nflContext';
import DraftroomHeader from './DraftroomHeader';
import DraftorderDisplay from './DraftorderDisplay';
import BigBoard from './BigBoard';
import TeamSelectedPlayers from './TeamSelectedPlayers';
import prospects from '../../data/players';
import { NFLPOSITIONS } from '../../data/positions';

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  @media screen and(max-width: 800px) {
    justify-content: center;
  }
`;

const StartButton = styled.button`
  position: absolute;
  top: 0;
  right: 1em;
  height: 55px;
  padding: 0;
  border-radius: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${({ color }) => (color === 'pause' ? 'gray' : 'green')};
  span {
    font-size: 1.2em;
    align-self: center;
    height: 20px;
  }
  .action {
    font-size: 1em;
    font-weight: 900;
  }
  @media screen and(max-width: 600px) {
    right: 0;
  }
`;

const PlayersSection = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100% - 165px);
  justify-content: space-evenly;
  @media screen and (max-width: 800px) {
    justify-content: center;
  }
  @media screen and (max-width: 600px) {
    height: calc(100% - 154px);
  }
  @media screen and (max-width: 450px) {
    height: calc(100% - 149px);
  }
  @media screen and (max-width: 350px) {
    height: calc(100% - 144px);
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
    <Main>
      {!finished && (
        <StartButton
          onClick={handleDraftPlay}
          color={!started ? 'begin' : paused ? 'play' : 'pause'}
        >
          {!started ? (
            <>
              <span className="action">Start Draft</span>
              <span
                role="img"
                title="start draft"
                aria-label="start draft action"
              >
                ▶️
              </span>
            </>
          ) : paused ? (
            <>
              <span className="action">Resume</span>
              <span role="img" title="resume" aria-label="resume draft action">
                ▶️
              </span>
            </>
          ) : (
            <>
              <span className="action">Pause</span>
              <span role="img" title="pause" aria-label="pause draft action">
                ⏸
              </span>
            </>
          )}
        </StartButton>
      )}
      <DraftroomHeader myTeam={myTeam} />
      <DraftorderDisplay
        currentRound={currentRound || 1}
        currentPick={currentPick || 1}
      />
      <PlayersSection>
        <BigBoard positions={NFLPOSITIONS} draftPlayer={draftPlayer} />
        <TeamSelectedPlayers />
      </PlayersSection>
    </Main>
  );
};

export default Draftroom;
