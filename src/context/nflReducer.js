import defaultDraftBoard from '../data/defaults/draftboard';
import draftOrder from '../data/draftOrder';
import defaultTeamNeeds from '../data/defaults/teamNeeds';
import { getCurrentTeam, getNextTeamUp } from '../algorithms/getTeam';

const initialState = {
  myTeam: '',
  manualTeams: [],
  teamOnTheClock: draftOrder[0][0],
  draftboard: '',
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
  let teamNeeds;
  switch (action.type) {
    case 'newDraft': {
      if (action.payload.teamNeeds === 'default') {
        teamNeeds = defaultTeamNeeds;
      } else {
        // fetch Team needs
      }
      if (action.payload.draftboard === 'default') {
        players = defaultDraftBoard;
      } else {
        // fetch draftboard
      }
      return {
        ...initialState,
        myTeam: action.payload.myTeam,
        manualTeams: action.payload.manualTeams,
        teamNeeds,
        undraftedPlayers: [...players],
      };
    }
    case 'updateDraft': {
      return {
        ...state,
        ...action.payload,
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
      let {
        newUndraftedList,
        name,
        pos,
        school,
        newSingleTeamNeeds,
      } = action.payload;
      let { currentPick, currentRound } = state;
      const advanceRound = currentPick % 32 === 0 && currentRound !== 7;
      let nextPick =
        currentRound === 7 && currentPick % 32 === 0 ? 'n/a' : currentPick + 1;
      let nextRound = advanceRound ? currentRound + 1 : currentRound;
      let team = getCurrentTeam(currentPick, currentRound);
      let newTeamResults = [...state.results[team]];
      const draftedPlayerObject = {
        name,
        pos,
        school,
        pick: currentPick,
        round: currentRound,
      };

      newTeamResults.push(draftedPlayerObject);
      let newTeamUp = getNextTeamUp(currentPick, currentRound);

      if (currentRound === 7 && currentPick === 224) {
        return {
          ...state,
          undraftedPlayers: newUndraftedList,
          results: { ...state.results, [team]: newTeamResults },
          currentPick: currentPick,
          currentRound: currentRound,
          finished: true,
          teamOnTheClock: 'N/A',
          teamNeeds: {
            ...state.teamNeeds,
            [team]: newSingleTeamNeeds,
          },
        };
      } else {
        return {
          ...state,
          undraftedPlayers: newUndraftedList,
          results: { ...state.results, [team]: newTeamResults },
          currentPick: nextPick,
          currentRound: nextRound,
          teamOnTheClock: newTeamUp,
          teamNeeds: {
            ...state.teamNeeds,
            [team]: newSingleTeamNeeds,
          },
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
