import styled from '@emotion/styled';

const DraftedPlayersContent = styled.div`
  display: flex;
  padding: 1em;
  overflow-y: scroll;
  flex-direction: column;
  max-width: 550px;
  color: ${(p) => p.theme.colors.teamColors[p.team].primary};
  background: ${(p) => p.theme.colors.teamColors[p.team].secondary1};

  height: 100%;
  table {
    thead {
      &:hover {
        background: transparent;
      }
    }
    th,
    td {
      text-align: center;
    }
    tbody {
      tr {
        &:hover {
          background: ${(p) => p.theme.colors.teamColors[p.team].primary};
          color: ${(p) => p.theme.colors.teamColors[p.team].secondary1};
        }
      }
    }
  }
  /* @media screen and (max-width: 800px) {
    position: absolute;
    top: 0;
    right: 1em;
    background: ${(p) => p.theme.colors.teamColors[p.team].secondary1};
    max-width: 500px;
    min-width: 0;
    width: ${({ open }) => (open ? '100%' : '0px')};
    z-index: ${({ open }) => (open ? '20' : '-5')};
    transition: 0.5s ease-in-out;
    transform: ${({ open }) => (open ? 'translateX(1em)' : 'translateX(100%)')};
  } */
`;

export default DraftedPlayersContent;
