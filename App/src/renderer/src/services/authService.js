import axios from 'axios';

const loginUser = async (credentials) => {
  console.log('Login:', credentials);
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Invalid password or email');
    return "Invalid password or email";
  }
};


const registerUser = async (credentials) => {
  console.log('Register:', credentials);
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, credentials);
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.response ? error.response.data : error.message);
    return error;
  }
};

export { loginUser, registerUser };
