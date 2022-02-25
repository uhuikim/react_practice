import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPatientList = () => api.get(`/api/patient/list`);

export const getGenderList = () => api.get(`/api/gender/list`);

export const getRaceList = () => api.get(`/api/race/list`);

export const getEthnicityList = () => api.get(`/api/ethnicity/list`);

export const getPersonData = (id) => api.get(`/api/patient/brief/${id}`);
