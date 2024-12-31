import axios from 'axios';
import {localStorageToken} from '../services/localstorageService';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const CustomerService = {
  getAllCustomers: () => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/customers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  getCustomerById: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/customers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  createCustomer: (data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}/customers`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  updateCustomer: (id, data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .put(`${baseUrl}/customers/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  deleteCustomer: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .delete(`${baseUrl}/customers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },
};

export default CustomerService;
