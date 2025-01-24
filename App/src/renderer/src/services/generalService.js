import axios from 'axios'

import {getToken} from '../services/localstorageService';

const baseUrl = import.meta.env.VITE_API_URL;

console.log("TOKEN:", getToken())

const getProfilePicture = async (id)=>{

    try{

        const fetch = await axios.get(`${baseUrl}/users/profile/${id}` ,  {
            headers: { Authorization: `Bearer ${getToken()}` },
          })
        // console.log("Fetch:", fetch.data)
        return fetch.data;

    }catch(err){
console.log(err)
    }
}


export {getProfilePicture}
