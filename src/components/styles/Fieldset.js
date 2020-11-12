import styled from '@emotion/styled';

const FieldsetContainer = styled.div`
  position: relative;
  flex: 1 auto;
  margin: 0;
  display: flex;
  border: 1px solid silver;
  justify-content: center;
  height: calc(100% - 30px);
  background: ${(p) => p.theme.colors.primaryPalette.eerieBlack};
  width: 100%;
  h4 {
    padding: 1em;
    color: #fff;
    text-align: center;
    width: 100%;
  }
`;
const Fieldset = styled.fieldset`
  flex: 1 auto;
  padding: 0.5em 0;
  display: flex;
  border: 1px solid silver;
  flex-direction: column;
  background: ${(p) => p.theme.colors.primaryPalette.eerieBlack};
  color: #fff;
  justify-content: center;
  width: 100%;
  overflow-y: auto;
  margin: 0;
  h4 {
    color: #fff;
    width: 100%;
    text-align: center;
    margin: 1em 0;
  }

  @media screen and (max-width: 500px) {
    label {
      font-size: 14px;
    }
  }
`;

export { FieldsetContainer };
export default Fieldset;
