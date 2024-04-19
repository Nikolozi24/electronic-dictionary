import { useEffect, } from 'react'
import "./Login.css"
import {useForm} from "react-hook-form"
import { LockOutlined , UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { SET_AUTH } from '../../components/Store/redux/actionTypes';
import axios from "../../components/API/axios"
import { useDispatch} from 'react-redux';
import Cookies from 'universal-cookie';


const Login = () => {

const dispatch = useDispatch()

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
  const{register , formState ,   handleSubmit , getValues} = form
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
                                username:getValues("username"), 
                                password:getValues("password"),
                                roles:roles,
                                accessToken:accToken
                    }
                  }
                )
                navigate("/main")
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