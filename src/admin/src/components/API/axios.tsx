import axios from 'axios';
const BASE_URL = ''

export default axios.create({
    baseURL: BASE_URL,
    headers:{
        'Access-Control-Allow-Origin':'*'
    }
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json' ,
    },
    withCredentials: true
});
