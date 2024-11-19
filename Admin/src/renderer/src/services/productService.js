import axios from "axios";
import {localStorageToken} from "../services/localstorageService";

const baseUrl = import.meta.env.VITE_API_URL;

const ProductService = {

  getAllProducts: () => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },


  getProductById: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },


  createProduct: (data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}/products`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },


  updateProduct: (id, data) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .put(`${baseUrl}/products/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },

  deleteProduct: (id) => {
    const token = localStorageToken.getToken();
    return new Promise((resolve, reject) => {
      axios
        .delete(`${baseUrl}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  },
};

export default ProductService;
