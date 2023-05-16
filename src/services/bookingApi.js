import api from './api.js';

export async function listBooking(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function bookingRoom(token, roomId) {
  const response = await api.get('/booking', { roomId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

