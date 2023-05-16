import useAsync from '../useAsync';
import * as bookingAPI from '../../services/bookingAPI.js';
import useToken from '../useToken';

export default function useBooking() {
  const token = useToken();

  const {
    data: userBooking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking,
  } = useAsync(() => bookingAPI.getBooking(token));

  return {
    userBooking,
    bookingLoading,
    bookingError,
    getBooking,
  };
}
