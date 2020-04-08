import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FieldsetContainer } from '../../styles/Fieldset';
import Description from '../../styles/Description';
import NFLTEAMS from '../../../data/nflTeams';
import { useNflState } from '../../../context/nflContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 auto;
  height: calc(100% - 61px); /* label(26px) + customizeNav(35) */
  @media screen and (max-width: 450px) {
    height: calc(100% - 121px); /* label(26) + customizeNav(95) */
  }
`;

const TeamsList = styled.ul`
  flex-basis: 120px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  /* height: calc(100% - 30px); */
  overflow-y: scroll;
  padding: 0.5em 0;
  li {
    position: relative;
    text-align: center;
    font-size: 20px;
    font-weight: 900;
    height: 30px;
    margin-bottom: 0.2em;
    .selected {
      background: #fff !important;
      color: ${p => p.theme.colors.primaryPalette.eerieBlack} !important;
    }
    button {
      background: transparent;
      width: 100%;
      border: none;
      color: #fff;
      cursor: pointer;

      &:hover {
        background: ${p => p.theme.colors.primaryPalette.gray};
        color: ${p => p.theme.colors.primaryPalette.eerieBlack};
      }
    }
    @media screen and (max-width: 500px) {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 450px) {
    flex-basis: 80px;
    min-width: 80px;
  }
`;

const Fieldset = styled.fieldset`
  flex: 1 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  color: ${p => p.theme.colors.primaryPalette.eerieBlack};
  border-top: none;
  border-right: none;
  border-bottom: none;
  background: #fff;
  margin: 0;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 30px;
  flex-basis: 30px;
  opacity: 0.95;
  text-align: center;
  background: #fff;
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
  h3 {
    font-weight: 900;
    font-size: 18px;
    align-self: center;
  }
`;

const NeedsList = styled.ul`
  flex: 1 auto;
  display: flex;
  padding-top: 0.2em;
  flex-direction: column;
  justify-content: space-between;
  height: ${p => (p.short ? 'calc(100% - 60px)' : 'calc(100% - 30px)')};
  overflow-y: scroll;
  li {
    display: flex;
    min-height: 30px;
    justify-content: center;
    border-bottom: 1px solid ${p => p.theme.colors.primaryPalette.eerieBlack};
    padding: 0.25em;
    label {
      min-width: 60px;
      color: ${p => p.theme.colors.primaryPalette.eerieBlack};
      text-transform: uppercase;
    }
    .increment {
      width: 100px;
      display: flex;
      justify-content: space-between;
      margin: 0;
      button {
        height: 20px;
        height: 25px;
        width: 25px;
        padding: 0;
      }
    }
  }
`;

const SaveButton = styled.button`
  width: 100%;
  height: 30px;

  background: ${p => p.theme.colors.primaryPalette.dodgerBlue};
  color: ${p => p.theme.colors.primaryPalette.eerieBlack};
  text-align: center;
  border: none;
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  text-transform: uppercase;
  font-weight: 800;
  cursor: pointer;
`;

const Saved = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  background: green;
  color: #fff;
  text-align: center;
  border: none;
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  color: #fff;
  h5 {
    align-self: center;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 800;
  }
  button {
    position: absolute;
    height: 10px;
    top: 0;
    color: #fff;
    right: 0.25em;
    font-weight: 800;
    font-size: 14px;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }
`;

const initialPositions = [
  { pos: 'QB', wt: 0 },
  { pos: 'RB', wt: 0 },
  { pos: 'WR', wt: 0 },
  { pos: 'TE', wt: 0 },
  { pos: 'OL', wt: 0 },
  { pos: 'EDGE', wt: 0 },
  { pos: 'DL', wt: 0 },
  { pos: 'LB', wt: 0 },
  { pos: 'S', wt: 0 },
  { pos: 'CB', wt: 0 },
];

const CustomizeTeamNeeds = ({ handleTeamNeedsCustomization }) => {
  const [team, changeTeam] = useState('');
  const [positions, changePositions] = useState(initialPositions);
  const [updated, toggleUpdated] = useState(false);
  const [saved, toggleSaved] = useState(false);
  const {
    state: { teamNeeds },
  } = useNflState();
  const handleTeamClick = e => {
    e.preventDefault();
    e.target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    const team = e.target.parentElement.dataset.team;
    let newPositions = Object.keys(teamNeeds[team])
      .map(pos => {
        return { pos, wt: teamNeeds[team][pos].wt };
      })
      .sort((a, b) => b.wt - a.wt);
    changeTeam(team);
    changePositions(newPositions);
  };
  const increaseWeight = e => {
    e.preventDefault();
    const pos = e.target.parentElement.dataset.pos;
    const posIndex = positions.findIndex(ele => ele.pos === pos);
    const weight = positions[posIndex].wt;
    if (weight === 1) return;
    let newPositions = [...positions];
    newPositions[posIndex].wt = weight + 0.01 > 1 ? 1.0 : weight + 0.01;
    changePositions(newPositions);
    if (!updated) {
      toggleUpdated(true);
    }
  };

  const decreaseWeight = e => {
    e.preventDefault();
    const pos = e.target.parentElement.dataset.pos;
    const posIndex = positions.findIndex(ele => ele.pos === pos);
    const weight = positions[posIndex].wt;
    if (weight === 0) return;
    let newPositions = [...positions];
    newPositions[posIndex].wt = weight - 0.01 <= 0 ? 0 : weight - 0.01;
    changePositions(newPositions);
    if (!updated) {
      toggleUpdated(true);
    }
  };

  const handleSave = e => {
    if (!updated) {
      return;
    }
    e.preventDefault();
    // creates an object of current teams needs {OL: {wt: 1, ...}, QB: {...}}
    let newNeeds = { ...teamNeeds[team] };

    // Iterate thru positions in state and replace newNeeds[pos].wt with state[pos]
    positions.forEach(pos => (newNeeds[pos.pos].wt = pos.wt));
    handleTeamNeedsCustomization(team, newNeeds);
    // changeTeam('');
    changePositions([...positions].sort((a, b) => b.wt - a.wt));
    toggleUpdated(false);
    toggleSaved(true);
  };

  const closeSaved = () => {
    toggleSaved(false);
  };

  let teams = Object.keys(teamNeeds).map(teamCode => (
    <li key={teamCode} data-team={teamCode}>
      <button
        className={teamCode === team ? 'selected' : null}
        onClick={handleTeamClick}
      >
        {teamCode}
      </button>
    </li>
  ));
  const fieldsetData = positions.map(pos => (
    <li key={pos.pos}>
      <label htmlFor={pos.pos}>{pos.pos}</label>
      <div className="increment" data-pos={pos.pos}>
        <button onClick={decreaseWeight} disabled={!team}>
          -
        </button>
        <span>{pos.wt.toFixed(2)}</span>
        <button onClick={increaseWeight} disabled={!team}>
          +
        </button>
      </div>
    </li>
  ));

  return (
    <Wrapper>
      <Description>
        <p>** Select Team and Modify needs from lowest(0) to highest(1.0) **</p>
      </Description>
      {Object.keys(teamNeeds).length === 0 ? (
        <h4>You need to select a Team Needs Type first</h4>
      ) : (
        <FieldsetContainer>
          <TeamsList>{teams}</TeamsList>
          <Fieldset>
            <Header>
              <h3>{team ? NFLTEAMS[team].fullName : 'Select Team'}</h3>
            </Header>
            <NeedsList short={updated || saved}>{fieldsetData}</NeedsList>
            {updated && <SaveButton onClick={handleSave}>Save</SaveButton>}
            {saved && (
              <Saved>
                <h5>Saved!</h5>
                <button onClick={closeSaved} title="close">
                  x
                </button>
              </Saved>
            )}
          </Fieldset>
        </FieldsetContainer>
      )}
    </Wrapper>
  );
};

CustomizeTeamNeeds.propTypes = {
  handleTeamNeedsCustomization: PropTypes.func.isRequired,
};
export default CustomizeTeamNeeds;
