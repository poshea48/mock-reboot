import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useNflDispatch } from '../../../context/nflContext';
import { useAppDispatch } from '../../../context/appContext';

const Button = styled.button`
  border: 4px solid black;
  background: ${p => p.theme.colors.primaryPalette.gray};
  margin-left: 0.5em;
  color: #80000d;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 900;
  width: ${p => (p.mini ? '40px' : '50px')};
  height: ${p => (p.mini ? '40px' : '50px')};
  cursor: pointer;
  padding: 0;
`;
const ResetButton = ({ mini, disabled, title, settingsDispatch }) => {
  const nflDispatch = useNflDispatch();
  const appDispatch = useAppDispatch();

  const handleReset = async () => {
    if (settingsDispatch) {
      settingsDispatch({
        type: 'reset',
      });
    }

    appDispatch({ type: 'reset' });
    nflDispatch({ type: 'reset' });
  };
  return (
    <Button onClick={handleReset} mini={mini} disabled={disabled} title={title}>
      Reset
    </Button>
  );
};

ResetButton.propTypes = {
  mini: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  settingsDispatch: PropTypes.func,
};

export default ResetButton;
