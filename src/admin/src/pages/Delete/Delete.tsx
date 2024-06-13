import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  axios from 'axios'
import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling'

const Delete:React.FC = () => {
    const BASE_URL = 'http://localhost:5173'
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(()=>{
      try{
            console.log("object ",id, "will be deleted! ")
            const response = axios.delete(`/delete/${id}`)
      }
      catch(err:any){
        AxiosErrorHandling(err);
      }


    },[])
  return (
    <div>
        
        <h1 style={{color:'green'}}> წარმატებით წაიშალა!!!</h1>
                <button onClick={()=>{navigate(-1)}} >უკან დაბრუნება</button>



    </div>
  )
}

export default Delete