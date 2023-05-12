import api from './api.js';

export async function getHotelsWithRoomsInfo(token) {
  const response = await api.get('/hotels/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
