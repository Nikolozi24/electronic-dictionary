import { useLocation , Navigate, Outlet } from 'react-router-dom'
import React,{useEffect , useState} from 'react'
import {  useSelector } from 'react-redux'
import axios from 'axios'
import GetCookie from '../Utilities/GetCookie'

interface RoleTypes{
  allowedRoles:string[]
}

const RequireAuth:React.FC<RoleTypes> = ({allowedRoles=[]}) => {
const [Role,setRole] = useState("");
const auth = useSelector(state=>state.auth.auth)

useEffect( ()=>{
  async ()=>{
  {
      const jwt = GetCookie('jwt')
      console.log(jwt)
      const response = await axios.get("http://localhost/api/identity/user",{
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+jwt
        }
      })
      setRole(response.data.role);
      console.log(Role)
  }
}
}
,[Role])
const location = useLocation()

  return (
    auth?.role?.find(rol => allowedRoles?.includes(rol))
    ?<Outlet/> : auth?.user? <Navigate to="/unauthorized" state={{from:location}} replace/>:<Navigate to="/" state={{from:location}} replace />
  )
}

export default RequireAuth