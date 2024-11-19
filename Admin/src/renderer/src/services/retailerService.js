import axios from 'axios'
import {localStorageToken} from '../services/localstorageService'

const baseUrl = import.meta.env.VITE_API_URL;

const ReatilerService = {

    getAllretailer: () => {
      const token = localStorageToken.getToken();
      return new Promise((resolve, reject) => {
        axios
          .get(`${baseUrl}/retailers`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => resolve(response.data))
          .catch(error => reject(error));
      });
    },
  
  
    getRetailerById: (id) => {
      const token = localStorageToken.getToken();
      return new Promise((resolve, reject) => {
        axios
          .get(`${baseUrl}/retailers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => resolve(response.data))
          .catch(error => reject(error));
      });
    },
  
  
    createRetailer: (data) => {
      const token = localStorageToken.getToken();
      return new Promise((resolve, reject) => {
        axios
          .post(`${baseUrl}/retailers`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => resolve(response.data))
          .catch(error => reject(error));
      });
    },
  
  
    updateRetailer: (id, data) => {
      const token = localStorageToken.getToken();
      return new Promise((resolve, reject) => {
        axios
          .put(`${baseUrl}/retailers/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => resolve(response.data))
          .catch(error => reject(error));
      });
    },
  
    deleteRetailer: (id) => {
      const token = localStorageToken.getToken();
      return new Promise((resolve, reject) => {
        axios
          .delete(`${baseUrl}/retailers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => resolve(response.data))
          .catch(error => reject(error));
      });
    },
  };
  
  export default ReatilerService;
  