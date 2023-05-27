import api from './api';

export async function signInOAuth(code) {
  const response = await api.post('/auth/oauth', { code });
  return response.data;
}
//
