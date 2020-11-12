import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Button = styled.button`
  border: 4px solid black;
  background: ${(p) => p.theme.colors.primaryPalette.gray};
  margin-left: 0.5em;
  color: #80000d;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 900;
  width: ${(p) => (p.mini ? '40px' : '45px')};
  height: ${(p) => (p.mini ? '40px' : '45px')};
  cursor: pointer;
  padding: 0;
`;
const ResetButton = ({ mini, disabled, title, resetFunc }) => {
  return (
    <Button onClick={resetFunc} mini={mini} disabled={disabled} title={title}>
      Reset
    </Button>
  );
};

ResetButton.propTypes = {
  resetFunc: PropTypes.func.isRequired,
  mini: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

export default ResetButton;
