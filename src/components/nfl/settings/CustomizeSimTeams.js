import React from 'react';
import PropTypes from 'prop-types';
import Fieldset from '../../styles/Fieldset';
import Description from '../../styles/Description';

const CustomizeSimTeams = ({ simulationDisplay }) => {
  return (
    <>
      <Description>
        <p>** Checked Teams will be simulated **</p>
      </Description>
      <Fieldset>{simulationDisplay}</Fieldset>
    </>
  );
};

CustomizeSimTeams.propTypes = {
  simulationDisplay: PropTypes.array.isRequired,
};
export default CustomizeSimTeams;
