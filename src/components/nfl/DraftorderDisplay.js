import React, { useState, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import draftOrder from '../../data/draftOrder';

import nflTeams from '../../data/nflTeams';
import { useNflState } from '../../context/nflContext';
import smoothscroll from 'smoothscroll-polyfill';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  min-height: 120px;
  .round-selection {
    display: flex;
    align-self: center;
    h2 {
      margin: 0;
    }
    select {
      margin: 0 0.5em;
    }
    .scroll-to {
      font-size: 12px;
      font-weight: 800;
      color: dodgerblue;
      align-self: center;
      border: none;
      background: transparent;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    @media screen and (max-width: 600px) {
      h2 {
        font-size: 1.2em;
      }
    }
  }

  @media screen and (max-width: 600px) {
    min-height: 99px;
  }
`;

const SelectionList = styled.ul`
  width: 100%;
  display: flex;
  overflow: scroll;
`;

const SelectionLi = styled.li`
  display: flex;
  flex-direction: column;
  background: ${({ team, manual, theme }) =>
    manual ? theme.colors.teamColors[team].primary : 'transparent'};
  color: ${({ manual }) => (manual ? '#fff' : '#000')};
  font-size: 14px;
  width: 300px;
  border-radius: 10px;
  padding: 0.5em 1em;
  box-sizing: border-box;
  &:first-of-type {
    margin: 0;
  }
  span {
    display: inline-block;
    text-align: center;
    width: 100px;
    b {
      background: #0da305;
      box-shadow: 0 2px 8px 1px black;
      color: #fff;
      padding: 0.1em 0.3em;
      border-radius: 10px;
    }
  }
`;
const NUMOFTEAMS = 32;

const DraftorderDisplay = () => {
  const state = useNflState();
  const { currentRound, currentPick } = state;
  let pick;
  let drafted;
  let displayPick;
  let displayInfo;
  const [selectedRound, changeRound] = useState(currentRound);
  const handleRoundChange = e => {
    changeRound(e.target.value);
  };
  const pickWithSuffix = num => {
    if (typeof num !== 'number') return 'N/A';
    const suffix =
      ['st', 'nd', 'rd'][
        (((((num < 0 ? -num : num) + 90) % 100) - 10) % 10) - 1
      ] || 'th';
    return num + suffix;
  };

  const scrollTo = () => {
    smoothscroll.polyfill();

    let element = document.querySelector(`li[data-id='${state.currentPick}']`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    } else {
      changeRound(state.currentRound);
      document.querySelector('li[data-id]').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };
  useLayoutEffect(() => {
    scrollTo();
  }, [state, state.currentPick]);

  const handleScrollToClick = () => {
    scrollTo();
  };
  const abbreviateName = name => {
    let [firstName, rest] = name.split(' ');
    return `${firstName[0]}. ${rest}`;
  };

  const displaySelectionList = draftOrder[selectedRound - 1].map((team, i) => {
    pick = NUMOFTEAMS * (selectedRound - 1) + (i + 1);
    displayPick = pickWithSuffix(pick);
    drafted = state.results[team].filter(p => p.pick === pick)[0];
    if (pick === currentPick && !state.finished) {
      displayInfo = <b>Current</b>;
    } else if (drafted) {
      displayInfo = `${abbreviateName(drafted.player)} | ${drafted.position}`;
    } else {
      displayInfo = state.manualTeams.includes(team) ? 'Manual' : 'Auto';
    }
    return (
      <SelectionLi
        key={team + i}
        data-id={pick}
        team={team}
        manual={state.manualTeams.includes(team)}
      >
        <span>{displayPick}</span>
        <span>{nflTeams[team].code}</span>
        <span>{displayInfo}</span>
      </SelectionLi>
    );
  });

  return (
    <Article>
      <div className="round-selection">
        <label htmlFor="selectedRound">
          <h2>Round</h2>
        </label>
        <select
          name="selectedRound"
          value={selectedRound}
          onBlur={handleRoundChange}
          onChange={handleRoundChange}
        >
          {draftOrder.map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button onClick={handleScrollToClick} className="scroll-to">
          Scroll To current
        </button>
      </div>
      <SelectionList>{displaySelectionList}</SelectionList>
    </Article>
  );
};

export default DraftorderDisplay;
