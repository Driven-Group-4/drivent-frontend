import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import StepContainer from '../../../components/StepContainer/StepContainer';
import StepTitle from '../../../components/StepContainer/StepTitle';
import StepPayment from '../../../components/StepContainer/StepPayment';
import useHotels from '../../../hooks/api/useHotel.js';
import useBooking from '../../../hooks/api/useBooking.js';
import HotelCard from '../../../components/StepContainer/HotelCard';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer';
import { useState } from 'react';
import RoomOption from '../../../components/StepContainer/RoomOption';
import Button from '../../../components/Form/Button';
import { getTicket } from '../../../services/ticketAPI';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { userBooking } = useBooking();
  const { hotels } = useHotels();
  const [paid, setPaid] = useState(false);

  async function getConfirmed() {
    const token = useToken();
    const ticket = await getTicket(token);
    setPaid(ticket);
  }
  getConfirmed();

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <StepContainer>
        <StepTitle>
          
        </StepTitle>
        <OptionsContainer>
          {hotels?.map((h) => <HotelCard key={h.id} hotelInfo={h} selectedCard={selectedHotel} setSelectedCard={setSelectedHotel} />)}
        </OptionsContainer>
      </StepContainer>
      {userBooking &&
        <StepContainer>
          <StepTitle>Você já escolheu seu quarto:</StepTitle>
          <OptionsContainer>
            <HotelCard hotelInfo={hotels?.find(h => h.id === userBooking?.Room?.hotelId)} reserved={userBooking} />
          </OptionsContainer>
        </StepContainer>
      }
      {!userBooking &&
        <StepContainer>
          {paid.status === 'PAID' ?  <StepTitle>{hotels ?
            'Primeiro, escolha seu hotel' :
            'Desculpe, não há hotéis disponíveis'
          }</StepTitle> : <StepPayment>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</StepPayment>}
          <OptionsContainer>
            {hotels?.map((h) => <HotelCard key={h.id} hotelInfo={h} selectedCard={selectedHotel} setSelectedCard={setSelectedHotel} />)}
          </OptionsContainer>
        </StepContainer>
      }
      {selectedHotel &&
        <StepContainer>
          <StepTitle>Ótima pedida! Agora escolha seu quarto</StepTitle>
          <OptionsContainer>
            {selectedHotel?.Rooms?.map((r) => <RoomOption key={r.id} roomInfo={r} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />)}
          </OptionsContainer>
        </StepContainer>
      }
      {selectedRoom &&
        <StepContainer>
          <Button onClick={() => alert('Quase lá')} type="submit">
            FINALIZAR PAGAMENTO
          </Button>
        </StepContainer>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
