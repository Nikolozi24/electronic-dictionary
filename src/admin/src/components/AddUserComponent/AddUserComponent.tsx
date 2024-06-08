import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GetCookie from '../Utilities/GetCookie';
import "./AddUserComponent.css"

interface Props {
  onSave: (username: string, email: string, password: string, role: string) => void;
  onCancel: () => void;
}

const AddUserComponent: React.FC<Props> = ({ onSave, onCancel }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isOpen , setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate(); 
  
  const handleCancel= () => {

    onCancel();
    setIsOpen(false);
    navigate('/fill')
  }
  const handleSave = () => {
    const Accjwt = GetCookie('jwt');
    const response = axios.post("http://localhost/api/identity/add-user",{
      email:email,
      password:password,
      role:role
    },
    {
      headers:{
        "Content-Type":'application/json',
        'Authorization': "Bearer "+Accjwt,
      },
      withCredentials:true
  }
    )


    navigate('/added')
  };
  return (
  <div>
  </div>
  );
};

export default AddUserComponent;
