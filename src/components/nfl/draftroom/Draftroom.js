import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';
import { useNflState, useNflDispatch } from '../../../context/nflContext';
import { useAppState, useAppDispatch } from '../../../context/appContext';
import DraftroomHeader from './DraftroomHeader';
import DraftorderDisplay from './DraftorderDisplay';
import BigBoard from './BigBoard';
import TeamSelectedPlayers from './TeamSelectedPlayers';
import prospects from '../../../data/players';
import { NFLPOSITIONS } from '../../../data/positions';
import ControlPanel from '../controls/ControlPanel';
import findSimulatedPlayer, {
  updateTeamNeeds,
} from '../../../algorithms/findSimulatedPlayer';
import { getCurrentTeam } from '../../../algorithms/getTeam';

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 90px);
  height: calc((var(--vh, 1vh) * 100) - 90px);
  @media screen and(max-width: 800px) {
    justify-content: center;
  }
`;

const PlayersSection = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100% - 175px); /* header(55) + orderDisplay(120) */
  justify-content: center;
  @media screen and (max-width: 800px) {
    justify-content: center;
  }
  @media screen and (max-width: 600px) {
    /* height: calc(100% - 154px); */
  }
  @media screen and (max-width: 450px) {
    height: calc(100% - 150px); /* header(50) + orderDisplay(100) */
  }
  @media screen and (max-width: 350px) {
    height: calc(100% - 145px); /* header(45) + orderDisplay(100) */
  }
`;

const Draftroom = () => {
  const { isNflSetup, isNflFinished } = useAppState();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (!isNflSetup) {
      navigate('/nfl/settings');
    }
  });
  const { state } = useNflState();
  const { nflDispatch } = useNflDispatch();
  let simulationTimeout;
  const {
    myTeam,
    teamOnTheClock,
    manualTeams,
    started,
    paused,
    finished,
    undraftedPlayers,
    teamNeeds,
    currentPick,
    currentRound,
    draftOrder,
  } = state;

  let simulationTime;

  // when draft just finishes to navigate to results page, but will allow to route to draftroom after
  useEffect(() => {
    if (finished && !isNflFinished) {
      navigate('/nfl/results');
      appDispatch({ type: 'nflFinished' });
    }
  }, [finished]);

  useEffect(() => {
    if (paused || !started || finished) return;
    if (manualTeams.includes(teamOnTheClock)) {
      return;
    } else {
      if (draftOrder[currentRound][0].overallPick === currentPick) {
        simulationTime = 2000;
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

  const draftPlayer = (player) => {
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
      ...teamNeeds[team],
      [teamNeedsPos]: updateTeamNeeds(teamNeeds[team][teamNeedsPos]),
    };

    // update contex
    nflDispatch({
      type: 'draftPlayer',
      payload: {
        newUndraftedList,
        team,
        newSingleTeamNeeds,
        ...player,
      },
    });
  };

  //Todo useMemo???
  const simulatePick = () => {
    const players = undraftedPlayers.slice(0, 15).map((player) => {
      return {
        name: player,
        pos: prospects[player].pos,
      };
    });
    const team = getCurrentTeam(currentPick, currentRound);
    const draftedPlayer = findSimulatedPlayer(players, teamNeeds[team]);

    draftPlayer(draftedPlayer);
  };

  const handleDraftPlay = () => {
    if (!started) {
      // Start draft
      nflDispatch({ type: 'startDraft' });
    } else if (paused) {
      // resume draft
      nflDispatch({ type: 'resumeDraft' });
    } else {
      // pause draft
      nflDispatch({ type: 'pauseDraft' });
    }
  };

  return (
    <Main>
      <ControlPanel handleDraftPlay={handleDraftPlay} />
      <DraftroomHeader myTeam={myTeam} />
      <DraftorderDisplay />
      <PlayersSection>
        <BigBoard positions={NFLPOSITIONS} draftPlayer={draftPlayer} />
        <TeamSelectedPlayers />
      </PlayersSection>
    </Main>
  );
};

export default Draftroom;
