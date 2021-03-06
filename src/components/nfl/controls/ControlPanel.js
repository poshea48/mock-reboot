import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useNflState, useNflDispatch } from '../../../context/nflContext';
import { useAppDispatch } from '../../../context/appContext';
import ResetButton from './ResetButton';

const ControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 55px;
  width: 150px;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  padding: 0;
  border-radius: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${({ color }) => (color === 'pause' ? 'gray' : 'green')};
  span {
    font-size: 1.2em;
    align-self: center;
    height: 20px;
  }
  .action {
    font-size: 1em;
    font-weight: 900;
  }
  @media screen and(max-width: 600px) {
    right: 0;
  }
`;
const ControlPanel = ({ handleDraftPlay }) => {
  const {
    state: { finished, started, paused, manualTeams },
  } = useNflState();
  const { nflDispatch, settingsDispatch } = useNflDispatch();
  const appDispatch = useAppDispatch();
  const show = manualTeams.length !== 32;

  const handleReset = () => {
    appDispatch({ type: 'reset' });
    nflDispatch({ type: 'reset' });
    settingsDispatch({ type: 'reset' });
  };

  return !finished && show ? (
    <ControlsWrapper>
      <Button
        onClick={handleDraftPlay}
        color={!started ? 'begin' : paused ? 'play' : 'pause'}
      >
        {!started ? (
          <>
            <span className="action">Start Draft</span>
            <span
              role="img"
              title="start draft"
              aria-label="start draft action"
            >
              ▶️
            </span>
          </>
        ) : paused ? (
          <>
            <span className="action">Resume</span>
            <span role="img" title="resume" aria-label="resume draft action">
              ▶️
            </span>
          </>
        ) : (
          <>
            <span className="action">Pause</span>
            <span role="img" title="pause" aria-label="pause draft action">
              ⏸
            </span>
          </>
        )}
      </Button>
      <ResetButton
        resetFunc={handleReset}
        mini={true}
        title="Start new draft"
      />
    </ControlsWrapper>
  ) : (
    <ControlsWrapper>
      <ResetButton
        mini={true}
        title="Start new Draft"
        resetFunc={handleReset}
      />
    </ControlsWrapper>
  );
};

ControlPanel.propTypes = {
  handleDraftPlay: PropTypes.func.isRequired,
};
export default ControlPanel;
