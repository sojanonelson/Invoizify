import axios from 'axios';
import {localStorageToken} from '../services/localstorageService';

const baseUrl = import.meta.env.VITE_API_URL;

const InvoiceService = {
  getAllInvoices: () => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/invoices`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  getInvoiceById: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/invoices/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  createInvoice: (data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}/invoices`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  updateInvoice: (id, data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .put(`${baseUrl}/invoices/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  deleteInvoice: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .delete(`${baseUrl}/invoices/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },
};

export default InvoiceService;
