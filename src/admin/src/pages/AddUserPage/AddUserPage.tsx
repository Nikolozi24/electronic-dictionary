import React from 'react';
import AddUserComponent from '../../components/AddUserComponent';
import Header from '../../components/Header/Header';
import GetCookie from '../../components/Utilities/Coookies/GetCookie';
import axios from 'axios';
import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling';

const AddUser: React.FC = () => {

  const jwt = GetCookie('jwt');


  const handleSave = (email: string, password: string, role: string) => {
   try{
     const response = axios.post('http://localhost/api/identity/add-user',{
        email:email,
        password:password,
        role:role
      },
    {
      headers:{
          "Content-Type":'application/json',
          "Authorization":'Bearer '+jwt
        }
    })
  
   }
   catch(err:any){
   AxiosErrorHandling(err)
   }
  };

  const handleCancel = () => {

  };

  return (
    <div>
      <Header/>
      <h1>Add User</h1>
      <AddUserComponent onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default AddUser;
