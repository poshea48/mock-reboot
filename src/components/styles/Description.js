import styled from '@emotion/styled';

const Description = styled.div`
  height: 30px;
  padding: 0.25em;
  border-top: 1px solid silver;

  border-left: 1px solid silver;
  border-right: 1px solid silver;
  background: ${p => p.theme.colors.primaryPalette.eerieBlack};
  color: #fff;
  p {
    text-align: center;
    font-size: 12px;
    margin: 0;
    text-transform: uppercase;
  }
  @media screen and (max-width: 550px) {
    height: 20px;
    padding: 0.2em;
    p {
      font-size: 8px;
      /* text-align: left; */
    }
  }
`;

export default Description;
