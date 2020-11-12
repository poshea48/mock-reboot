import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Fieldset from '../../styles/Fieldset';
// import Description from '../../styles/Description';
import { useNflState } from '../../../context/nflContext';
import {
  ContentWrapper,
  Description,
  DataContainer,
} from '../../styles/SettingsCustomization';

const SimTeam = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 0.5em;
  margin-bottom: 0.2em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  flex-basis: 30px;
  min-height: 30px;
  label {
    color: #fff;
    text-transform: uppercase;
    flex-basis: 75%;
    @media screen and (max-width: 500px) {
      margin-bottom: 0.5em;
      font-size: 14px;
    }
  }
  input {
    align-self: center;
    color: #fff;
  }
`;

const CustomizeSimTeams = ({ handleAllToggle, handleSimulationToggle }) => {
  const { settingsState } = useNflState();

  let simulationDisplay = [
    <SimTeam key="sim-all">
      <label htmlFor="all">Simulate All</label>
      <input
        type="checkbox"
        name="all"
        value="all"
        checked={settingsState.allSimulationToggle}
        onChange={handleAllToggle}
      />
    </SimTeam>,
  ];
  Object.keys(settingsState.simulationTeams).forEach((team) => {
    simulationDisplay.push(
      <SimTeam key={team}>
        <label htmlFor="team">
          {settingsState.simulationTeams[team].fullName}
        </label>
        <input
          type="checkbox"
          name="team"
          value={team}
          checked={settingsState.simulationTeams[team].simulate}
          onChange={handleSimulationToggle}
        />
      </SimTeam>
    );
  });
  return (
    <ContentWrapper>
      <Description>
        <p>** unCheck Teams to manually draft **</p>
      </Description>
      <DataContainer>{simulationDisplay}</DataContainer>
    </ContentWrapper>
  );
};

CustomizeSimTeams.propTypes = {
  handleAllToggle: PropTypes.func.isRequired,
  handleSimulationToggle: PropTypes.func.isRequired,
};
export default CustomizeSimTeams;
