import React  from 'react'
import {useForm} from "react-hook-form"
import "./ResetPassword.css"
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling'

const ResetPassword:React.FC = () => {
       const navigate = useNavigate();

    type formType= {
         email:string,   
         resetCode:string
         newPassword:string
       }
       const form = useForm<formType>();
       const{register , formState , getValues} = form
       const {errors }  = formState

       const handleSubmit=(e:any)=>{
        e.preventDefault();
        console.log(getValues())
        try{
            const response = axios.post("http://localhost/api/identity/resetPassword", getValues())
        alert("პაროლი წარმატებით შეიცვალა")
        navigate('/')
        }
        catch(err:any){
          AxiosErrorHandling(err);
        }
       }


    return (
    <div className="container">
    <div className="heading">პაროლისა აღდგენა</div>
    <form className="form"  onSubmit={(e)=>handleSubmit(e)}>
      <div className="input-field">
        <input
        id="email"
            {...register("email" , {required:"this field is required"})}
        />
          <label htmlFor="email">ელფოსტა</label>
      </div>
      <div className="input-field">
        <input
          required
            {...register("resetCode")}
          id="code"
        />
          <label htmlFor="code">კოდი</label>
      </div>
      <div className="input-field">
        <input
          {...register("newPassword")}
       
          id="password"

        />
        <label htmlFor="username">ახალი პაროლი</label>
      </div>
  
      <div className="btn-container">
        <button className="btn" >Submit</button>
      </div>
    </form>
  </div>
  
  )
}

export default ResetPassword