import axios from 'axios';
import {localStorageToken} from '../services/localstorageService';

const baseUrl = import.meta.env.VITE_API_URL;

const WholesalerService = {
  getAllWholesalers: () => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/wholesalers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  getWholesalerById: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/wholesalers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  createWholesaler: (data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}/wholesalers`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  updateWholesaler: (id, data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .put(`${baseUrl}/wholesalers/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  deleteWholesaler: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .delete(`${baseUrl}/wholesalers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },
};

export default WholesalerService;
