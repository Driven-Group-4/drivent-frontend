import useAsync from '../useAsync';
import * as ticketAPI from '../../services/ticketAPI.js';
import useToken from '../useToken';

export default function useTicketType() {
  const token = useToken();
  const {
    data: ticketTypes,
    loading: ticketTypesLoading,
    error: ticketTypesError,
    act: getTicketTypes,
  } = useAsync(() => ticketAPI.getTicketTypes(token));

  return {
    ticketTypes,
    ticketTypesLoading,
    ticketTypesError,
    getTicketTypes,
  };
}
