import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi.js';

export default function useBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: listBooking
  } = useAsync(() => bookingApi.listBooking(token));

  return {
    booking,
    bookingLoading,
    bookingError,
    listBooking
  };
}
