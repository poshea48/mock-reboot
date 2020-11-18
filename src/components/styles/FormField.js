import styled from '@emotion/styled';

const FormField = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 0.5em;
  label {
    width: 160px;
    color: #fff; /*${(p) => p.theme.colors.primaryPalette.eerieBlack};*/
    font-weight: 900;
  }
  select {
    flex: 1 auto;
    border: 1px solid ${(p) => p.theme.colors.primaryPalette.eerieBlack};
    color: ${(p) => p.theme.colors.primaryPalette.dodgerBlue};
    text-transform: uppercase;
    font-weight: 800;
    &:disabled {
      opacity: 0.5;
    }
  }
  option {
    padding: 0.5em;
  }

  .error {
    margin-left: 160px;
    width: 100%;
    background: #fff;
    padding: 1em 0;
    border: 1px solid black;
    border-radius: 5px;
    p {
      margin: 0;
      color: red;
      text-align: center;
      text-transform: uppercase;
      font-weight: 800;
    }
  }
  @media screen and (max-width: 450px) {
    flex-direction: column;
    margin: 0;
    label {
      align-self: center;
      text-align: center;
    }
  }
`;

export default FormField;
