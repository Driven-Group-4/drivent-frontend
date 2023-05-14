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
import useEnrollment from '../../../hooks/api/useEnrollment';
import { toast } from 'react-toastify';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import useGetTicket from '../../../hooks/api/useGetTicket';
import { getTicket } from '../../../services/ticketAPI';

export default function Payment() {
  const token = useToken();
  const { ticketTypesLoading, ticketTypes } = useTicketType();
  const { postTicketReserv } = useTicket();
  const { enrollment, enrollmentLoading } = useEnrollment();
  const { userTicket, userTicketLoading } = useGetTicket();
  const [ticketSelected, setTicketSelected] = useState(null);
  const [type, setType] = useState(0);
  const [hotel, setHotel] = useState(null);
  const [price, setPrice] = useState(null);
  const [resume, setResume] = useState(false);

  const [finished, setFinished] = useState(false);

  const [show, setShow] = useState(true);

  async function handleReserv(e) {
    e.preventDefault();

    if (!enrollment) return toast('Por favor conclua a sua inscição!');

    try {
      console.log(type.id);
      await postTicketReserv(token, type.id);
      const ticket = await getTicket(token);
      setResume(ticket);

      setFinished(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (ticketSelected) {
      if (ticketSelected === 'Presencial') {
        if (hotel === 'Com Hotel') {
          const withHotel = ticketTypes.filter(tt => tt.includesHotel === true);
          setType(withHotel[0]);
          setPrice(withHotel[0]?.price / 100 + ',00');
          return;
        }
        else {
          const withoutHotel = ticketTypes.filter(tt => tt.includesHotel === false);
          setType(withoutHotel[0]);
          setPrice(withoutHotel[0]?.price / 100 + ',00');
          return;
        }
      }
      const tip = ticketTypes.filter(tt => tt.isRemote === true);
      setType(tip[0]);
      setHotel(null);
      setPrice((tip[0]?.price / 100) + ',00');
    };

    if (userTicket) {
      setResume(userTicket);
      setPrice((userTicket.TicketType.price / 100) + ',00');
      setFinished(true);
    }
  }, [ticketSelected, hotel, userTicket]);

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
                ticketTypes.map((types) => types.isRemote ?
                  <RadioOption 
                    selectOption={setTicketSelected} 
                    key={types.id} 
                    onClick={() => console.log(types.id)} 
                    text={types.isRemote ? 'Online' : 'Presencial'} 
                    subtext={`R$ ${(types.price / 100) + ',00'}`} 
                    name="ticketType" 
                  /> 
                  : 
                  types.includesHotel ?
                    <RadioOption 
                      selectOption={setTicketSelected} 
                      text={types.isRemote ? 'Online' : 'Presencial'} 
                      subtext={'R$ 500,00'} 
                      name="ticketType" 
                    />
                    :
                    <div style={{ marginLeft: '-25px' }}></div>
                )
              }

            </OptionsContainer>
          </StepContainer>
          {ticketSelected === 'Presencial' &&
            <StepContainer>
              <StepTitle>Ótimo! Agora escolha sua modalidade de hospedagem</StepTitle>
              <OptionsContainer>
                {
                  ticketTypes.map((types) => types.includesHotel ?
                    <RadioOption
                      selectOption={setHotel} 
                      key={types.id} 
                      text={'Com Hotel'} 
                      subtext={'R$ 100,00'} 
                      name="withHotel" 
                    /> 
                    : !types.isRemote ?
                      <RadioOption
                        selectOption={setHotel} 
                        key={types.id}
                        text={'Sem Hotel'} 
                        subtext={'R$ 0,00'} 
                        name="withHotel" 
                      />
                      :
                      <div></div>
                  )
                }
              </OptionsContainer>
            </StepContainer>}
          {(ticketSelected === 'Online' || hotel !== null) &&
            <StepContainer>
              <StepTitle>Fechado! O total ficou em R$ {price}. Agora é só confirmar:</StepTitle>
              <OptionsContainer>
                <Button onClick={e => handleReserv(e)} type="submit">
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
              {resume ?
                <TicketResume
                  text={
                    resume.TicketType.isRemote ? 'Online' : resume.TicketType.includesHotel ? 'Presencial + Com Hotel' : 'Presencial + Sem Hotel'
                  }
                  subtext={'R$ ' + price}
                  name="selectedTicket" />
                : 'Loading'
              }
            </OptionsContainer>
          </StepContainer>

          {
            show ?
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
              <>
                <StepTitle>
                  Pagamento
                </StepTitle>
                <PaymentConfirmed>
                  <ImageConfirmed src={vectorLogo} alt="confirmado" />
                  <PageConfirmed>
                    <b><p>Pagamento confirmado!</p></b>
                    <p>Prossiga para escolha de hospedagem e atividades</p>
                  </PageConfirmed>
                </PaymentConfirmed>
              </>
          }
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
