import React from 'react'
import "./forgetPassword.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ForgetPassword:React.FC = () => {
  const navigate = useNavigate();
const handleSubmit:React.FC=(e:any)=>{

        const value = document.getElementById('email')?.value;
        console.log(value)
        const response = axios.post("http://localhost/api/identity/forgotPassword", {email:value});
        alert("წარმატებით გაიგზავნა!");
        navigate('/resetPassword')
}
  return (
    
  <div className="subscribe">
      <p>პაროლის აღდგენა</p>
      <form onSubmit={(e)=>handleSubmit(e)}>

     <input placeholder="ელ-ფოსტა" id="email" className="subscribe-input" name="email" type="email"/>
   
  <div className="submit-btn">გაგზავნა</div>
      </form>
</div>

  )
}

export default ForgetPassword