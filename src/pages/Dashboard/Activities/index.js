import styled from 'styled-components';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getTicket } from '../../../services/ticketAPI';
import StepActivities from '../../../components/StepContainer/StepActivities';
import StepPayment from '../../../components/StepContainer/StepPayment';
export default function Activities() {
  const token = useToken();
  const [paid, setPaid] = useState(false);
  async function getConfirmed() {
    const ticket = await getTicket(token);
    setPaid(ticket);
  }

  getConfirmed();
  return (
    <>
      <StepActivities>Escolha de atividades</StepActivities>
      {paid.status === 'PAID' ? <Title>Primeiro: filtre pelo dia de evento</Title> : <StepPayment>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</StepPayment>}
    </>
  );
};
const Title = styled.p`
  color: #8E8E8E;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin-top:36px;
`;

/* eslint-disable eol-last */
