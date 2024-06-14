import React from 'react'
import GetCookie from '../Coookies/GetCookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function AxiosErrorHandling(err:any) {
    const navigate = useNavigate();
    if(err.response.status===400){
        const fun = async ()=>{
        const refresh = GetCookie('refresh');
        console.log(refresh)
        console.log(refresh=="")
      
        const response  =  await axios.post('http://localhost/api/identity/refresh', {
          refreshToken:refresh
        },{
          withCredentials:true,
          headers:{
            'Content-Type':'application/json'
          }
        })
       const jwtValue = response.data.accessToken;
       const expireIn  =  response.data.expiresIn;
       const Refresh = response.data.refreshToken;
      document.cookie = `jwt=${jwtValue}; max-age=${expireIn}`;
      document.cookie = `refresh=${Refresh}; max-age=${expireIn}`;
    }
    fun();
}
else if(err.response.status===500){
    alert("შიდა სერვერის შეცდომა")
}
else if(err.response.status===400){
        alert(err.response.title)
}
else{
    alert("წარმოიშვა შეცდომა")
}
}
