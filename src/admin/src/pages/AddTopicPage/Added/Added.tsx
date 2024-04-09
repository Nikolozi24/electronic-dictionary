import React from 'react'
import { useNavigate } from 'react-router-dom'

const Added:React.FC = () => {
    

        const navigate = useNavigate();
      return (
        <div>
            
            <h1 style={{color:'green'}}> წარმატებით დაემატა!!!</h1>
                    <button onClick={()=>{navigate(-1)}} >უკან დაბრუნება</button>
        </div>
        )
}

export default Added