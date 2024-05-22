import { useEffect, } from 'react'
import "./Login.css"
import {useForm} from "react-hook-form"
import { LockOutlined , UserOutlined } from '@ant-design/icons';
import { useNavigate , useLocation } from 'react-router-dom';
import useAxiosPrivate from "../../components/Hooks/useAxiosPrivate.js"
import { useDispatch} from 'react-redux';
import Cookies from 'universal-cookie';
import { authActions } from '../../components/Store/redux/authSlice';


const Login = () => {

const dispatch = useDispatch()
const  axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location =  useLocation();
  type formType= {
    username:string,
    password:string
  }
  const cookies = new Cookies()
  useEffect(()=>{
    cookies.remove("admin")
    cookies.remove("moderator")




  },[])
  const form = useForm<formType>();
  const{register , formState ,   handleSubmit , getValues} = form
  const {errors }  = formState
 // const LOGIN_INFO_URL = "/auth"
  const HandleLogin= async ()=>{
      try{
        // 
        //  /// რეალური აპისთვის
        const response = await axiosPrivate.post("/login",JSON.stringify({username: getValues("username") , password:getValues("password")}) , {
            headers:{"Content-Type":'application/json'},
            withCredentials:true
        })
        let role =[] ;
        let  accToken="" ;
        /// სატესტო{
          if(getValues("username") === "adminAdmin"  && getValues("password") ==="HelloWorld"){
            role = [1900, 2001];
            accToken = "dfsdhjlk;frouhrgthgngtygeruirieterhifhgrlghsif";
          }
          else{
            throw 404
          }
          cookies.set("jwt" , accToken);
          navigate("/main")
          dispatch(authActions.setAuth({username:getValues("username"),password:getValues("password"),roles:role,accessToken:accToken}
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
            <input type='text' placeholder={'მომხმარებელი'}
              {...register("username" , {
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
                  minLength:8
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