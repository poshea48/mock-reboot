import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useNflState } from '../../../context/nflContext';
import ResetButton from './ResetButton';

const ControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 55px;
  width: 150px;
  display: flex;
  justify-content: space-between;
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
  const { finished, started, paused, manualTeams } = useNflState();
  const show = manualTeams.length !== 32;

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
      <ResetButton mini={true} title="Start new draft" />
    </ControlsWrapper>
  ) : null;
};

ControlPanel.propTypes = {
  handleDraftPlay: PropTypes.func.isRequired,
};
export default ControlPanel;
