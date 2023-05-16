import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import StepContainer from '../../../components/StepContainer/StepContainer';
import StepTitle from '../../../components/StepContainer/StepTitle';
import useHotels from '../../../hooks/api/useHotel.js';
import HotelCard from '../../../components/StepContainer/HotelCard';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer';
import { useState } from 'react';
import RoomOption from '../../../components/StepContainer/RoomOption';
import Button from '../../../components/Form/Button';
import { postTicketReserv } from '../../../services/ticketAPI';
import { getTicket } from '../../../services/ticketAPI';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const [ selectedHotel, setSelectedHotel ] = useState(null);
  const [ selectedRoom, setSelectedRoom ] = useState(null);
  const { hotels } = useHotels();
  const [resume, setResume] = useState(false);
  const token = useToken();
  const ticket = getTicket(token);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <StepContainer>
        <StepTitle onClick={() => console.log(ticket)}>{hotels?
          'Primeiro, escolha seu hotel':
          'Desculpe, não há hotéis disponíveis'
        }</StepTitle>
        <OptionsContainer>
          { hotels?.map((h) => <HotelCard key={h.id} hotelInfo={h} selectedCard={selectedHotel} setSelectedCard={setSelectedHotel} />) }
        </OptionsContainer>
      </StepContainer>
      { selectedHotel &&
          <StepContainer>
            <StepTitle>Ótima pedida! Agora escolha seu quarto</StepTitle>
            <OptionsContainer>
              { selectedHotel?.Rooms?.map((r) => <RoomOption key={r.id} roomInfo={r} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />) }
            </OptionsContainer>
          </StepContainer>
      }
      { selectedRoom && 
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
