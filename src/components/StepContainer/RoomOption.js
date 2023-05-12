import styled from 'styled-components';
import { BsFillPersonFill, BsPerson } from 'react-icons/bs';

export default function RoomOption(props) {
  const { roomInfo, selectedRoom, setSelectedRoom } = props;
  const capacityArray = [];
  for (let i = 0; i < roomInfo.capacity; i++) {
    capacityArray.push(i >= (roomInfo.capacity - roomInfo._count.Booking));
  }

  return (
    <StyledRoomCard isDisabled={roomInfo.capacity === roomInfo._count.Booking}>
      <span>{roomInfo.name}</span>
      <CapacityContainer>
        { capacityArray.map((booked, i) => 
          booked? <BsFillPersonFill key={i} size={20} /> : selectedRoom?.id === roomInfo.id && (roomInfo.capacity - roomInfo._count.Booking) === (i + 1) ? <BsFillPersonFill key={i} size={20} color='#FF4791' /> : <BsPerson key={i} size={20} />
        ) }
      </CapacityContainer>
      <RoomRadioInput type='radio' name='hotelRoom' onChange={() => setSelectedRoom(roomInfo)} disabled={roomInfo.capacity === roomInfo._count.Booking} />
    </StyledRoomCard>
  );
}

const StyledRoomCard = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  border: 1px solid #CECECE;
  border-radius: 10px;
  padding: 0 12px;
  width: 190px;
  height: 45px;

  & span, div {
    color: ${props => props.isDisabled? '#8C8C8C' : 'black'};
    z-index: 1;
    cursor: ${props => props.isDisabled? 'default' : 'pointer'};
  }
`; 

const RoomRadioInput = styled.input`
  position: absolute;
  appearance: none;
  outline: none;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: 100%;

  :checked {
    background-color: #FFEED2;
  }

  :disabled {
    background-color: #CECECE;
    cursor: default;
  }
  cursor: pointer;
`;

const CapacityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
