import axios from 'axios'

export const loginUser = async (credentials) => {
  console.log('Login:', credentials)
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)
    return response.data
  } catch (error) {
    console.log(error)
    return error
  }
}
