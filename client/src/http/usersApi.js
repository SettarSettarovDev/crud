import { authHost } from './index';

export const getAllUsers = async () => {
  const { data } = await authHost.get('api/users');
  return data;
};

export const changeUser = async (userId, user) => {
  const { data } = await authHost.put(`api/users/${userId}`, user);
  return data;
};

export const removeUser = async userId => {
  const { data } = await authHost.delete(`api/users/${userId}`);
  return data;
};
