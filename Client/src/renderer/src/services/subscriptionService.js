import axios from "axios";
import { localStorageToken } from "../services/localstorageService";

const baseUrl = import.meta.env.VITE_API_URL;

const SubscriptionService = {
  getById: async (userId) => {
    const token = localStorageToken.getToken();

    const url = `${baseUrl}/subscriptions/${userId}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(url, config);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription:", error);
      throw error;
    }
  },
};

export default SubscriptionService;
