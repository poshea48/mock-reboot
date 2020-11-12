import React, { useState, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import nflTeams from '../../../data/nflTeams';
import players from '../../../data/players';
import { useNflState } from '../../../context/nflContext';
import smoothscroll from 'smoothscroll-polyfill';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  height: 120px;
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
  @media screen and (max-width: 450px) {
    height: 100px;
  }
  /* @media screen and (max-width: 600px) {
    min-height: 99px;
  } */
`;

const SelectionList = styled.ul`
  width: 100%;
  display: flex;
  overflow: scroll;
  flex: 1 auto;
`;

const SelectionLi = styled.li`
  display: flex;
  flex-direction: column;
  background: ${({ team, manual, theme }) =>
    manual ? theme.colors.teamColors[team].primary : 'transparent'};
  color: ${({ manual }) => (manual ? '#fff' : '#000')};
  font-size: 14px;
  min-width: 160px;
  border-radius: 10px;
  padding: 0.5em;
  box-sizing: border-box;
  &:first-of-type {
    margin: 0;
  }
  span {
    display: inline-block;
    text-align: center;
    width: 100%;
    b {
      display: inline-block;
      background: #0da305;
      box-shadow: 0 2px 8px 1px black;
      color: #fff;
      padding: 0.3em;
      border-radius: 12px;
      vertical-align: middle;
    }
  }
  .team,
  .selection,
  .pos {
    color: ${(p) =>
      p.manual
        ? p.theme.colors.teamColors[p.team].secondary1
        : p.theme.colors.teamColors[p.team].primary};
    font-weight: 800;
  }

  @media screen and (max-width: 450px) {
    font-size: 12px;
    min-width: 120px;
  }
`;

const DraftorderDisplay = () => {
  const {
    state: { currentRound, currentPick, draftOrder, finished, manualTeams },
  } = useNflState();

  let drafted;
  let displayPick;
  let displayInfo;

  const [selectedRound, changeRound] = useState(currentRound);

  const handleRoundChange = (e) => {
    changeRound(e.target.value);
  };

  const pickWithSuffix = (num) => {
    if (typeof num !== 'number') return 'N/A';
    const suffix =
      ['st', 'nd', 'rd'][
        (((((num < 0 ? -num : num) + 90) % 100) - 10) % 10) - 1
      ] || 'th';
    return num + suffix;
  };

  const scrollTo = () => {
    smoothscroll.polyfill();

    let element = document.querySelector(`li[data-id='${currentPick}']`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        // block: 'nearest',
        // inline: 'center',
      });
    } else {
      changeRound(currentRound);
      document.querySelector('li[data-id]').scrollIntoView({
        behavior: 'smooth',
        // block: 'nearest',
        // inline: 'center',
      });
    }
  };
  useLayoutEffect(() => {
    scrollTo();
  }, [currentPick]);

  const handleScrollToClick = () => {
    scrollTo();
  };
  const abbreviateName = (name) => {
    let [firstName, rest] = name.split(' ');
    return `${firstName[0]}. ${rest}`;
  };

  const displaySelectionList = draftOrder[selectedRound].map((selection, i) => {
    let bottomLine = ' ';
    displayPick = pickWithSuffix(selection.overallPick);
    if (selection.overallPick === currentPick && !finished) {
      displayInfo = <b>Current</b>;
    } else if (selection.result) {
      drafted = players[selection.result];
      displayInfo = `${abbreviateName(drafted.name)}`;
      bottomLine = `${drafted.pos}`;
    } else {
      displayInfo = manualTeams.includes(selection.team)
        ? 'Your Pick'
        : 'Auto Pick';
    }
    return (
      <SelectionLi
        key={selection.team + i}
        data-id={selection.overallPick}
        team={selection.team}
        manual={manualTeams.includes(selection.team)}
      >
        <span>{displayPick}</span>
        <span className="team">{nflTeams[selection.team].code}</span>
        <span className="selection">{displayInfo}</span>
        <span className="pos">{bottomLine}</span>
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
          {Object.keys(draftOrder).map((round) => (
            <option key={round} value={round}>
              {round}
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
