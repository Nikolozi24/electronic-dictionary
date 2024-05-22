import { useLocation , Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import {  useSelector } from 'react-redux'

interface RoleTypes{
  allowedRoles:number[]
}

const RequireAuth:React.FC<RoleTypes> = ({allowedRoles=[]}) => {
const auth = useSelector(state=>state.auth.auth)
const location = useLocation()

  return (
    auth?.roles?.find(roles=>allowedRoles?.includes(roles))
    ?<Outlet/> : auth?.user ? <Navigate to="/unauthorized" state={{from:location}} replace/>:<Navigate to="/" state={{from:location}} replace />
  )
}

export default RequireAuth