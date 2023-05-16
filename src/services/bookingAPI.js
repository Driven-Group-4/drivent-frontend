import api from './api.js';

export async function getBooking(token) {
  const response = await api.get('/booking/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function bookingRoom(token, roomId) {
  const response = await api.post('/booking', { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
