import api from './api.js';

export async function schedulingActivity(token, activityId, startsAt) {
  const response = await api.post('/activities', { activityId, startsAt }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getUserActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function delUserActivity(token, activityId) {
  const response = await api.delete(`/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

