import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/alumni';

export const listAlumni = () => axios.get(REST_API_BASE_URL);

export const getAlumniById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const getAlumni = (alumniId) => axios.get(REST_API_BASE_URL + '/' + alumniId);

export const deleteAlumni = (alumniId) => axios.delete(REST_API_BASE_URL + '/' + alumniId);

export const createAlumni = (formData) => {
    return axios.post("http://localhost:8080/api/alumni", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const updateAlumni = (alumniId, formData) =>
    axios.put(`${REST_API_BASE_URL}/upload-pic/${alumniId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });