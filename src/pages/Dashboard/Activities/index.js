import { useContext, useState } from 'react';
import EventInfoContext from '../../../contexts/EventInfoContext.js';
import StepContainer from '../../../components/StepContainer/StepContainer.js';
import StepTitle from '../../../components/StepContainer/StepTitle.js';
import { Typography } from '@material-ui/core';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer.js';
import DayCard from '../../../components/StepContainer/DayCard.js';
import styled from 'styled-components';

export default function Activities() {
  const [ selectedDate, setSelectedDate ] = useState(null);
  const { eventInfo } = useContext(EventInfoContext);

  const eventDays = [];
  let currentDay = new Date(eventInfo?.startsAt);
  while(currentDay <= new Date(eventInfo?.endsAt)) {
    eventDays.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <StepContainer>
        <StepTitle>Primeiro, filtre pelo dia do evento: </StepTitle>
        <OptionsContainer>
          { eventDays.map((day, i) => <DayCard key={i} date={day} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />) }
        </OptionsContainer>
      </StepContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
