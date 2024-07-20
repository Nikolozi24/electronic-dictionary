import { useEffect,useState } from 'react'
import "./Login.css"
import {useForm} from "react-hook-form"
import { LockOutlined , UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { useDispatch} from 'react-redux';
import Cookies from 'universal-cookie';
import { authActions } from '../../components/Store/redux/authSlice';
import axios from 'axios';
import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling.js';




const Login = () => {
const dispatch = useDispatch()



  const navigate = useNavigate();

  const cookies = new Cookies()
  useEffect(()=>{
    cookies.remove("admin")
    cookies.remove("super-admin")
  },[])
  type formType= {
   email:string,
    password:string
  }
  const form = useForm<formType>();
  const{register , formState ,   handleSubmit , getValues} = form
  const {errors }  = formState
  const HandleLogin = async () => {
    try {
      //
      //  /// რეალური აპისთვის
      const response = await axios.post(
        "http://localhost:80/api/identity/login",
        {
          email: getValues("email"),
          password: getValues("password"),
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      
      
      const tokenType = response.data.tokenType;
      const expiresIn = response.data.expiresIn;
      const refreshToken = response.data.refreshToken;
      const accToken = response.data.accessToken;
      console.log(tokenType, accToken, expiresIn);
      // ვქმნი cookies
      const expirationDate = new Date();
      
      expirationDate.setDate(
        expirationDate.getDate() + (1 / (60 * 24)) * expiresIn
      );
      const cookiestring = `jwt=${accToken};max-age=${expiresIn}`;
      document.cookie = cookiestring;
      expirationDate.setDate(
        expirationDate.getDate() + (1 / (60 * 24)) * expiresIn * 2
      );
      const refreshString = `refresh=${refreshToken}; max-age=${2*expiresIn}`;
      document.cookie = refreshString;
      const resp = await axios.get('http://localhost/api/identity/user',{
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`${tokenType} ${accToken}`
          }
          })
          const role = resp.data.role;

          console.log(role)
          dispatch(authActions.setAuth({username:getValues("email"),password:getValues("password"),role:role,accessToken:accToken}))
        if(resp.data.status=="Active"){
          alert('complited')

          navigate("/fill")
          window.location.reload();
        }
        else if(resp.data.status=="InActive"){
            alert("მომხარებელი არაააქტიურია")
        }
        }
        catch (err:any) {
      AxiosErrorHandling(err);
  }
  };
  const [isPasswordShow , setIsPasswordShow ] = useState<boolean>();
  return (
    <div className={`login`}>
      <div className='wrapper'>

          <form action='' className='' noValidate onSubmit={handleSubmit(HandleLogin, ()=>{ alert("შეცდომა")})}>
          <div className='login-header'>

          <h1 className={``}>{'შესვლა'}</h1>
          <div className='langSection'> 
         
            </div>
          </div>
          <div  className={`input-box`}>
            <input type='email' placeholder={'მომხმარებელი'}
              {...register("email" , {
                required:true,
                validate:(fieldValue)=>{
                    return fieldValue!="admin@example.com" || "this is bad email"
                }
              })}
              className={`${formState.errors.email?  "error" :""}`}
            />
           <UserOutlined  className='icon'/>
          </div>
            <div className='input-box'>

            <input type={`${!isPasswordShow? "password":"text" }`} placeholder={'პაროლი'}
                {...register("password" , {
                  required:{
                   value:true,
                  message:"this field is required"
                  },
                  minLength:5
                })}
                className={`${errors.password? "error":""}`}
            />
              <LockOutlined className='icon'/>
              <div style={{textAlign:'left', marginTop:"5px", cursor:"pointer"}}>
            <input onChange={()=>{setIsPasswordShow(prev=>!prev)}} name='checkbox' id='checkbox' type="checkbox" style={{width:'20px', margin:"2px 4px"}}/><label htmlFor='checkbox' style={{cursor:'pointer'}}>{!isPasswordShow? "show password":"hide password"}</label>

              </div>
            </div>
            {/* <div className='remember-forget'>
                <label><input type='checkbox'/>{'დამახსოვრება'}</label>
            </div> */}
              <button disabled={errors.password ||errors.email? true : false} onClick={()=>{}} type='submit'>{'შესვლა'}</button>
           </form>
      </div>
     

  
    </div>
  )
}
export default Login