import { useContext, useEffect, useState } from 'react';
import EventInfoContext from '../../../contexts/EventInfoContext.js';
import StepContainer from '../../../components/StepContainer/StepContainer.js';
import StepTitle from '../../../components/StepContainer/StepTitle.js';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer.js';
import DayCard from '../../../components/StepContainer/DayCard.js';
import useToken from '../../../hooks/useToken';
import { getTicket } from '../../../services/ticketAPI';
import StepPayment from '../../../components/StepContainer/StepPayment';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import StepOnline from '../../../components/StepContainer/StepOnline.js';
import StepActivities from '../../../components/StepContainer/StepActivities.js';
import Local from '../../../components/StepContainer/Local.js';

export default function Activities() {
  const token = useToken();
  const [paid, setPaid] = useState(false);
  const [ selectedDate, setSelectedDate ] = useState(null);
  const { eventInfo } = useContext(EventInfoContext);

  async function getConfirmed() {
    const ticket = await getTicket(token);
    setPaid(ticket);
  }

  const eventDays = [];
  let currentDay = new Date(eventInfo?.startsAt);
  while(currentDay <= new Date(eventInfo?.endsAt)) {
    eventDays.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  useEffect(() => {
    getConfirmed();
    console.log(eventInfo);
  }, []);

  // useEffect(() => {

  // }, []);

  return (
    <>
      <StyledTypography variant='h4'>Escolha de atividades</StyledTypography>
      {paid.status !== 'PAID' && <StepPayment>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</StepPayment>}
      {
        (paid.status === 'PAID' && paid.TicketType.isRemote === true) && 
          <StepOnline>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades</StepOnline>
      }
      {
        (paid.status === 'PAID' && paid.TicketType.isRemote === false) && 
          <StepContainer>
            <StepTitle>Primeiro, filtre pelo dia do evento: </StepTitle>
            <OptionsContainer>
              { eventDays.map((day, i) => <DayCard key={i} date={day} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />) }
            </OptionsContainer>
          </StepContainer>
      }
      {
        selectedDate &&
        <StepActivities>
          {
            eventInfo.Location.map((local) =>
              <Local key={local.id} name={local.name} startsAt={local.startsAt} endsAt={local.endsAt} activities={local.Activity} />)
          }
        </StepActivities>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
