import React, {useState , useEffect} from 'react'
import axios from 'axios'
import GetCookie from '../../components/Utilities/Coookies/GetCookie'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Welcome:React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail]= useState('')
    const [role, setRole]= useState('')
   
    const jwt = GetCookie('jwt')
   
    useEffect(()=>{
        if(jwt===""){
            navigate("/login")
        }
        const fun = async ()=>{
            console.log(jwt)
        
          try{
        
            const response = await axios.get('http://localhost/api/identity/user',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':"Bearer "+jwt
                }
        })
    const role = response.data.role;

    if(role!="admin" || role!="super_admin"){
        console.log("role does't exist")
        navigate('/login')
    }
setRole(role);
const email = response.data.email;
setEmail(email);
}   
catch(err){
    if(err==400){
        console.log('jwt removed')
    }
}
    }
    fun();
    },
[])
    return (
   
   
    (role==="admin" || role==="super_admin") && <><Header/>
    <div className='welcomeMessage'>
        <h1>Welcome: {email}</h1>
        <div className='forgetPassword'><Link to="/forgetPassword">change Password Password?</Link></div>
    </div> 
   </> 
  )
}

export default Welcome