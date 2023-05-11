import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import StepContainer from '../../../components/StepContainer/StepContainer';
import StepTitle from '../../../components/StepContainer/StepTitle';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer';
import RadioOption from '../../../components/StepContainer/RadioOption';
import useTicketType from '../../../hooks/api/useTicketType';
import { useEffect, useState } from 'react';
import Button from '../../../components/Form/Button';

export default function Payment() {
  const { ticketTypesLoading, ticketTypes } = useTicketType();
  const [ticketSelected, setTicketSelected] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (ticketSelected) {
      const type = ticketTypes.filter(tt => tt.name === ticketSelected);
      if (ticketSelected === 'Presencial') {
        if (hotel === 'Com Hotel') {
          setPrice((type[0].price / 100) + 100 + ',00');
          return;
        }
        else {
          setPrice(type[0].price / 100 + ',00');
          return;
        }
      }
      setHotel(null);
      setPrice(type[0].price / 100 + ',00');
    };
  }, [ticketSelected, hotel]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StepContainer>
        <StepTitle>{ticketTypes?.length !== 0 ?
          'Primeiro, escolha sua modalidade de ingresso' :
          'Desculpe, não há ingressos disponíveis'}</StepTitle>
        <OptionsContainer>
          {ticketTypesLoading ? 'Loading...' :
            ticketTypes.map((types) => <RadioOption selectOption={setTicketSelected} key={types.id} text={types.isRemote ? 'Online' : 'Presencial'} subtext={`R$ ${(types.price / 100) + ',00'}`} name="ticketType" />)}
        </OptionsContainer>
      </StepContainer>
      {ticketSelected === 'Presencial' &&
        <StepContainer>
          <StepTitle>Ótimo! Agora escolha sua modalidade de hospedagem</StepTitle>
          <OptionsContainer>
            <RadioOption selectOption={setHotel} text={'Sem Hotel'} subtext={'+ R$ 0'} name="withHotel" />
            <RadioOption selectOption={setHotel} text={'Com Hotel'} subtext={'+ R$ 100'} name="withHotel" />
          </OptionsContainer>
        </StepContainer>}
      {(ticketSelected === 'Online' || hotel !== null) &&
        <StepContainer>
          <StepTitle>Fechado! O total ficou em R$ {price}. Agora é só confirmar:</StepTitle>
          <OptionsContainer>
            <Button onClick={() => console.log('clicado')} type="submit">
              RESERVAR INGRESSO
            </Button>
          </OptionsContainer>
        </StepContainer>}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
