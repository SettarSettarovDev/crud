import { $host, $authHost } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (
  userName,
  userEmail,
  userPassword,
  userRole
) => {
  const { data } = await $host.post('api/users/registration', {
    userName,
    userEmail,
    userPassword,
    userRole,
  });
  localStorage.setItem('token', data);
  return jwt_decode(data);
};

export const login = async (userEmail, userPassword) => {
  const { data } = await $host.post('api/users/login', {
    userEmail,
    userPassword,
  });
  localStorage.setItem('token', data);
  return jwt_decode(data);
};

export const check = async () => {
  const { data } = await $authHost.get('api/users/auth');
  localStorage.setItem('token', data);
  return jwt_decode(data);
};
