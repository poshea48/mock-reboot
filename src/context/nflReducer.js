import draftOrder, { draftOrderObject } from '../data/draftOrder';
import { getCurrentTeam, getNextTeamUp } from '../algorithms/getTeam';
import NFLTEAMS from '../data/nflTeams';

const initialState = {
  myTeam: '',
  manualTeams: [],
  teamOnTheClock: draftOrder[0][0],
  draftboardType: '',
  draftboard: [],
  teamNeedsType: '',
  teamNeeds: {},
  started: false,
  paused: false,
  finished: false,
  undraftedPlayers: [],
  draftOrder: draftOrderObject,
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

const getSimulationTeams = () => {
  let newTeams = {};
  for (let team in NFLTEAMS) {
    newTeams[team] = {
      code: NFLTEAMS[team].code,
      fullName: NFLTEAMS[team].fullName,
      simulate: true,
    };
  }
  return newTeams;
};

const settingsInitialState = {
  myTeam: '',
  draftboard: '',
  draftboardType: '',
  teamNeeds: {},
  teamNeedsType: '',
  undraftedPlayers: [],
  simulationTeams: getSimulationTeams(),
  manualTeams: [],
  allSimulationToggle: true,
  updated: {
    teamNeeds: false,
    undraftedPlayers: false,
    manualTeams: false,
  },
  errorMessage: '',
};

function settingsReducer(state, action) {
  switch (action.type) {
    case 'update': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'addTeam': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'addTeamNeeds': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'addUndraftedPlayers': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'simulationToggle': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'allSimulationToggle': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'reset': {
      localStorage.removeItem('nflState');
      return {
        ...settingsInitialState,
        simulationTeams: getSimulationTeams(),
      };
    }
    case 'teamNeedsCustomization': {
      const newTeamNeeds = {
        ...state.teamNeeds,
        [action.payload.team]: { ...action.payload.needs },
      };
      return {
        ...state,
        teamNeeds: newTeamNeeds,
      };
    }
    case 'updateUndrafted': {
      return { ...state, undraftedPlayers: action.payload };
    }

    case 'changeError': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'closeErrorField': {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
}

function nflReducer(state, action) {
  switch (action.type) {
    case 'newDraft': {
      return {
        ...initialState,
        ...action.payload,
        // myTeam: action.payload.myTeam,
        // manualTeams: action.payload.manualTeams,
        // teamNeeds,
        // undraftedPlayers: [...players],
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
      let { draftOrder, currentPick, currentRound } = state;

      // add drafted player to draftOrder result field for currentRound and currentPick
      // then add array to dispatch
      let currentRoundArray = [...draftOrder[currentRound]];
      let currentSelectionIndex = currentRoundArray.findIndex(
        (s) => s.overallPick === currentPick
      );
      currentRoundArray[currentSelectionIndex].result = name;

      let roundLength = draftOrder[currentRound].length;
      let lastPickInRound =
        draftOrder[currentRound][roundLength - 1].overallPick;

      const advanceRound =
        currentPick === lastPickInRound && currentRound !== 7;
      let nextPick =
        currentRound === 7 && currentPick === lastPickInRound
          ? 'n/a'
          : currentPick + 1;

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
      let finished = false;
      let teamOnTheClock;
      if (currentRound === 7 && currentPick === lastPickInRound) {
        finished = true;
        teamOnTheClock = 'N/A';
      } else {
        teamOnTheClock = newTeamUp;
      }
      let newDraftOrder = { ...draftOrder, [currentRound]: currentRoundArray };
      return {
        ...state,
        undraftedPlayers: newUndraftedList,
        results: { ...state.results, [team]: newTeamResults },
        currentPick: nextPick,
        currentRound: nextRound,
        teamOnTheClock,
        draftOrder: newDraftOrder,
        finished,
        teamNeeds: {
          ...state.teamNeeds,
          [team]: newSingleTeamNeeds,
        },
      };
    }
    case 'addMyPlayer': {
      return { ...state, ...action.payload };
    }
    case 'addSimulatedPlayer': {
      return { ...state, ...action.payload };
    }
  }
}
export { initialState, settingsInitialState, settingsReducer };
export default nflReducer;
