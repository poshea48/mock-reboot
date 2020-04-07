import React from 'react';
import PropTypes from 'prop-types';
import Fieldset from '../../styles/Fieldset';
import Description from '../../styles/Description';

const CustomizeSimTeams = ({ simulationDisplay }) => {
  return (
    <>
      <Description>
        <p>** unCheck Teams to manually draft **</p>
      </Description>
      <Fieldset>{simulationDisplay}</Fieldset>
    </>
  );
};

CustomizeSimTeams.propTypes = {
  simulationDisplay: PropTypes.array.isRequired,
};
export default CustomizeSimTeams;
