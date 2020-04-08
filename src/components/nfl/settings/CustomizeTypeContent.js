import React from 'react';
import PropTypes from 'prop-types';
import CustomizeTeamNeeds from './CustomizeTeamNeeds';
import CustomizeDraftboard from './CustomizeDraftboard';
import CustomizeSimTeams from './CustomizeSimTeams';
import { useNflState, useNflDispatch } from '../../../context/nflContext';

// a fieldset will be displayed based on open[prop]
const CustomizeTypeContent = ({ open }) => {
  const { settingsState } = useNflState();
  const { settingsDispatch } = useNflDispatch();

  // takes in team object with new weighted positions
  const handleTeamNeedsCustomization = (team, needs) => {
    settingsDispatch({
      type: 'teamNeedsCustomization',
      payload: { team, needs },
    });
  };

  const handleUndraftedSave = newList => {
    settingsDispatch({
      type: 'updateUndrafted',
      payload: newList,
    });
  };

  const handleSimulationToggle = e => {
    const team = e.target.value;
    let newManualTeams = [...settingsState.manualTeams];
    let newSimulationTeams = { ...settingsState.simulationTeams };
    let index;
    if ((index = settingsState.manualTeams.indexOf(team) === -1)) {
      newManualTeams.push(team);
      newSimulationTeams[team].simulate = false;
    } else {
      newManualTeams.splice(index, 1);
      newSimulationTeams[team].simulate = true;
    }
    settingsDispatch({
      type: 'simulationToggle',
      payload: {
        manualTeams: newManualTeams,
        simulationTeams: newSimulationTeams,
        allSimulationToggle: newManualTeams.length === 0,
      },
    });
    return;
  };

  const handleAllToggle = () => {
    let newSimulatedTeams = { ...settingsState.simulationTeams };
    let simulate = !settingsState.allSimulationToggle;
    let newManualTeams = [];
    for (let team in newSimulatedTeams) {
      newSimulatedTeams[team].simulate = simulate;
      if (!simulate) newManualTeams.push(team);
    }

    settingsDispatch({
      type: 'allSimulationToggle',
      payload: {
        simulationTeams: newSimulatedTeams,
        allSimulationToggle: simulate,
        manualTeams: newManualTeams,
      },
    });
  };

  return (
    <>
      {open.draftboard ? (
        <CustomizeDraftboard
          undraftedPlayers={settingsState.undraftedPlayers}
          undraftedPlayersSave={handleUndraftedSave}
        />
      ) : open.teamNeeds ? (
        <CustomizeTeamNeeds
          teamNeeds={settingsState.teamNeeds}
          handleTeamNeedsCustomization={handleTeamNeedsCustomization}
        />
      ) : open.simTeams ? (
        <CustomizeSimTeams
          handleAllToggle={handleAllToggle}
          handleSimulationToggle={handleSimulationToggle}
        />
      ) : null}
    </>
  );
};

CustomizeTypeContent.propTypes = {
  open: PropTypes.object.isRequired,
};
export default CustomizeTypeContent;
