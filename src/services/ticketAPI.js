import api from './api.js';

export async function getTicketTypes(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postTicketReserv(token, ticketTypeId) {
  const response = await api.post('/tickets',
    {
      ticketTypeId: ticketTypeId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response.data;
}

export async function getTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function paymentProcess(token, body) {
  const response = await api.post('/payments/process',
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return response.data;
}
