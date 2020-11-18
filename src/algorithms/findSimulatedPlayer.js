// teakes in a players object {name: '', pos: ''}
const findSimulatedPlayer = (players, teamNeeds) => {
  let draftedPlayer;
  let currentPlayer;
  let score;
  let rank = 0.99;
  let pos;
  players.forEach((player, i) => {
    currentPlayer = { ...player };
    pos = player.pos.match(/OT|OG|OC/) ? 'OL' : player.pos;
    score = teamNeeds[pos].wt * rank;
    currentPlayer.score = score;
    if (i === 0) {
      draftedPlayer = currentPlayer;
    } else if (currentPlayer.score > draftedPlayer.score) {
      draftedPlayer = currentPlayer;
    }
    rank -= 0.01;
  });
  return draftedPlayer;
};

// will take in position need from a team => {wt: .4, total: 2, drafted: 1}
const updateTeamNeeds = (teamNeed) => {
  let newPosNeed = {};
  const { wt, total, drafted } = teamNeed;
  newPosNeed.wt = (wt * (total - (drafted + 1))) / total;
  newPosNeed.total = total;
  newPosNeed.drafted = drafted + 1;
  return newPosNeed;
};

export { updateTeamNeeds };
export default findSimulatedPlayer;
