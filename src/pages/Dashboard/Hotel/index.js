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
import useToken from '../../../hooks/useToken';
import { bookingRoom, changeBooking, getBooking } from '../../../services/bookingAPI';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { getTicket } from '../../../services/ticketAPI';
import useTicketType from '../../../hooks/api/useTicketType';
import { getHotelsWithRoomsInfo } from '../../../services/hotelAPI';

export default function Hotel() {
  const token = useToken();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [booking, setBooking] = useState(null);
  const [changingRoom, setChangingRoom] = useState(false);
  const { userBooking } = useBooking();
  const { ticketTypes } = useTicketType();
  const [withHotel, setWithHotel] = useState(null);

  const { hotels } = useHotels();
  const [listHotel, setListHotel] = useState(null);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    getConfirmed();
    if (ticketTypes) {
      const test = ticketTypes.filter(tt => tt.includesHotel);
      setWithHotel(test);
    }
  }, [ticketTypes]);

  useEffect(() => {
    setBooking(userBooking);
  }, [userBooking]);

  useEffect(() => {
    setListHotel(hotels);
  }, [hotels]);

  async function getConfirmed() {
    try {
      const ticket = await getTicket(token);
      setPaid(ticket);
    } catch (error) {
      console.error(error);
    }
  }

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
      try {
        const actualbooking = await getBooking(token);
        await changeBooking(token, selectedRoom.id, actualbooking.id);
        const newBooking = await getBooking(token);
        setChangingRoom(false);
        setBooking(newBooking);
        setSelectedHotel(null);
        setSelectedRoom(null);
        toast('Quarto alterado com sucesso');
      } catch (error) {
        toast('Não foi possível alterar o quarto');
      }
    }
  }

  async function changeRoom(e) {
    e.preventDefault();

    try {
      const newHotels = await getHotelsWithRoomsInfo(token);
      setListHotel(newHotels);

      newHotels.forEach(h => {
        h.Rooms.forEach(r => {
          if (r.id === booking.Room.id) {
            setSelectedRoom(r);
            setSelectedHotel(h);
          }
        });
      });

      setBooking(null);
      setChangingRoom(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {booking ?
        <>
          <StepContainer>
            <StepTitle>Você já escolheu seu quarto:</StepTitle>
            <OptionsContainer>
              <HotelCard hotelInfo={listHotel?.find(h => h.id === booking?.Room?.hotelId)} reserved={booking} />
            </OptionsContainer>
          </StepContainer>
          <StepContainer>
            <Button onClick={(e) => changeRoom(e)} type="submit">
              TROCAR DE QUARTO
            </Button>
          </StepContainer>
        </>
        :
        !withHotel ? <div>Loading...</div> :
          <StepContainer>
            {paid.status === 'PAID' ?
              <StepTitle>
                {
                  paid.ticketTypeId !== withHotel[0].id ?
                    'Seu ticket não dá direito a reserva de hotel' : listHotel ?
                      'Primeiro, escolha seu hotel' :
                      'Desculpe, não há hotéis disponíveis'
                }
              </StepTitle> :
              <StepPayment>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</StepPayment>}
            <OptionsContainer>
              {
                listHotel?.map((h) =>
                  <HotelCard
                    key={h.id}
                    hotelInfo={h}
                    selectedCard={selectedHotel}
                    setSelectedCard={setSelectedHotel}
                  />)
              }
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
            {changingRoom ? 'TROCAR DE QUARTO' : 'RESERVAR QUARTO'}
          </Button>
        </StepContainer>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
