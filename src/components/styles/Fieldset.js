import styled from '@emotion/styled';

const FieldsetContainer = styled.div`
  position: relative;
  flex: 1 auto;
  margin: 0;
  display: flex;
  border: 1px solid silver;
  justify-content: center;
  overflow: hidden;
  background: ${p => p.theme.colors.primaryPalette.eerieBlack};
  width: 100%;
  h4 {
    padding: 1em;
    color: #fff;
    text-align: center;
    width: 100%;
  }
  @media screen and (max-width: 450px) {
    height: calc(100% - 80px);
  }
`;
const Fieldset = styled.fieldset`
  flex: 1 auto;
  padding: 0.5em 0;
  display: flex;
  border: 1px solid silver;
  flex-direction: column;
  background: ${p => p.theme.colors.primaryPalette.eerieBlack};
  color: #fff;
  justify-content: center;
  width: 100%;
  overflow-y: scroll;
  margin: 0;
  .content {
    display: flex;
    padding: 0 0.5em;
    margin-bottom: 0.2em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    min-height: 30px;
    label {
      width: 250px;
      color: #fff;
      text-transform: uppercase;
      @media screen and (max-width: 500px) {
        margin-bottom: 0.5em;
        font-size: 14px;
      }
    }
    input {
      align-self: center;
      color: #fff;
    }
  }

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
