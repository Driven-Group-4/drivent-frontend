import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import StepContainer from '../../../components/StepContainer/StepContainer';
import StepTitle from '../../../components/StepContainer/StepTitle';
import useHotels from '../../../hooks/api/useHotel.js';
import useBooking from '../../../hooks/api/useBooking.js';
import HotelCard from '../../../components/StepContainer/HotelCard';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer';
import { useState } from 'react';
import RoomOption from '../../../components/StepContainer/RoomOption';
import Button from '../../../components/Form/Button';
import useToken from '../../../hooks/useToken';
import { bookingRoom } from '../../../services/bookingApi';
import { toast } from 'react-toastify';

export default function Hotel() {
  const token = useToken();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { userBooking } = useBooking();

  const { hotels } = useHotels();

  async function handleBooking(e) {
    e.preventDefault();

    try {
      await bookingRoom(token, selectedRoom);
      toast('Reserva efetuada com sucesso');
    } catch (error) {
      toast(error.message);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
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
          <StepTitle>{hotels ?
            'Primeiro, escolha seu hotel' :
            'Desculpe, não há hotéis disponíveis'
          }</StepTitle>
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
          <Button onClick={(e) => handleBooking(e)} type="submit">
            RESERVAR QUARTO
          </Button>
        </StepContainer>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
