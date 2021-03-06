import styled from '@emotion/styled';

const Description = styled.div`
  flex-basis: 30px;
  min-height: 30px;
  padding: 0.25em;
  border-bottom: 1px solid silver;
  background: ${(p) => p.theme.colors.primaryPalette.eerieBlack};
  color: #fff;
  p {
    text-align: center;
    font-size: 12px;
    margin: 0;
    text-transform: uppercase;
  }
  @media screen and (max-width: 550px) {
    /* flex-basis: 20px;
    min-height: 20px; */
    padding: 0.2em;
    p {
      font-size: 8px;
      /* text-align: left; */
    }
  }
`;

export default Description;
