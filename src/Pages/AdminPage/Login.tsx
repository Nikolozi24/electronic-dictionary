import React, { useEffect, useState } from 'react'
import "../../styles/Login.css"
import { FaUser, FaLock} from "react-icons/fa";
import {useForm} from "react-hook-form"
import { useStore } from '../../Store/Store';
import { CHANGE_LANGUAGE , SET_AUTH } from '../../Store/ActionType';
import { DevTool } from '@hookform/devtools';
import {json, redirect, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from '../../Assets/api/axios.js';

const Login = () => {
const {isAuth , dispatch , isEnglish} = useStore();

  const cookies = new Cookies();
 const  LOGIN_URL  = '/auth'
  const navigate = useNavigate();
  type formType= {
    username:string,
    password:string
  }
  useEffect(()=>{
    const cookies = new Cookies()
    cookies.remove("admin")
    cookies.remove("moderator")




  },[])
  const form = useForm<formType>();
  const{register , formState , control,   handleSubmit , getValues} = form
  const {errors }  = formState
  const LOGIN_INFO_URL = "/auth"
  const HandleLogin= async ()=>{
      try{
        // 
        // 
        const response = await axios.post(LOGIN_INFO_URL ,JSON.stringify({username: getValues("username") , password:getValues("password")}) , {
            headers:{"Content-Type":'application/json'},
            withCredentials:true
        })

        const accToken = response?.data?.accessToken;
        const roles = response?.data?.roles;

        dispatch({
                  type:SET_AUTH, 
                  payload:{
                                user:getValues("username"), 
                                pwd:getValues("password"),
                                roles:roles,
                                accessToken:accToken
                    }
                  }
                )
  
       }
       catch (err){
        if(!err.response){
          console.log("no Server Response")
          alert("no Server Response")
        }
        else if(err.response?.status===400 ){
            console.log("Missing Username or Password");
            alert("MIssing Username or password")
        }
        else if(err.response?.status===401){
          console.log("Unauthorized")
          alert("Unauthorized")
        }
        else{
          console.log("Login Failed")
          alert("Login Failed")
        }
       }






    /*         const submitedPassword = getValues("password");
            console.log(submitedUsername, submitedPassword)
    usersInfo.map(data=>{
      console.log("inside map")
              if(data.username === submitedUsername && data.password === submitedPassword){
               console.log("inside Accepted!")
                if(data.status == "moderator"){
                  console.log("inside moderator");
                cookies.set('moderator' ,true ,{path:'/'});
              }
              
              else {
                if(data.status =="admin")
                {
                  console.log(" inside admin")
                  
                  
                  cookies.set('admin' , true , {path:'/'})
                }
              }
              navigate("/admin-panel")
            }

          })


          console.log("clicked") */
   }

  
 
  return (
    <div className={`login`}>
      <div className='wrapper'>

          <form action='' className='' noValidate onSubmit={handleSubmit(HandleLogin, ()=>{ isEnglish? alert("Error"):alert("შეცდომა")})}>
          <div className='login-header'>

          <h1 className={``}>{isEnglish?'Log in':'შესვლა'}</h1>
          <div className='langSection'> 
                  <ul >
                    <li onClick={()=>{dispatch({type:CHANGE_LANGUAGE, payload:true})}}>English</li>
                    <li onClick={()=>{dispatch({type:CHANGE_LANGUAGE, payload:false})}}>ქართული</li>
                  </ul>
            </div>
          </div>
          <div  className={`input-box`}>
            <input type='text' placeholder={ `${isEnglish?'Username' :'მომხმარებელი'}`}
              {...register("username" , {
                required:true,
                validate:(fieldValue)=>{
                    return fieldValue!="admin@example.com" || "this is bad email"
                }
              })}
              className={`${formState.errors.username?  "error" :""}`}
            />
            <FaUser className='icon'/>
          </div>
            <div className='input-box'>

            <input type='password' placeholder={`${isEnglish?'Password':'პაროლი'}`}
                {...register("password" , {
                  required:{
                   value:true,
                  message:"this field is required"
                  },
                  minLength:8
                })}
                className={`${errors.password? "error":""}`}
            />
              
              <FaLock className='icon'/>
            </div>
            <div className='remember-forget'>
                <label><input type='checkbox'/>{`${isEnglish?'Remember me':'დამახსოვრება'}`}</label>
            </div>
              <button disabled={errors.password ||errors.username ? true : false} onClick={()=>{}} type='submit'>{isEnglish? 'Log in':'შესვლა'}</button>

           </form>
      </div>
      <DevTool control={control}/>
    </div>
  )
}
export default Login