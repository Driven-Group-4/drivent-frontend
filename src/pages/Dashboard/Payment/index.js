import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import StepContainer from '../../../components/StepContainer/StepContainer';
import StepTitle from '../../../components/StepContainer/StepTitle';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer';
import RadioOption from '../../../components/StepContainer/RadioOption';
import useTicketType from '../../../hooks/api/useTicketType';
import { useState } from 'react';

export default function Payment() {
  const { ticketTypesLoading, ticketTypes } = useTicketType();
  const [ ticketSelected, setTicketSelected ] = useState(null);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StepContainer>
        <StepTitle>{ticketTypes?.length !== 0 ?
          'Primeiro, escolha sua modalidade de ingresso' :
          'Desculpe, não há ingressos disponíveis'}</StepTitle>
        <OptionsContainer>
          {ticketTypesLoading ? 'Loading...' : 
            ticketTypes.map((types) => <RadioOption selectOption={setTicketSelected} key={types.id} text={types.isRemote ? 'Online' : 'Presencial'} subtext={`R$ ${types.price}`} name="ticketType" />)}
        </OptionsContainer>
      </StepContainer>
      {ticketSelected === 'Presencial' && 
      <StepContainer>
        <StepTitle>Ótimo! Agora escolha sua modalidade de hospedagem</StepTitle>
        <OptionsContainer>
          <RadioOption text={'Sem Hotel'} subtext={'+ R$ 0'} name="withHotel" />
          <RadioOption text={'Com Hotel'} subtext={'+ R$ 100'} name="withHotel" />
        </OptionsContainer>
      </StepContainer>}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
