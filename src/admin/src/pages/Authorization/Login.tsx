import { useEffect,useState } from 'react'
import "./Login.css"
import {useForm} from "react-hook-form"
import { LockOutlined , UserOutlined } from '@ant-design/icons';
import { useNavigate , useLocation } from 'react-router-dom';
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
  type formType= {
   email:string,
    password:string
  }
  const cookies = new Cookies()
  useEffect(()=>{
    cookies.remove("admin")
    cookies.remove("super-admin")




  },[])
  const form = useForm<formType>();
  const{register , formState ,   handleSubmit , getValues} = form
  const {errors }  = formState
 // const LOGIN_INFO_URL = "/auth"



 // Make a request for a user with a given ID


  const HandleLogin= async ()=>{
      try{
        // 
        //  /// რეალური აპისთვის
        const response = await axios.post("http://localhost/api/identity/login",
          {
           email:getValues("email") , 
           password:getValues("password")
          } ,{
            headers:{
              'Access-Control-Allow-Origin':'*'
              
            }
          }
         
        )
         
         const tokenType = response.data.tokenType;
         const expiresIn = response.data.expiresIn;
         const accToken = response.data.accessToken;
         cookies.set(tokenType, accToken, {
          expires: expiresIn
         })
         console.log(response)
         const role = axios.get("http://localhost/api/identity/user",
          {
           Authorization:"Bearer Token"+accToken
          }
        ).then(resp=>console.log(resp))
          navigate("/main")
          dispatch(authActions.setAuth({username:getValues("email"),password:getValues("password"),roles:role,accessToken:accToken}
        )
      )
    }
       catch (err:any){
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

      




   }
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