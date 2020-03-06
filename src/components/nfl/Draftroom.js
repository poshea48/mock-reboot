import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';
import { useNflState, useNflDispatch } from '../../context/nflContext';
import { useAppState } from '../../context/appContext';
import DraftroomHeader from './DraftroomHeader';
import DraftorderDisplay from './DraftorderDisplay';
import BigBoard from './BigBoard';
import TeamSelectedPlayers from './TeamSelectedPlayers';
import prospects from '../../data/players';
import { NFLPOSITIONS } from '../../data/positions';
import ControlPanel from './controls/ControlPanel';
import findSimulatedPlayer, {
  updateTeamNeeds,
} from '../../algorithms/findSimulatedPlayer';
import { getCurrentTeam } from '../../algorithms/getTeam';

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 90px);
  @media screen and(max-width: 800px) {
    justify-content: center;
  }
`;

const PlayersSection = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100% - 184px);
  justify-content: center;
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
  const { isNflSetup } = useAppState();
  useEffect(() => {
    if (!isNflSetup) {
      navigate('/nfl/settings');
    }
  });
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

  const draftPlayer = player => {
    let i = 0;
    let newUndraftedList = [...undraftedPlayers];
    let team = getCurrentTeam(currentPick, currentRound);
    let teamNeedsPos = player.pos.match(/OT|OG|OC/) ? 'OL' : player.pos;
    // take just team object from state.teamNeeds[team] => { QB: {...}, RB: {...}...}

    // remove player name from newUndraftedList
    for (i; i < undraftedPlayers.length - 1; i++) {
      if (player.name === undraftedPlayers[i]) {
        newUndraftedList.splice(i, 1);
        break;
      }
    }
    let newSingleTeamNeeds = {
      ...state.teamNeeds[team],
      [teamNeedsPos]: updateTeamNeeds(state.teamNeeds[team][teamNeedsPos]),
    };

    // update contex
    dispatch({
      type: 'draftPlayer',
      payload: {
        newUndraftedList,
        team,
        newSingleTeamNeeds,
        ...player,
      },
    });
  };

  const simulatePick = () => {
    const players = undraftedPlayers.slice(0, 15).map(player => {
      return {
        name: player,
        pos: prospects[player].pos,
      };
    });
    const team = getCurrentTeam(currentPick, currentRound);
    const draftedPlayer = findSimulatedPlayer(players, state.teamNeeds[team]);
    // For now just take highest ranked player
    // const player = undraftedPlayers[0];
    draftPlayer(draftedPlayer);
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
      <ControlPanel handleDraftPlay={handleDraftPlay} />
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
