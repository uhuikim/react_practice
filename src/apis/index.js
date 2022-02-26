import axios from 'axios';
import qs from 'qs';

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPatientList = ({
  page,
  length,
  order_column,
  order_desc,
  gender,
  race,
  ethnicity,
  age_min,
  age_max,
  death,
}) => {
  const queryString = qs.stringify(
    {
      page,
      length,
      order_column,
      order_desc,
      gender,
      race,
      ethnicity,
      age_min,
      age_max,
      death,
    },
    { skipNulls: true },
  );

  return api.get(`/api/patient/list?${queryString}`);
};

export const getPersonData = (id) => api.get(`/api/patient/brief/${id}`);

export const getGraphData = () => api.get(`/api/patient/stats`);

export const getRaceList = () => api.get(`/api/race/list`);
export const getEthnicityList = () => api.get(`/api/ethnicity/list`);
export const getGenderList = () => api.get(`/api/gender/list`);
