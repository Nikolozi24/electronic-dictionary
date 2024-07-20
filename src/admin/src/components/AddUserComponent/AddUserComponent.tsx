import React, { useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import {  useNavigate } from 'react-router-dom';

import GetCookie from '../Utilities/Coookies/GetCookie';


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
  }
  const handleSave = () => {
    const el = document.getElementById("role")
    
    setRole(el?.value)
    const fun  = async()=>{

    try{
      await axios.post('http://localhost/api/identity/add-user',{
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
     }).then(res=>navigate('/added')).then(data=>onSave()).catch(err=>{
      
      if(err.response.status==400){
        alert("ზოგიერთი ველი არასწორია!")
      }
     });
    }
    catch(err:any){
      alert(err?.errors?.
        PasswordTooShort);
    AxiosErrorHandling(err)
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
      პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო ,უნდა შეიცავდეს სიმბოლოებს ერთ დიდ სიმბოლოს(A,B,C,D ....), რიცხვს , პატარა სიმბოლოს(a,b,c,d,e,f) და სპეციალურ სიმბოლოს($,#,%.....)
      <br /> 
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
