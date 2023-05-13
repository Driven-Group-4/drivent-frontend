import useAsync from '../useAsync';
import * as ticketAPI from '../../services/ticketAPI.js';
import useToken from '../useToken';

export default function useGetTicket() {
  const token = useToken();
  const {
    data: userTicket,
    loading: userTicketLoading,
    error: userTicketError,
    act: getTicket,
  } = useAsync(() => ticketAPI.getTicket(token));

  return {
    userTicket,
    userTicketLoading,
    userTicketError,
    getTicket,
  };
}
