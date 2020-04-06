import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Field from '../../styles/FormField';
import NFLTEAMS from '../../../data/nflTeams';
import defaultTeamNeeds from '../../../data/defaults/teamNeeds';
import defaultDraftBoard from '../../../data/defaults/draftboard';
import { useNflState, useNflDispatch } from '../../../context/nflContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;

  @media screen and (max-width: 450px) {
    min-height: 148px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${p => p.theme.colors.primaryPalette.eerieBlack};
`;

const SelectField = ({ isNflSetup }) => {
  const { settingsState } = useNflState();
  const { myTeam, draftboardType, teamNeedsType, errorMessage } = settingsState;
  const { settingsDispatch } = useNflDispatch();
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
  const handleSelect = e => {
    if (e.target.name === 'myTeam') {
      handleTeamSelect(e);
    } else if (e.target.name === 'teamNeedsType') {
      handleTeamNeedsSelect(e);
    } else {
      handleDraftboardSelect(e);
    }
  };

  const handleTeamSelect = e => {
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
  };

  const handleTeamNeedsSelect = e => {
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
  };

  const handleDraftboardSelect = e => {
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
  };

  const closeErrorField = () => {
    settingsDispatch({
      type: 'closeErrorField',
      payload: {
        errorMessage: '',
      },
    });
  };
  const teamNeedsList = ['default'];
  const draftboardList = ['default'];
  return (
    <Container>
      {errorMessage && (
        <Field>
          <CloseButton onClick={closeErrorField}>x</CloseButton>
          <div className="error">
            <p>{errorMessage}</p>
          </div>
        </Field>
      )}
      <Field>
        <label htmlFor="myTeam">Select Team</label>
        <select
          id="myTeam"
          name="myTeam"
          onChange={handleSelect}
          onBlur={e => e.target.blur()}
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
          onBlur={e => e.target.blur()}
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
          onBlur={e => e.target.blur()}
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
};

SelectField.propTypes = {
  isNflSetup: PropTypes.bool.isRequired,
};
export default SelectField;
