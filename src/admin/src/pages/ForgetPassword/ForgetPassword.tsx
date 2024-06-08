import React from 'react'
import "./forgetPassword.css"

import { useNavigate } from 'react-router-dom'

const ForgetPassword:React.FC = () => {
const navigate = useNavigate();
const handleSubmit=()=>{

        const Rvalue = document.getElementById('email')?.value;
        console.log(Rvalue)
        const response = axios.post("http://localhost/api/identity/forgotPassword", {email:value});
        alert("წარმატებით გაიგზავნა!");
        navigate('/resetPassword')
}
  return (
    
  <div className="subscribe">
      <p>პაროლის აღდგენა</p>
      <form onSubmit={()=>handleSubmit()}>

     <input placeholder="ელ-ფოსტა" id="email" className="subscribe-input" name="email" type="email"/>
   
    <button type='submit'>
  <div className="submit-btn">
      გაგზავნა
    </div>
      </button>
      </form>
</div>

  )
}

export default ForgetPassword