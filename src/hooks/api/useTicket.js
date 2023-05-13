import useAsync from '../useAsync';
import * as ticketAPI from '../../services/ticketAPI.js';

export default function useTicket() {
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: postTicketReserv,
  } = useAsync(ticketAPI.postTicketReserv, false);

  return {
    ticket,
    ticketLoading,
    ticketError,
    postTicketReserv
  };
}
