import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircleOutlined } from '@ant-design/icons';
const Added:React.FC = () => {
    
    const navigate = useNavigate();
      return (
        <div>
            
            <h1 style={{color:'green'}}> წარმატებით დაემატა <CheckCircleOutlined  color='green' style={{fontSize:'40px'}}/></h1>
                    <button onClick={()=>{navigate(-1)}} >უკან დაბრუნება</button>
        </div>
        )
}

export default Added