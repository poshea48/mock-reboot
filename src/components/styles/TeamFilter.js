import styled from '@emotion/styled';

const TeamFilter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 90px;
  h2 {
    text-align: center;
    text-transform: uppercase;
    margin: 0;
    font-weight: 700;
    font-size: 1.2em;
    color: ${(p) => p.theme.colors.teamColors[p.team].primary};
  }
  @media screen and (max-width: 600px) {
    padding: 0.8em 0;
    h2 {
      font-size: 1.4em;
    }
  }
  @media screen and (max-width: 450px) {
    padding: 0.5em 0;
    /* flex-direction: row;
    justify-content: space-between; */
    h2 {
      font-size: 1.2em;
    }
  }
  .select-wrapper {
    display: flex;

    label {
      display: inline-block;
      margin: 0 0.25em;
    }
  }
  select {
    font-size: 16px;
    font-weight: 900;
    color: ${(p) => p.theme.colors.teamColors[p.team].primary};
  }
`;

export default TeamFilter;
