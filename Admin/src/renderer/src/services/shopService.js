import axios from 'axios';
import {localStorageToken} from '../services/localstorageService';

const baseUrl = import.meta.env.VITE_API_URL;

const shopService = {
  createShopDetail: (data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}/shop-details/`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  },
  getAllShopDetails: () => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios.get(`${baseUrl}/shop-details/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  },
  getShopDetailById: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios.get(`${baseUrl}/shop-details/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  },
  updateShopDetail: (id, data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios.put(`${baseUrl}/shop-details/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  },
  deleteShopDetail: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios.delete(`${baseUrl}/shop-details/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  }
};

export default shopService;
