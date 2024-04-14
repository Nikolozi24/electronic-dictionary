import { useLocation , Navigate, Outlet } from 'react-router-dom'
import React, { useState } from 'react'

interface RoleTypes{
  allowedRoles:number[]
}

const RequireAuth:React.FC<RoleTypes> = ({allowedRoles=[]}) => {
const auth = {
  roles:[],
  user:"",
}
const location = useLocation()

  return (
    auth?.roles?.find(role=>allowedRoles?.includes(role))
    ?<Outlet/> : auth?.user ? <Navigate to="unauthorized" state={{from:location}} replace/>:<Navigate to="/" state={{from:location}} replace />
  )
}

export default RequireAuth