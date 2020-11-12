import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNflState } from '../../../context/nflContext';
import OverallResults from './OverallResults';
import TeamResults from './TeamResults';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 90px);
`;

const Header = styled.header`
  flex-basis: 50px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  h1 {
    text-transform: uppercase;
    color: ${p => p.theme.colors.primaryPalette.vanDykeBrown};
  }
  @media screen and (max-width: 600px) {
    h1 {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 450px) {
    h1 {
      font-size: 20px;
    }
  }
`;

const ContentWrapper = styled.div`
  flex: 1 auto;
  /* height: calc(100% - 75px); */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  .results-nav {
    width: 100%;
    flex-basis: 75px;
    min-height: 75px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
`;

const ResultTypes = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    flex-basis: 25%;
    text-align: right;
    button {
      border: none;
      background: transparent;
      padding: 0.3em;
      font-size: 0.8em;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
      outline: 0 !important;
    }
    .selected {
      color: ${p => p.theme.colors.primaryPalette.dodgerBlue};
      text-decoration: underline;
      font-weight: 900;
    }
    :last-child {
      text-align: left;
    }
  }
`;

const ResultRounds = styled.ul`
  display: flex;
  position: relative;
  justify-content: flex-start;
  box-shadow: inset 0 -1px 0 ${p => p.theme.colors.primaryPalette.gray};
  /* #cbccce */
  li {
    flex-basis: calc(100% / 7);
    position: relative;
    padding: 0.5em 0;
    button {
      width: 100%;
      border: none;
      background: transparent;
      cursor: pointer;
      outline: 0 !important;
      font-weight: 600;
    }
    .selected {
      color: ${p => p.theme.colors.primaryPalette.dodgerBlue};
      font-weight: 900;
    }
    .pointer {
      bottom: -8px;
      height: 16px;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      width: 16px;
      margin: 0;
      &::before,
      &::after {
        bottom: 0;
        left: 50%;
        border: solid transparent;
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }
      &::before {
        border-color: rgba(203, 204, 206, 0);
        border-bottom-color: ${p => p.theme.colors.primaryPalette.gray};
        border-width: 8px;
        margin-left: -8px;
      }
      &::after {
        border-color: rgba(255, 255, 255, 0);
        border-bottom-color: #f7f7f7;
        border-width: 6px;
        margin-left: -6px;
      }
    }
  }
`;
const ROUNDS = [1, 2, 3, 4, 5, 6, 7];

const Results = () => {
  const { state } = useNflState();
  const [type, changeType] = useState('overall');
  const [round, changeRound] = useState(1);
  const resultRounds = ROUNDS.map(r => (
    <li key={r}>
      <button
        onClick={() => changeRound(r)}
        className={r === round ? 'selected' : null}
      >
        {r}
      </button>
      <div className={r === round ? 'pointer' : 'null'} />
    </li>
  ));

  const resultTypes = (
    <>
      <li>
        <button
          onClick={() => changeType('overall')}
          className={type === 'overall' ? 'selected' : null}
        >
          Overall
        </button>
      </li>
      {'|'}
      <li>
        <button
          onClick={() => changeType('team')}
          className={type === 'team' ? 'selected' : null}
        >
          By Team
        </button>
      </li>
    </>
  );
  if (!state.finished) {
    return (
      <Main>
        <h1>No Results Yet</h1>
      </Main>
    );
  }
  return (
    <Main>
      <Header>
        <h1>2020 Mock Draft Results</h1>
      </Header>
      <ContentWrapper>
        <nav className="results-nav">
          <ResultTypes>{resultTypes}</ResultTypes>
          <ResultRounds>{resultRounds}</ResultRounds>
        </nav>
        {type === 'overall' ? (
          <OverallResults round={round} />
        ) : (
          <TeamResults round={round} />
        )}
      </ContentWrapper>
    </Main>
  );
};

export default Results;
