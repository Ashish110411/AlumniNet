import axios from 'axios';
// const REST_API_BASE_URL = 'http://localhost:8080/api/alumni';
const REST_API_BASE_URL = 'http://localhost:8080/api/alumni';

export const listAlumni = () => axios.get(REST_API_BASE_URL);

export const createAlumni = (alumni) => axios.post(REST_API_BASE_URL, alumni);

export const getAlumniById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const getAlumni = (alumniId) => axios.get(REST_API_BASE_URL + '/' + alumniId);

export const updateAlumni = (alumniId, alumni) => axios.put(REST_API_BASE_URL + '/' + alumniId, alumni);

export const deleteAlumni = (alumniId) => axios.delete(REST_API_BASE_URL + '/' + alumniId);