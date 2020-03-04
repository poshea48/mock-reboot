import React, { useReducer, useEffect } from 'react';
import styled from '@emotion/styled';
import NFLTEAMS from '../../data/nflTeams';
import { navigate } from '@reach/router';
import { useNflDispatch, useNflState } from '../../context/nflContext';
import { useAppState, useAppDispatch } from '../../context/appContext';
import ResetButton from './controls/ResetButton';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  max-width: 650px;
  width: 100%;
  height: calc(100vh - 80px);
  margin: 0 auto;
  h2 {
    align-self: center;
    display: inline-block;
    margin-bottom: 1em;
    color: ${p => p.theme.colors.primaryPalette.eerieBlack};
    text-align: center;
    font-weight: 800;
    text-transform: uppercase;
  }
  @media screen and (max-width: 450px) {
    h2 {
      font-size: 1.4em;
      margin-bottom: 0.5em;
    }
  }
  @media screen and (max-width: 600px) {
  }
`;

const Form = styled.form`
  background: #8b4c33;
  padding: 1em;
  max-height: calc(100% - 30px);
  border: 1px solid ${p => p.theme.colors.primaryPalette.eerieBlack};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 auto;
  margin: 0;
  overflow: hidden;

  .error {
    margin-left: 140px;
    background: #fff;
    padding: 1em 0;
    border: 1px solid black;
    border-radius: 5px;
    p {
      margin: 0;
      color: red;
      text-align: center;
      text-transform: uppercase;
      font-weight: 800;
    }
  }
  .select-fields {
    display: flex;
    flex-direction: column;
    min-height: 130px;

    @media screen and (max-width: 450px) {
      min-height: 175px;
    }
  }
`;
const Field = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  min-height: 35px;
  margin-bottom: .5em;
  label {
    width: 140px;
    color: #fff;/*${p => p.theme.colors.primaryPalette.eerieBlack};*/
    font-weight: 900;
  }
  select {
    flex: 1 auto;
    border: 1px solid ${p => p.theme.colors.primaryPalette.eerieBlack};
    color: ${p => p.theme.colors.primaryPalette.dodgerBlue};
    text-transform: uppercase;
    font-weight: 800;
    &:disabled {
      opacity: .5;
    }
  }
  option {
    padding: 0.5em;
  }
  @media screen and (max-width: 450px) {
    flex-direction: column;
    label {
      align-self: center;
      text-align: center;
    }
  }
`;

const SimulationField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: .5em;
  height: calc(100% - 180px);
  @media screen and (max-width: 450px) {
    height: calc(100% - 225px);

  }
  h4 {
    text-align: center;
    color: #fff;/*${p => p.theme.colors.primaryPalette.eerieBlack};*/
    font-weight: 900;
    margin-bottom: .5em;
  }
  fieldset {
    padding: 0.5em 1em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: scroll;
    margin: 0 0 1em 0;
    div {
      display: flex;
      margin-bottom: .2em;
      border-bottom: 1px solid rgba(255, 255, 255, .5);
      min-height: 30px;
      label {
        width: 220px;
        color: #fff;
        text-transform: uppercase;
      }
      input {
        align-self: center;
        color: #fff;
      }
    }
    @media screen and (max-width: 500px) {
      margin-bottom: .5em;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 50px;
`;

const SubmitButton = styled.button`
  width: 150px;
  height: 40px;
  align-self: center;
  background: ${p => p.theme.colors.primaryPalette.gray};
  border-radius: 20px;
  text-transform: uppercase;
  color: ${p => p.theme.colors.primaryPalette.eerieBlack};
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:focus {
    outline: none;
    transform: scale(1.1);
  }

  @media screen and (max-width: 400px) {
    font-weight: 800;
    font-size: 1em;
  }
`;

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

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'update': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'handleChange': {
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
      return {
        ...settingsInitialState,
        simulationTeams: getSimulationTeams(),
      };
    }
  }
};
const settingsInitialState = {
  myTeam: '',
  teamNeeds: '',
  draftboard: '',
  manualTeams: [],
  simulationTeams: getSimulationTeams(),
  allSimulationToggle: true,
  errorMessage: '',
};

const Settings = () => {
  const nflContext = useNflState();
  const appContext = useAppState();
  const { isNflSetup } = appContext;
  const [state, dispatch] = useReducer(settingsReducer, settingsInitialState);
  const { errorMessage } = state;

  useEffect(() => {
    if (!isNflSetup) {
      dispatch({ type: 'reset' });
      return;
    }
  }, []);
  // Updates state on refresh or when updating draft settings
  useEffect(() => {
    if (!isNflSetup) return;
    if (!state.myTeam && nflContext.myTeam) {
      const { myTeam, teamNeeds, draftboard, manualTeams } = nflContext;
      let simToggle;
      let newSimulationTeams = { ...state.simulationTeams };
      if (manualTeams.length === 0) {
        simToggle = true;
      } else {
        simToggle = false;
        manualTeams.forEach(
          team => (newSimulationTeams[team].simulate = false)
        );
      }
      const newState = {
        myTeam,
        teamNeeds,
        draftboard,
        manualTeams,
        allSimulationToggle: simToggle,
        simulationTeams: newSimulationTeams,
      };
      dispatch({
        type: 'update',
        payload: newState,
      });
    } else {
      return;
    }
  }, []);

  const teamNeedsList = ['default'];
  const draftboardList = ['default'];
  const nflDispatch = useNflDispatch();
  const appDispatch = useAppDispatch();

  const handleChange = e => {
    const newState = { ...state };
    if (e.target.name === 'myTeam' && !!state.errorMessage) {
      newState.errorMessage = null;
    }
    if (e.target.name === 'myTeam') {
      newState.myTeam = e.target.value;
      newState.manualTeams = [e.target.value];
      newState.simulationTeams[e.target.value].simulate = false;
      newState.allSimulationToggle = false;
    } else {
      newState[e.target.name] = e.target.value;
    }
    dispatch({
      type: 'handleChange',
      payload: newState,
    });
  };

  const handleSimulationToggle = e => {
    const team = e.target.value;
    let newManualTeams = [...state.manualTeams];
    let newSimulationTeams = { ...state.simulationTeams };
    let index;
    if ((index = state.manualTeams.indexOf(team) === -1)) {
      newManualTeams.push(team);
      newSimulationTeams[team].simulate = false;
    } else {
      newManualTeams.splice(index, 1);
      newSimulationTeams[team].simulate = true;
    }
    dispatch({
      type: 'simulationToggle',
      payload: {
        manualTeams: newManualTeams,
        simulationTeams: newSimulationTeams,
        allSimulationToggle: newManualTeams.length === 0,
      },
    });
    return;
  };

  const handleAllToggle = e => {
    let newSimulatedTeams = { ...state.simulationTeams };
    let simulate = !state.allSimulationToggle;
    let newManualTeams = [];
    for (let team in newSimulatedTeams) {
      newSimulatedTeams[team].simulate = simulate;
      if (!simulate) newManualTeams.push(team);
    }
    dispatch({
      type: 'allSimulationToggle',
      payload: {
        simulationTeams: newSimulatedTeams,
        allSimulationToggle: simulate,
        manualTeams: newManualTeams,
      },
    });
  };

  const submitForm = e => {
    e.preventDefault();
    const type = isNflSetup ? 'updateDraft' : 'newDraft';
    if (!state.myTeam) {
      dispatch({
        type: 'changeError',
        payload: {
          errorMessage: 'You must select a team',
        },
      });
      return;
    }
    nflDispatch({
      type,
      payload: { ...state },
    });

    if (!isNflSetup) {
      appDispatch({
        type: 'nflSetup',
        payload: { isNflSetup: true },
      });
    }
    navigate('/nfl/draftroom');
  };

  const teamsField = (
    <>
      <option disabled value=""></option>
      {Object.keys(NFLTEAMS).map(team => (
        <option key={NFLTEAMS[team].code} value={NFLTEAMS[team].code}>
          {NFLTEAMS[team].fullName}
        </option>
      ))}
      ;
    </>
  );

  let simulationDisplay = Object.keys(state.simulationTeams).map(team => {
    return (
      <div key={team}>
        <label htmlFor="team">{state.simulationTeams[team].fullName}</label>
        <input
          type="checkbox"
          name="team"
          value={team}
          checked={state.simulationTeams[team].simulate}
          onChange={handleSimulationToggle}
        />
      </div>
    );
  });
  return (
    <Main>
      <h2>Customize draft</h2>
      <Form>
        {errorMessage && (
          <>
            <div className="error">
              <p>{errorMessage}</p>
            </div>
          </>
        )}
        <div className="select-fields">
          <Field>
            <label htmlFor="myTeam">Select Team</label>
            <select
              id="myTeam"
              name="myTeam"
              onChange={handleChange}
              onBlur={e => e.target.blur()}
              value={state.myTeam}
              disabled={isNflSetup}
            >
              {teamsField}
            </select>
          </Field>
          <Field>
            <label htmlFor="teamNeeds">Team Needs</label>
            <select
              id="teamNeeds"
              name="teamNeeds"
              onBlur={e => e.target.blur()}
              onChange={handleChange}
              value={state.teamNeeds}
              disabled={isNflSetup}
            >
              <option disabled value=""></option>
              {teamNeedsList.map((n, i) => (
                <option key={n + i} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          <Field>
            <label htmlFor="draftboard">Draft Board</label>
            <select
              id="draftboard"
              name="draftboard"
              onBlur={e => e.target.blur()}
              onChange={handleChange}
              value={state.draftboard}
              disabled={isNflSetup}
            >
              <option disabled value=""></option>

              {draftboardList.map((db, i) => (
                <option key={db + i} value={db}>
                  {db}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <SimulationField>
          <h4 htmlFor="simulation-teams">Simulated Teams</h4>
          <fieldset>
            <div>
              <label htmlFor="all">Simulate All</label>
              <input
                type="checkbox"
                name="all"
                value="all"
                checked={state.allSimulationToggle}
                onChange={handleAllToggle}
              />
            </div>

            {simulationDisplay}
          </fieldset>
        </SimulationField>
        <ButtonsWrapper>
          <SubmitButton onClick={submitForm}>
            {appContext.isNflSetup ? 'Update' : 'Submit'}
          </SubmitButton>

          {isNflSetup && (
            <ResetButton mini={false} settingsDispatch={dispatch} />
          )}
        </ButtonsWrapper>
      </Form>
    </Main>
  );
};

export default Settings;
