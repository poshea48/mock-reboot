import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Field from '../../styles/FormField';

const Container = styled(Field)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 35px;
  flex-basis: 35px;
  padding: 0 2px;
  margin-bottom: 0;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    justify-content: center;
    flex-basis: 95px;
    min-height: 95px;
  }
`;

const ToggleFieldButton = styled.button`
  color: #fff;
  background: ${p =>
    p.open ? p.theme.colors.primaryPalette.eerieBlack : 'transparent'};
  border: none;
  cursor: pointer;
  align-self: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 800;
  flex-basis: calc(100% / 3);
  padding: 0.25em;
  height: 100%;
  &:disabled {
    opacity: 0.5;
  }
  &:active,
  &:focus {
    outline: dodgerblue auto 2px;
  }
`;

const CustomizeTypesNav = ({ handleTypeSelect, open }) => {
  return (
    <Container>
      <ToggleFieldButton
        data-type="teamNeeds"
        onClick={handleTypeSelect}
        open={open.teamNeeds}
      >
        Team Needs
      </ToggleFieldButton>
      <ToggleFieldButton
        data-type="draftboard"
        onClick={handleTypeSelect}
        open={open.draftboard}
      >
        Draftboard
      </ToggleFieldButton>
      <ToggleFieldButton
        open={open.simTeams}
        onClick={handleTypeSelect}
        data-type="simTeams"
      >
        Sim Teams
      </ToggleFieldButton>
    </Container>
  );
};

CustomizeTypesNav.propTypes = {
  handleTypeSelect: PropTypes.func.isRequired,
  open: PropTypes.object.isRequired,
};
export default CustomizeTypesNav;
