import axios from 'axios';
import { URL_REQUEST_CEP } from '../config.js';

export const getCep = async(cep) => {
    try {
     return await axios.get(`${URL_REQUEST_CEP}/ws/${cep}/json/`)
    } catch (error) {
       console.log(error)
       return error
    }
  }