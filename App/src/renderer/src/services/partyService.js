import axios from 'axios'
import { getToken } from '../services/localstorageService'

const baseUrl = import.meta.env.VITE_API_URL

const createParty = async (partyData) => {
  try {
    const response = await axios.post(`${baseUrl}/parties/create`, partyData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })

    return response.data


  } catch (err) {
    console.log(err)
  }
}


const getAllParty = async (userID) => {
  try {
    const response = await axios.get(`${baseUrl}/parties/list/user/${userID}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })

    return response


  } catch (err) {
    console.log(err)
  }
}

export { createParty,getAllParty }


