import React, { useState } from 'react';
import styled from '@emotion/styled';
import NFLTEAMS from '../../data/nflTeams';
import { navigate } from '@reach/router';
import { useNflDispatch, useNflState } from '../../context/nflContext';
import { useAppState, useAppDispatch } from '../../context/appContext';

const colors = {
  brown: '#D1AB98',
  black: '#232323',
  gray: '#476A6F',
  teal: '#BFDBDD',
  white: '#F7F7F7',
};

const colors2 = {
  eerieBlack: '#1c1d21',
  vanDykeBrown: '#634133',
  dodgerBlue: '#2191fb',
  gray: '#bebbbb',
  cadetGrey: '#93a3b1',
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  /* flex: 1 auto; */
  justify-content: flex-start;
  align-self: center;
  max-width: 650px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 1em;
  background: #8b4c33;
  border: 1px solid ${colors.black};
  border-radius: 20px;
  h3 {
    color: ${colors2.dodgerBlue};
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;
const Field = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: .5em;
  label {
    width: 140px;
    color: #fff;/*${colors2.eerieBlack};*/
    font-weight: 900;
  }
  select {
    flex: 1 auto;
    border: 1px solid ${colors2.eerieBlack};
    color: ${colors2.dodgerBlue};
    text-transform: uppercase;
    font-weight: 800;
    &:disabled {
      opacity: .5;
    }
  }
  option {
    padding: 0.5em;
  }
  @media (max-width: 450px) {
    flex-direction: column;
    margin-bottom: 1em;
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
  overflow: hidden;
  h4 {
    text-align: center;
    color: #fff;/*${colors2.eerieBlack};*/
    font-weight: 900;
    margin-bottom: .5em;
  }
  fieldset {
    padding: 0.5em 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: scroll;
    div {
      display: flex;
      margin-bottom: .2em;
      border-bottom: 1px solid rgba(255, 255, 255, .5);
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
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ResetButton = styled.button`
  border: 4px solid black;
  background: ${colors2.gray};
  margin-left: 0.5em;
  color: #80000d;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 900;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const SubmitButton = styled.button`
  max-width: 500px;
  align-self: center;
  padding: 0.5em 1em;
  background: ${colors2.gray};
  border-radius: 20px;
  text-transform: uppercase;
  color: ${colors2.eerieBlack};
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3 ease-in;
  &:focus {
    outline: none;
    transform: scale(1.1);
  }
`;

const getSimulationTeams = manualTeams => {
  let newTeams = {};
  for (let team in NFLTEAMS) {
    newTeams[team] = {
      code: NFLTEAMS[team].code,
      fullName: NFLTEAMS[team].fullName,
      simulate: !manualTeams.includes(team),
    };
  }
  return newTeams;
};

const Settings = () => {
  const nflContext = useNflState();
  const appContext = useAppState();
  const { isNflSetup } = appContext;

  const [state, changeState] = useState({
    myTeam: nflContext.myTeam || '',
    teamNeeds: nflContext.teamNeeds || '',
    draftboard: nflContext.draftboard || '',
    manualTeams: nflContext.manualTeams || [],
  });

  const [errorMessage, changeError] = useState(null);

  const [simulationTeams, changeSimulationTeams] = useState(
    getSimulationTeams(state.manualTeams)
  );

  const teamNeedsList = ['default', 'test1', 'test2'];
  const draftboardList = ['default', 'test1', 'test2'];
  const nflDispatch = useNflDispatch();
  const appDispatch = useAppDispatch();

  const handleChange = e => {
    if (e.target.name === 'myTeam' && !!errorMessage) {
      changeError(null);
    }
    if (e.target.name === 'myTeam') {
      changeState({
        ...state,
        myTeam: e.target.value,
        manualTeams: [e.target.value],
      });
    } else {
      changeState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSimulationToggle = e => {
    const team = e.target.value;
    let newManualPicks = [...state.manualTeams];
    let index;
    if ((index = state.manualTeams.indexOf(team) === -1)) {
      newManualPicks.push(team);
    } else {
      newManualPicks.splice(index, 1);
    }
    changeState({ ...state, manualTeams: newManualPicks });
    changeSimulationTeams({
      ...simulationTeams,
      [team]: {
        ...simulationTeams[team],
        simulate: !simulationTeams[team].simulate,
      },
    });
    return;
  };

  const submitForm = e => {
    e.preventDefault();
    if (!state.myTeam) {
      changeError('You must select a team');
      return;
    }

    nflDispatch({
      type: 'newDraft',
      payload: { ...state },
    });
    appDispatch({
      type: 'nflSetup',
      payload: { isNflSetup: true },
    });
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

  let simulationDisplay = Object.keys(simulationTeams).map(team => {
    let disableMyTeam = false;
    if (!appContext.isNflSetup && simulationTeams[team].code === state.myTeam) {
      disableMyTeam = true;
    }
    return (
      <div key={team}>
        <label htmlFor="team">{simulationTeams[team].fullName}</label>
        <input
          type="checkbox"
          name="team"
          value={team}
          checked={simulationTeams[team].simulate}
          onChange={handleSimulationToggle}
          disabled={disableMyTeam}
        />
      </div>
    );
  });

  //TODO Start back here!!!!
  const handleReset = async () => {
    changeState({
      myTeam: '',
      teamNeeds: '',
      draftboard: '',
      manualTeams: [],
    });
    changeSimulationTeams(getSimulationTeams([]));
    appDispatch({ type: 'reset' });
    nflDispatch({ type: 'reset' });
  };
  return (
    <Container>
      <h3>Customize draft</h3>
      <Form>
        {errorMessage && (
          <>
            <div className="error">
              <p>{errorMessage}</p>
            </div>
          </>
        )}
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
        <SimulationField>
          <h4 htmlFor="simulation-teams">Simulated Teams</h4>
          <fieldset>{simulationDisplay}</fieldset>
        </SimulationField>
        <ButtonsWrapper>
          <SubmitButton onClick={submitForm}>
            {appContext.isNflSetup ? 'Update' : 'Submit'}
          </SubmitButton>

          {isNflSetup && <ResetButton onClick={handleReset}>reset</ResetButton>}
        </ButtonsWrapper>
      </Form>
    </Container>
  );
};

export default Settings;
