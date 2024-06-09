import { useEffect,useState } from 'react'
import "./Login.css"
import {useForm} from "react-hook-form"
import { LockOutlined , UserOutlined } from '@ant-design/icons';
import { useNavigate , useLocation , Link} from 'react-router-dom';
import useAxiosPrivate from "../../components/Hooks/UseAxiosPrivate.js"
import { useDispatch} from 'react-redux';
import Cookies from 'universal-cookie';
import { authActions } from '../../components/Store/redux/authSlice';
import axios from 'axios';




const Login = () => {
const dispatch = useDispatch()
const [roles,setRoles] = useState([]);
const  axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location =  useLocation();
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
      const cookiestring = `jwt=${accToken};expires=${expirationDate.toUTCString()}`;
      document.cookie = cookiestring;
      expirationDate.setDate(
        expirationDate.getDate() + (1 / (60 * 24)) * expiresIn * 2
      );
      const refreshString = `refresh=${refreshToken}; expires=${expirationDate.toUTCString()}`;
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
          alert('complited')
          navigate("/fill")

      } catch (err:any) {
      if (err.response?.status===405) {
        console.log("no Server Response");
        alert("no Server Response");
      } else if (err.response?.status === 400) {
        console.log("Missing Username or Password");
        alert("MIssing Username or password");
      } else if (err.response?.status === 401) {
        console.log("Unauthorized");
        alert("Unauthorized");
      }
  }
  };
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
              className={`${formState.errors.username?  "error" :""}`}
            />
           <UserOutlined  className='icon'/>
          </div>
            <div className='input-box'>

            <input type='password' placeholder={'პაროლი'}
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
            </div>
            {/* <div className='remember-forget'>
                <label><input type='checkbox'/>{'დამახსოვრება'}</label>
            </div> */}
              <button disabled={errors.password ||errors.username ? true : false} onClick={()=>{}} type='submit'>{'შესვლა'}</button>

           </form>
      </div>
     

  
    </div>
  )
}
export default Login