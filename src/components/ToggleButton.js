import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledBurger = styled.button`
  position: absolute;
  display: flex;
  top: 1em;
  right: 1em;
  flex-direction: column;
  justify-content: space-around;
  height: 1.2rem;
  background: transparent;
  z-index: 30;
  border: none;
  cursor: pointer;
  padding: 0;
  &:focus {
    outline: none;
  }
  div {
    width: 1.2rem;
    height: 0.22rem;
    background: ${p => p.theme.colors.teamColors[p.team].primary};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-of-type {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-of-type(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      visibility: ${({ open }) => (open ? 'hidden' : 'visible')};
      transition: visibility .1s ease-out;
      /* transform: ${({ open }) =>
        open ? 'translateX(30px)' : 'translateX(0)'}; */
    }
    &:nth-of-type(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  @media only screen and (min-width: 801px) {
   display: none;
  }
  @media only screen and (max-width: 600px) {
    top: 0.8em;
    right: 0;
  }
  @media only screen and (max-width: 450px) {
    top: 0.5em;
    right: 0em;
  }
`;
const ToggleButton = ({ open, openModal, closeModal, team }) => {
  return (
    <StyledBurger
      aria-label="navigation button"
      open={open}
      team={team}
      onClick={() => (open ? closeModal() : openModal())}
    >
      <div></div>
      <div></div>
      <div></div>
    </StyledBurger>
  );
};
ToggleButton.propTypes = {
  open: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  team: PropTypes.string,
};

export default ToggleButton;
