/* eslint-disable prettier/prettier */
import { draftOrderObject } from '../data/draftOrder';

const getCurrentTeam = (currentPick, currentRound) => {
  return draftOrderObject[currentRound].find(s => s.overallPick === currentPick)
    .team;
};

const getNextTeamUp = (currentPick, currentRound) => {
  const roundArray = draftOrderObject[currentRound];
  const currentSelectionIndex = draftOrderObject[currentRound].findIndex(
    s => s.overallPick === currentPick
  );
  const lastPick = roundArray[roundArray.length - 1].overallPick;
  const advanceRound = currentPick === lastPick && currentRound !== 7;

  // last pick in draft
  if (currentRound === 7 && currentPick === lastPick) {
    return 'N/A';
  }
  if (advanceRound) {
    return draftOrderObject[currentRound + 1][0].team;
  } else {
    return draftOrderObject[currentRound][currentSelectionIndex + 1].team;
  }
};

export { getCurrentTeam, getNextTeamUp };
