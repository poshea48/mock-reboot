/* eslint-disable prettier/prettier */
import draftOrder from '../data/draftOrder';

const getCurrentTeam = (currentPick, currentRound) => {
  return draftOrder[currentRound - 1][(currentPick - 1) % 32];
};

const getNextTeamUp = (currentPick, currentRound) => {
  let nextPick =
    currentRound === 7 && currentPick % 32 === 0 ? 'n/a' : currentPick + 1;
  let nextRound = advanceRound ? currentRound + 1 : currentRound;
  const advanceRound = currentPick % 32 === 0 && currentRound !== 7;
  if (advanceRound) {
    return draftOrder[nextRound - 1][0];
  } else {
    return draftOrder[nextRound - 1][(nextPick - 1) % 32];
  }
};

export { getCurrentTeam, getNextTeamUp };
