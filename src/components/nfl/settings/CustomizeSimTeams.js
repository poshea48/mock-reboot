import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Fieldset from '../../styles/Fieldset';
import Description from '../../styles/Description';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CustomFieldset = styled(Fieldset)`
  height: calc(100% - 30px);
`;
const CustomizeSimTeams = ({ simulationDisplay }) => {
  return (
    <Container>
      <Description>
        <p>** unCheck Teams to manually draft **</p>
      </Description>
      <Fieldset styles={{ height: '100%' }}>{simulationDisplay}</Fieldset>
    </Container>
  );
};

CustomizeSimTeams.propTypes = {
  simulationDisplay: PropTypes.array.isRequired,
};
export default CustomizeSimTeams;
