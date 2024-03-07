import React from 'react'
import "../../styles/Login.css"
import { FaUser, FaLock} from "react-icons/fa";
import {useForm} from "react-hook-form"
import { useStore } from '../../Store/Store';
import { CHANGE_LANGUAGE } from '../../Store/ActionType';
import { DevTool } from '@hookform/devtools';
import { redirect } from 'react-router-dom';
import {useCookies } from 'react-cookie';

const Login = () => {
  type formType= {
    username:string,
    password:string
  }
  const form = useForm<formType>();
  const{register , formState , control , handleSubmit , getValues} = form
  const {errors} = formState
  const HandleLogin=()=>{
    // const [cookie,setCookies , removeCookies] = useCookies(["isJoined"]);
    // if(getValues("username").trim()=="NikoloziAdmin@gmail.com" && getValues("password").trim() == "adminAdmin"){
    //   setCookies("isJoined" , true , {secure:true , path:"/" , maxAge:6000});
    //         redirect("/add-user");
    //   }
  console.log("submited")  
  }
  const {dispatch, isEnglish} = useStore();
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

            <input type='text' placeholder={`${isEnglish?'Password':'პაროლი'}`}
                {...register("password" , {
                  required:{
                   value:true,
                  message:"this field is required"
                  },
                  minLength:10
                })}
                className={`${errors.password? "error":""}`}
            />
              
              <FaLock className='icon'/>
            </div>
            <div className='remember-forget'>
                <label><input type='checkbox'/>{`${isEnglish?'Remember me':'დამახსოვრება'}`}</label>
            </div>
              <button onClick={()=>{}} type='submit'>{isEnglish? 'Log in':'შესვლა'}</button>

           </form>
      </div>
      <DevTool control={control}/>
    </div>
  )
}

export default Login