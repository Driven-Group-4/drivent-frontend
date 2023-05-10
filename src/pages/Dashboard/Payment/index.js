import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import StepContainer from '../../../components/StepContainer/StepContainer';
import StepTitle from '../../../components/StepContainer/StepTitle';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer';
import RadioOption from '../../../components/StepContainer/RadioOption';
import useTicketType from '../../../hooks/api/useTicketType';

export default function Payment() {
  const { ticketTypesLoading, ticketTypes } = useTicketType();

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StepContainer>
        <StepTitle>{ticketTypes?.length !== 0 ?
          'Primeiro, escolha sua modalidade de ingresso' :
          'Desculpe, não há ingressos disponíveis'}</StepTitle>
        <OptionsContainer>
          {ticketTypesLoading ? 'Loading...' : 
            ticketTypes.map((types) => <RadioOption key={types.id} text={types.isRemote ? 'Online' : 'Presencial'} subtext={`R$ ${types.price}`} name="ticketType" />)}
        </OptionsContainer>
      </StepContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
