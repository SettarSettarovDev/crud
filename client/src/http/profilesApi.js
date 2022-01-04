import { host, authHost } from './index';

export const getAllProfiles = async () => {
  const { data } = await authHost.get('api/profiles');
  return data;
};

export const createProfile = async profile => {
  const { data } = await host.post(`api/profiles`, profile);
  return data;
};

export const changeProfile = async (profileId, profile) => {
  const { data } = await host.put(`api/profiles/${profileId}`, profile);
  return data;
};

export const removeProfile = async profileId => {
  const { data } = await host.delete(`api/profiles/${profileId}`);
  return data;
};

export const removeProfiles = async userId => {
  const { data } = await authHost.delete(
    `api/profiles/deleteprofiles/${userId}`
  );
  return data;
};
