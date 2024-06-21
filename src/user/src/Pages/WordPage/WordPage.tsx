import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosErrorHandling from '../../Components/Utilities/ErrorHandling/AxiosErrorHandling'
import axios from 'axios'
const WordPage:React.FC = () => {
    const {id} = useParams()
  const [word, setWord ] = useState({})
  
    useEffect(()=>{
        try{
            const fun =  async () =>{
                const response = await axios.get(`http://localhost/api/entry/${id}`,{
                  headers:{
                    "Content-Type":"application/json"
                  }
                }).then(res=>res.data).then(data=>setWord(data))
            }
              fun();
        }
        catch(err:any){
            AxiosErrorHandling(err);
        }


    },[])
    
  return (
    <div>
        
          <h1>word id {id}</h1>
          <h1>word name: {word.georgianHeadword}</h1>
                

    </div>
  )
}

export default WordPage