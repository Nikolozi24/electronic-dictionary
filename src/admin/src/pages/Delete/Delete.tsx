import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  axios from 'axios'
import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling'

const Delete:React.FC = () => {
    const BASE_URL = 'http://localhost:5173'
    const navigate = useNavigate();


  return (
    <div>
        
        <h1 style={{color:'green'}}> წარმატებით წაიშალა!!!</h1>
                <button onClick={()=>{navigate(-1)}} >უკან დაბრუნება</button>



    </div>
  )
}

export default Delete