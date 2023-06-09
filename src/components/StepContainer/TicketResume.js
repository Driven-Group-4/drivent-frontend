import styled from 'styled-components';

export default function TicketResume({ text, subtext, name }) {
  return (
    <CheckLabel>
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
  width: 290px;
  height: 108px;
  border-radius: 20px;

  border: none;
  background-color: #FFEED2;

  & span {
    z-index: 1;
  }
`;

// const CheckOption = styled.input`
//   position: absolute;
//   appearance: none;
//   outline: none;
//   border: 1px solid #CECECE;
//   border-radius: 20px;
//   cursor: pointer;
//   height: 100%;
//   width: 100%;

//   &:checked {
//     border: none;
//     background-color: #FFEED2;
//   }
// `;

const RadioText = styled.span`
  font-size: 16px;
`;

const RadioSubtext = styled.span`
  font-size: 14px;
  color: #898989;
`;
