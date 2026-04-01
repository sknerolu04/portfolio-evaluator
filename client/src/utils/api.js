import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Fetch full profile report
export const fetchProfile = async (username) => {
  const { data } = await API.get(`/profile/${username}`);
  return data;
};

// Fetch cached report only
export const fetchCachedProfile = async (username) => {
  const { data } = await API.get(`/profile/${username}/cached`);
  return data;
};

// Compare two profiles
export const compareProfiles = async (u1, u2) => {
  const { data } = await API.get(`/compare?u1=${u1}&u2=${u2}`);
  return data;
};