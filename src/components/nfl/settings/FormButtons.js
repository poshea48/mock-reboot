import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ResetButton from '../controls/ResetButton';

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 45px;
  flex-basis: 45px;
`;

const SubmitButton = styled.button`
  width: 150px;
  height: 40px;
  align-self: center;
  background: ${p => p.theme.colors.primaryPalette.gray};
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
  color: ${p => p.theme.colors.primaryPalette.eerieBlack};
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:focus {
    outline: none;
    transform: scale(1.1);
  }

  @media screen and (max-width: 400px) {
    font-weight: 800;
    font-size: 1em;
  }
`;
const FormButtons = ({ submitForm, isNflSetup, handleReset }) => {
  return (
    <ButtonsWrapper>
      <SubmitButton onClick={submitForm}>
        {isNflSetup ? 'Update' : 'Submit'}
      </SubmitButton>

      {isNflSetup && <ResetButton mini={false} resetFunc={handleReset} />}
    </ButtonsWrapper>
  );
};

FormButtons.propTypes = {
  submitForm: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  isNflSetup: PropTypes.bool.isRequired,
};

export default FormButtons;
