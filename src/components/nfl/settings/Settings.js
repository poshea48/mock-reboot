import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { navigate } from '@reach/router';
import { useNflDispatch, useNflState } from '../../../context/nflContext';
import { useAppState, useAppDispatch } from '../../../context/appContext';
import SelectField from './SelectField';
import FormButtons from './FormButtons';
import CustomizeTypesNav from './CustomizeTypesNav';
import CustomizeTypeContent from './CustomizeTypeContent';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: center;
  max-width: 650px;
  width: 100%;
  height: calc(100vh - 90px);
  margin: 0 auto;
  h2 {
    align-self: center;
    display: inline-block;
    color: ${(p) => p.theme.colors.primaryPalette.eerieBlack};
    text-align: center;
    font-weight: 800;
    text-transform: uppercase;
    flex-basis: 40px;
    min-height: 40px;
  }

  @media screen and (max-width: 450px) {
    h2 {
      font-size: 1.4em;
    }
  }
  @media screen and (max-width: 600px) {
  }
`;

const Form = styled.form`
  background: #8b4c33;
  padding: 1em;
  height: calc(100% - 30px);
  flex: 1 auto;
  border: 1px solid ${(p) => p.theme.colors.primaryPalette.eerieBlack};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  @media screen and (max-width: 450px) {
    padding: 0.5em;
  }
`;

const CutomizeTypesField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 auto;
  /* height: 100%; */
  overflow: hidden;
  label {
    width: 100%;
    color: #fff;
    font-weight: 900;
    text-align: center;
    flex-basis: 26px;
    min-height: 26px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    label {
      align-self: center;
      text-align: center;
    }
  }
`;

function Settings() {
  const { state, settingsState } = useNflState();
  const appContext = useAppState();
  const { isNflSetup } = appContext;

  // passed to CustomizeTypeContent to display proper customization setting
  const [open, toggleOpen] = useState({
    teamNeeds: false,
    draftboard: false,
    simTeams: false,
  });
  const { nflDispatch, settingsDispatch } = useNflDispatch();
  const appDispatch = useAppDispatch();

  // Updates state on refresh or when updating draft settings
  useEffect(() => {
    if (!settingsState.myTeam && state.myTeam) {
      const {
        myTeam,
        draftboardType,
        teamNeeds,
        teamNeedsType,
        undraftedPlayers,
        manualTeams,
      } = state;
      let simToggle;
      let newSimulationTeams = { ...settingsState.simulationTeams };
      if (manualTeams.length === 0) {
        simToggle = true;
      } else {
        simToggle = false;
        state.manualTeams.forEach(
          (team) => (newSimulationTeams[team].simulate = false)
        );
      }
      const newState = {
        ...settingsState,
        myTeam,
        draftboardType,
        teamNeeds,
        teamNeedsType,
        undraftedPlayers,
        allSimulationToggle: simToggle,
        simulationTeams: newSimulationTeams,
        manualTeams,
      };
      settingsDispatch({
        type: 'update',
        payload: newState,
      });
    } else {
      return;
    }
  }, []);

  return (
    <Main>
      <h2>Customize draft</h2>
      <Form>
        <SelectField isNflSetup={isNflSetup} />
        <CutomizeTypesField>
          <label htmlFor="customize-types">Customize Types</label>
          <CustomizeTypesNav handleTypeSelect={handleTypeSelect} open={open} />
          <CustomizeTypeContent open={open} />
        </CutomizeTypesField>
        <FormButtons
          submitForm={submitForm}
          handleReset={handleReset}
          isNflSetup={isNflSetup}
        />
      </Form>
    </Main>
  );

  // Pass to CustomizeTypesNav component
  function handleTypeSelect(e) {
    e.preventDefault();
    const selectedType = e.target.dataset.type;
    let newControls = {
      draftboard: false,
      teamNeeds: false,
      simTeams: false,
    };
    toggleOpen({
      ...newControls,
      [selectedType]: !open[selectedType],
    });
  }

  function submitForm(e) {
    e.preventDefault();
    const type = isNflSetup ? 'updateDraft' : 'newDraft';
    if (
      !settingsState.myTeam ||
      !settingsState.draftboardType ||
      !settingsState.teamNeedsType
    ) {
      settingsDispatch({
        type: 'changeError',
        payload: {
          errorMessage: `You must select a ${
            !settingsState.myTeam
              ? 'team'
              : !settingsState.draftboardType
              ? 'draftboard'
              : 'team needs type'
          }`,
        },
      });
      return;
    }
    nflDispatch({
      type,
      payload: {
        myTeam: settingsState.myTeam,
        manualTeams: [...settingsState.manualTeams],
        teamNeedsType: settingsState.teamNeedsType,
        draftboardType: settingsState.draftboardType,
        undraftedPlayers: [...settingsState.players],
        teamNeeds: { ...settingsState.teamNeeds },
      },
    });

    if (!isNflSetup) {
      appDispatch({
        type: 'nflSetup',
        payload: { isNflSetup: true },
      });
    }
    navigate('/nfl/draftroom');
  }

  function handleReset() {
    settingsDispatch({ type: 'reset' });
    appDispatch({ type: 'reset' });
    nflDispatch({ type: 'reset' });
  }
}

export default Settings;
