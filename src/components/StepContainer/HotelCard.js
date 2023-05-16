import styled from 'styled-components';

export default function HotelCard({ hotelInfo, selectedCard, setSelectedCard }) {
  const hotelCapacity = hotelInfo?.Rooms.reduce((acc, cv) => acc + cv.capacity - cv._count.Booking, 0);

  function calculateHotelAccommodationType() {
    let accomodationType = 'Não há acomodações';

    const capacities = [];
    hotelInfo?.Rooms.forEach((room) => {
      if (!capacities.includes(room.capacity)) capacities.push(room.capacity);
    });
    capacities.sort((a, b) => a - b);

    for (let i = 0; i < capacities.length; i++) {
      if (i === 0) {
        if (capacities[i] === 1) accomodationType = 'Single';
        if (capacities[i] === 2) accomodationType = 'Double';
        if (capacities[i] === 3) accomodationType = 'Triple';
        if (capacities[i] > 3) {
          accomodationType = 'Outros';
          break;
        }
        if (capacities.length === 2 || capacities[i + 1] > 3) accomodationType += ' e ';
        if (capacities.length >= 3 && capacities[i + 1] <= 3) accomodationType += ', ';
      }

      if (i === 1) {
        if (capacities[i] === 2) accomodationType += 'Double';
        if (capacities[i] === 3) accomodationType += 'Triple';
        if (capacities[i] > 3) {
          accomodationType += 'Outros';
          break;
        }
        if (capacities.length > 2 && capacities[i] < 4) accomodationType += ' e ';
      }

      if (i === 2) {
        if (capacities[i] === 3) accomodationType += 'Triple';
        if (capacities[i] > 3) accomodationType += 'Outros';
      }
    }

    return accomodationType;
  }

  return (
    <StyledCard onClick={() => setSelectedCard(hotelInfo)} isSelected={selectedCard?.id === hotelInfo.id}>
      <img src={hotelInfo?.image} alt={`Foto do hotel ${hotelInfo?.name}`} />
      <CardTitle>{hotelInfo?.name}</CardTitle>
      <div>
        <CardSubtitle>Tipos de acomodação:</CardSubtitle><br />
        <CardText>{calculateHotelAccommodationType()}</CardText>
      </div>
      <div>
        <CardSubtitle>Vagas disponíveis:</CardSubtitle><br />
        <CardText>{hotelCapacity}</CardText>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 12px;
  background-color: ${props => props.isSelected ? '#FFEED2' : '#EBEBEB'};
  border-radius: 10px;
  padding: 16px 14px;
  width: 196px;

  & img {
    border-radius: 5px;
    width: 100%;
    height: 110px;
    object-fit: cover;
  }

  :hover{
    cursor: pointer;
  }
`;

const CardTitle = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: #343434;
`;

const CardSubtitle = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #343434;
`;

const CardText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #343434;
`;
