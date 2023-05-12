import useAsync from '../useAsync';
import * as hotelAPI from '../../services/hotelAPI.js';
import useToken from '../useToken';

export default function useHotels() {
  const token = useToken();

  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotelsWithRoomsInfo,
  } = useAsync(() => hotelAPI.getHotelsWithRoomsInfo(token));

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    getHotelsWithRoomsInfo,
  };
}
