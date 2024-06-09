import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { thematicActions } from '../Store/redux/thematicSlice';

interface Props {
  onSave: (username: string, email: string, password: string, role: string) => void;
  onCancel: () => void;
}

const AddUserComponent: React.FC<Props> = ({ onSave, onCancel }) => {

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
    onSave(email, password, role);
    navigate('/added')
  };
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
      <Input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
    </Modal>
  );
};

export default AddUserComponent;
