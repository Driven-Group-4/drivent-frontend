import styled from 'styled-components';

const DAY_OF_WEEK = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export default function DayCard({ date, selectedDate, setSelectedDate }) {
  const weekDay = date.getDay();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const formattedDate = `${DAY_OF_WEEK[weekDay]}, ${day < 10 ? '0' + day: day}/${month < 10 ? '0' + month : month}`;

  return (
    <DayContainer isSelected={selectedDate?.getTime() === date.getTime()} onClick={() => setSelectedDate(date)}>
      <DayValue>{formattedDate}</DayValue>
    </DayContainer>
  );
}

const DayContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.isSelected ? '#FFD37D' : '#E0E0E0'};
    border-radius: 4px;
    width: 130px;
    height: 40px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`;

const DayValue = styled.span`
    font-size: 14px;
    font-weight: 400;
`;
