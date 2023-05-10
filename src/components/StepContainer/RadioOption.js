import styled from 'styled-components';

export default function RadioOption({ text, subtext, name, selectOption }) {
  const selectRadio = (text) => {
    if (selectOption) {
      selectOption(text);
    }
  };

  return (
    <CheckLabel onClick={() => selectRadio(text)}>
      <CheckOption type='radio' name={name} />
      <RadioText>{text}</RadioText>
      <RadioSubtext>{subtext}</RadioSubtext>
    </CheckLabel>
  );
}

const CheckLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  width: 150px;
  height: 150px;
  cursor: pointer;

  & span {
    z-index: 1;
  }
`;

const CheckOption = styled.input`
  position: absolute;
  appearance: none;
  outline: none;
  border: 1px solid #CECECE;
  border-radius: 20px;
  cursor: pointer;
  height: 100%;
  width: 100%;

  &:checked {
    border: none;
    background-color: #FFEED2;
  }
`;

const RadioText = styled.span`
  font-size: 16px;
`;

const RadioSubtext = styled.span`
  font-size: 14px;
  color: #898989;
`;
