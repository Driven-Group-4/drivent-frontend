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
import { bookingRoom, changeBooking, getBooking } from '../../../services/bookingAPI';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function Hotel() {
  const token = useToken();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [booking, setBooking] = useState(null);
  const [changingRoom, setChangingRoom] = useState(false);
  const { userBooking } = useBooking();

  const { hotels } = useHotels();

  async function handleBooking(e) {
    e.preventDefault();

    if (!changingRoom) {
      try {
        await bookingRoom(token, selectedRoom.id);
        toast('Reserva efetuada com sucesso');
        const actualbooking = await getBooking(token);
        setBooking(actualbooking);
        setSelectedHotel(null);
        setSelectedRoom(null);
      } catch (error) {
        toast(error.message);
      }
    } else {
      const actualbooking = await getBooking(token);
      await changeBooking(token, selectedRoom.id, actualbooking.id);
    }
  }

  function changeRoom(e) {
    e.preventDefault();

    hotels.forEach(h => {
      h.Rooms.forEach(r => {
        if (r.id === booking.Room.id) {
          setSelectedRoom(r);
          setSelectedHotel(h);
        }
      });
    });

    setBooking(null);
    setChangingRoom(true);
  }

  useEffect(() => {
    setBooking(userBooking);
  }, [userBooking]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {booking ?
        <>
          <StepContainer>
            <StepTitle>Você já escolheu seu quarto:</StepTitle>
            <OptionsContainer>
              <HotelCard hotelInfo={hotels?.find(h => h.id === booking?.Room?.hotelId)} reserved={booking} />
            </OptionsContainer>
          </StepContainer>
          <StepContainer>
            <Button onClick={(e) => changeRoom(e)} type="submit">
              TROCAR DE QUARTO
            </Button>
          </StepContainer>
        </>
        :
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
