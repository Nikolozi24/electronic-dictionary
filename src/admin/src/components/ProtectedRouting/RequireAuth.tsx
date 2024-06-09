// import { useLocation , Navigate, Outlet } from 'react-router-dom'
// import React, { useEffect , useState} from 'react'
// import GetCookie from '../Utilities/Coookies/GetCookie'
// import {  useSelector } from 'react-redux'
// import axios from 'axios'
// interface RoleTypes{
//   allowedRoles:string[]
// }

// const RequireAuth:React.FC<RoleTypes> = ({allowedRoles=[]}) => {


// const allowedRole=()=>{
//     allowedRoles.map(item=>{
//         if(item===role){
//             return true
//         }
//     })
//     return false;
// }
// const location = useLocation()

//   return (
//          allowedRole() ? <Outlet/> :  jwt? <Navigate to="/unauthorized" state={{from:location}} replace/>:<Navigate to="/" state={{from:location}} replace />
               
        
//       )
// }

// export default RequireAuth