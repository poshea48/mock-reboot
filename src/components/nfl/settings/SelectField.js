import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Field from '../../styles/FormField';
import NFLTEAMS from '../../../data/nflTeams';
import defaultTeamNeeds from '../../../data/defaults/teamNeeds';
import defaultDraftBoard from '../../../data/defaults/draftboard';
import { useNflState, useNflDispatch } from '../../../context/nflContext';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-basis: 100px;
  min-height: 100px;

  @media screen and (max-width: 450px) {
    flex-basis: 148px;
    min-height: 148px;
  }
`;

const ErrorField = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  height: 100px;
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
  @media screen and (max-width: 450px) {
    height: 148px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${(p) => p.theme.colors.primaryPalette.eerieBlack};
`;

const SelectField = ({ isNflSetup }) => {
  const { settingsState } = useNflState();
  const { myTeam, draftboardType, teamNeedsType, errorMessage } = settingsState;
  const { settingsDispatch } = useNflDispatch();
  const teamsField = (
    <>
      <option disabled value=""></option>
      {Object.keys(NFLTEAMS).map((team) => (
        <option key={NFLTEAMS[team].code} value={NFLTEAMS[team].code}>
          {NFLTEAMS[team].fullName}
        </option>
      ))}
      ;
    </>
  );

  const teamNeedsList = ['default'];
  const draftboardList = ['default'];
  return (
    <Container>
      {errorMessage && (
        <ErrorField>
          <CloseButton onClick={closeErrorField}>✘</CloseButton>
          <p>{errorMessage}</p>
        </ErrorField>
      )}
      <Field>
        <label htmlFor="myTeam">Select Team</label>
        <select
          id="myTeam"
          name="myTeam"
          onChange={handleSelect}
          onBlur={(e) => e.target.blur()}
          value={myTeam}
          disabled={isNflSetup}
        >
          {teamsField}
        </select>
      </Field>
      <Field>
        <label htmlFor="teamNeedsType">Team Needs</label>
        <select
          id="teamNeedsType"
          name="teamNeedsType"
          onBlur={(e) => e.target.blur()}
          onChange={handleSelect}
          value={teamNeedsType}
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
        <label htmlFor="draftboardType">Draft Board</label>
        <select
          id="draftboardType"
          name="draftboardType"
          onBlur={(e) => e.target.blur()}
          onChange={handleSelect}
          value={draftboardType}
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
    </Container>
  );

  /********************** Util Functions *************/

  function handleSelect(e) {
    if (e.target.name === 'myTeam') {
      handleTeamSelect(e);
    } else if (e.target.name === 'teamNeedsType') {
      handleTeamNeedsSelect(e);
    } else {
      handleDraftboardSelect(e);
    }
  }

  function handleTeamSelect(e) {
    const newState = { ...settingsState };
    if (errorMessage) {
      newState.errorMessage = null;
    }
    newState.myTeam = e.target.value;
    newState.manualTeams = [e.target.value];
    newState.simulationTeams[e.target.value].simulate = false;
    newState.allSimulationToggle = false;
    settingsDispatch({
      type: 'addTeam',
      payload: newState,
    });
  }

  function handleTeamNeedsSelect(e) {
    e.preventDefault();
    let teamNeeds;
    if (e.target.value === 'default') {
      teamNeeds = defaultTeamNeeds;
    } else {
      // fetch team needs object
    }
    settingsDispatch({
      type: 'addTeamNeeds',
      payload: {
        teamNeedsType: e.target.value,
        teamNeeds,
      },
    });
  }

  function handleDraftboardSelect(e) {
    e.preventDefault();
    let undraftedPlayers;
    if (e.target.value === 'default') {
      undraftedPlayers = defaultDraftBoard;
    } else {
      // fetch draftboard
    }
    settingsDispatch({
      type: 'addUndraftedPlayers',
      payload: {
        draftboardType: e.target.value,
        undraftedPlayers,
      },
    });
  }

  function closeErrorField() {
    settingsDispatch({
      type: 'closeErrorField',
      payload: {
        errorMessage: '',
      },
    });
  }
};

SelectField.propTypes = {
  isNflSetup: PropTypes.bool.isRequired,
};
export default SelectField;
