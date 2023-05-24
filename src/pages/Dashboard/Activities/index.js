import { useContext, useState } from 'react';
import EventInfoContext from '../../../contexts/EventInfoContext.js';
import StepContainer from '../../../components/StepContainer/StepContainer.js';
import StepTitle from '../../../components/StepContainer/StepTitle.js';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer.js';
import DayCard from '../../../components/StepContainer/DayCard.js';
import useToken from '../../../hooks/useToken';
import { getTicket } from '../../../services/ticketAPI';
import StepActivities from '../../../components/StepContainer/StepActivities';
import StepPayment from '../../../components/StepContainer/StepPayment';
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

  getConfirmed();

  return (
    <>
      <StepActivities>Escolha de atividades</StepActivities>
      {paid.status !== 'PAID' && <StepPayment>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</StepPayment>}
      {paid.status === 'PAID' && (
        <StepContainer>
          <StepTitle>Primeiro, filtre pelo dia do evento: </StepTitle>
          <OptionsContainer>
            { eventDays.map((day, i) => <DayCard key={i} date={day} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />) }
          </OptionsContainer>
        </StepContainer>
      )}
    </>
  );
}

/* eslint-disable eol-last */
