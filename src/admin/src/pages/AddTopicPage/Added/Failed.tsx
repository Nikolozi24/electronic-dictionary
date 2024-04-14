import React from 'react'
import { useNavigate } from 'react-router-dom'


const AddedFailed:React.FC = () => {
    

        const navigate = useNavigate();
      return (
        <div>
            
            <h1 style={{color:'red'}}> დამატება ვერ განხორციელდა </h1>
                    <button onClick={()=>{navigate(-1)}} >უკან დაბრუნება</button>
        </div>
        )
}

export default AddedFailed