import React, { useEffect, useState } from 'react';
import { Input, Modal, Select } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { thematicActions } from '../Store/redux/thematicSlice';
import GetCookie from '../Utilities/Coookies/GetCookie';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import AxiosErrorHandling from '../Utilities/ErrorHandling/AxiosErrorHandling';

interface Props {
  onSave: () => void;
  onCancel: () => void;
  isOpen:boolean
}

const AddUserComponent: React.FC<Props> = (props) => {
 const  { onSave, onCancel , isOpen} = props
  const jwt = GetCookie("jwt")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
 
  const navigate = useNavigate(); 
  useEffect(()=>{
        const resp = axios.get("http://localhost/api/identity/user-roles",{
              headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+jwt
              }
        }).then(res=>res.data).then(res=>setRoles(res));

  },[])
  
  const handleCancel= () => {
    
    onCancel();

    navigate('/fill')
  }
  const handleSave = () => {
    const el = document.getElementById("role")
    
    setRole(el?.value)
    const fun  = async()=>{

    try{
      const response =  await axios.post('http://localhost/api/identity/add-user',{
         email:email,
         password:password,
         role:el?.value
       },
     {
       headers:{
           "Content-Type":'application/json',
           "Authorization":'Bearer '+jwt
         },
         withCredentials:true
     }).then(res=>navigate('/added')).then(data=>onSave()).catch(err=>alert(err?.message))
    }
    catch(err:any){
    AxiosErrorHandling()
    }
   };
   fun();
  
  }
  return (
    <Modal
      title="Add User"
      open={isOpen}
      centered
      visible
      cancelText="Cancel"
      okText="Save"
      onOk={handleSave}
      onCancel={handleCancel}
    >
    
      <br />
      <br />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <select id="role">
        <option value={""}>გთხოვთ აირჩიოთ როლი</option>
                {
                  roles.map(item=>{
                    return <option value={item} key={item}>{item}</option>
                  })
                }
        </select>
    </Modal>
  );
};

export default AddUserComponent;
