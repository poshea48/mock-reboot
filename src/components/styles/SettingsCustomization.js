import styled from '@emotion/styled';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${(p) => p.theme.colors.primaryPalette.eerieBlack};
  border: 1px solid silver;
  flex: 1 auto;
  color: #fff;
  height: calc(100% - 61px); /* label(26px) + customizeNav(35) */
  @media screen and (max-width: 450px) {
    height: calc(100% - 116px); /* label(26) + customizeNav(95) */
  }
`;

const Description = styled.div`
  flex-basis: 30px;
  min-height: 30px;
  padding: 0.25em;
  background: ${(p) => p.theme.colors.primaryPalette.eerieBlack};
  border-bottom: 1px solid silver;
  color: #fff;
  p {
    text-align: center;
    font-size: 12px;
    color: #fff;
    margin: 0;
    text-transform: uppercase;
  }
  @media screen and (max-width: 550px) {
    /* flex-basis: 20px;
    min-height: 20px; */
    padding: 0.2em;
    p {
      font-size: 10px;
      /* text-align: left; */
    }
  }
`;

const DataContainer = styled.div`
  flex: 1 auto;
  max-height: calc(100% - 30px);
  overflow-y: auto;
`;

export { ContentWrapper, Description, DataContainer };
