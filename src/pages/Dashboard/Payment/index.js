import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import StepContainer from '../../../components/StepContainer/StepContainer';
import StepTitle from '../../../components/StepContainer/StepTitle';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer';
import RadioOption from '../../../components/StepContainer/RadioOption';
import useTicketType from '../../../hooks/api/useTicketType';
import { useEffect, useState } from 'react';
import Button from '../../../components/Form/Button';
import TicketResume from '../../../components/StepContainer/TicketResume';
import PaymentForm from '../../../components/StepContainer/CreditCard';
import vectorLogo from '../../../assets/images/vector.png';

export default function Payment() {
  const { ticketTypesLoading, ticketTypes } = useTicketType();
  const [ticketSelected, setTicketSelected] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [price, setPrice] = useState(null);

  const [finished, setFinished] = useState(false);

  const [show, setShow] = useState(true);

  useEffect(() => {
    if (ticketSelected) {
      const type = ticketTypes.filter(tt => tt.name === ticketSelected);
      if (ticketSelected === 'Presencial') {
        if (hotel === 'Com Hotel') {
          setPrice((type[0]?.price / 100) + 100 + ',00');
          return;
        }
        else {
          setPrice(type[0]?.price / 100 + ',00');
          return;
        }
      }
      setHotel(null);
      setPrice(type[0]?.price / 100 + ',00');
    };
  }, [ticketSelected, hotel]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!finished ?
        <>

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
                <Button onClick={() => setFinished(true)} type="submit">
                  RESERVAR INGRESSO
                </Button>
              </OptionsContainer>
            </StepContainer>}
        </>
        :
        <>
          <StepContainer>
            <StepTitle>
              Ingresso escolhido
            </StepTitle>
            <OptionsContainer>
              <TicketResume text={hotel ? ticketSelected + ' + ' + hotel : ticketSelected} subtext={'R$ ' + price} name="selectedTicket" />
            </OptionsContainer>
          </StepContainer>

          {show ?
            <>
              <StepContainer>
                <StepTitle>
                  Pagamento
                </StepTitle>
                <OptionsContainer>
                  <PaymentForm />
                </OptionsContainer>
              </StepContainer>
              <StepContainer>
                <Button onClick={() => setShow(!show)} type="submit">
                  FINALIZAR PAGAMENTO
                </Button>
              </StepContainer>
            </>
            :
            <><StepTitle>
              Pagamento
            </StepTitle>
            <PaymentConfirmed>
              <ImageConfirmed src={vectorLogo} alt="confirmado" />
              <PageConfirmed>
                <b><p>Pagamento confirmado!</p></b>
                <p>Prossiga para escolha de hospedagem e atividades</p>
              </PageConfirmed>
            </PaymentConfirmed>
            </>}
          
        </>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
const ImageConfirmed = styled.img`
  width:40.33px;
`;
const PaymentConfirmed = styled.div`
  display:flex;
  flex-direction:row;
`;
const PageConfirmed = styled.div`
  display: flex;
  flex-direction:column;
  margin-left:13.83px;
  justify-content:center;
  p:nth-child(1){
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }
  p:nth-child(2){
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }
  
`;
