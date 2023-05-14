import useAsync from '../useAsync';
import * as ticketAPI from '../../services/ticketAPI.js';

export default function usePayment() {
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: paymentProcess,
  } = useAsync(ticketAPI.paymentProcess, false);

  return {
    payment,
    paymentLoading,
    paymentError,
    paymentProcess
  };
}
