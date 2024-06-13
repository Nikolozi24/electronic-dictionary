import React from 'react'
import "./forgetPassword.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling'

const ForgetPassword:React.FC = () => {
  const navigate = useNavigate();
const handleSubmit=(e:any)=>{

        const value = document.getElementById('email')?.value;
        console.log(value)
        try{
        const response = axios.post("http://localhost/api/identity/forgotPassword", {email:value});
        alert("წარმატებით გაიგზავნა!");
        navigate('/resetPassword')
        }
        catch(err:any){
          AxiosErrorHandling(err);
        }
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