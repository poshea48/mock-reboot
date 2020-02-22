import defaultDraftBoard from '../data/defaults/draftboard';
import draftOrder from '../data/draftOrder';

const initialState = {
  myTeam: '',
  manualTeams: [],
  teamOnTheClock: draftOrder[0][0],
  draftboard: '',
  draftOrder: draftOrder,
  teamNeeds: '',
  started: false,
  paused: false,
  finished: false,
  undraftedPlayers: [],
  results: {
    ARI: [],
    ATL: [],
    BAL: [],
    BUF: [],
    CAR: [],
    CHI: [],
    CIN: [],
    CLE: [],
    DAL: [],
    DEN: [],
    DET: [],
    GB: [],
    HOU: [],
    IND: [],
    JAX: [],
    KC: [],
    LAC: [],
    LAR: [],
    LV: [],
    MIA: [],
    MIN: [],
    NYG: [],
    NYJ: [],
    NE: [],
    NO: [],
    PHI: [],
    PIT: [],
    SF: [],
    SEA: [],
    TB: [],
    TEN: [],
    WAS: [],
  },
  currentPick: 1,
  currentRound: 1,
};

function nflReducer(state, action) {
  let players;
  switch (action.type) {
    case 'newDraft': {
      if (action.payload.draftboard === 'default') {
        players = defaultDraftBoard;
      } else {
        // fetch draftboard
      }
      if (!action.payload.teamNeeds) {
        action.payload.teamNeeds = 'default';
      }
      if (!action.payload.draftboard) {
        action.payload.draftboard = 'default';
      }
      return {
        ...initialState,
        ...action.payload,
        undraftedPlayers: [...players],
      };
    }
    case 'reset': {
      localStorage.removeItem('nflState');
      return {
        ...initialState,
      };
    }
    case 'startDraft': {
      return {
        ...state,
        started: true,
      };
    }
    case 'pauseDraft': {
      return {
        ...state,
        paused: true,
      };
    }
    case 'resumeDraft': {
      return {
        ...state,
        paused: false,
      };
    }
    case 'stopDraft': {
      return {
        ...state,
        finished: true,
      };
    }
    case 'draftPlayer': {
      let { newUndraftedList, player, position, school } = action.payload;
      let { currentPick, currentRound, draftOrder } = state;
      const advanceRound = currentPick % 32 === 0 && currentRound !== 7;
      let nextPick =
        currentRound === 7 && currentPick % 32 === 0 ? 'n/a' : currentPick + 1;
      let nextRound = advanceRound ? currentRound + 1 : currentRound;
      let team = draftOrder[currentRound - 1][(currentPick - 1) % 32];
      let newTeamResults = [...state.results[team]];
      const draftedPlayerObject = {
        player,
        position,
        school,
        pick: currentPick,
        round: currentRound,
      };

      newTeamResults.push(draftedPlayerObject);
      let newTeamUp;
      if (advanceRound) {
        newTeamUp = draftOrder[nextRound - 1][0];
      } else {
        newTeamUp = draftOrder[nextRound - 1][(nextPick - 1) % 32];
      }

      if (currentRound === 7 && currentPick === 224) {
        return {
          ...state,
          undraftedPlayers: newUndraftedList,
          results: { ...state.results, [team]: newTeamResults },
          currentPick: currentPick,
          currentRound: currentRound,
          finished: true,
          teamOnTheClock: 'N/A',
        };
      } else {
        return {
          ...state,
          undraftedPlayers: newUndraftedList,
          results: { ...state.results, [team]: newTeamResults },
          currentPick: nextPick,
          currentRound: nextRound,
          teamOnTheClock: newTeamUp,
        };
      }
    }
    case 'addMyPlayer': {
      return { ...state, ...action.payload };
    }
    case 'addSimulatedPlayer': {
      return { ...state, ...action.payload };
    }
  }
}
export { initialState };
export default nflReducer;
