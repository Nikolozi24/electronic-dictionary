import React, { useState } from 'react';
import { Input, Modal } from 'antd';

interface Props {
  onSave: (username: string, email: string, password: string, role: string) => void;
  onCancel: () => void;
}

const AddUserComponent: React.FC<Props> = ({ onSave, onCancel }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSave = () => {
    onSave(username, email, password, role);
  };

  return (
    <Modal
      title="Add User"
      centered
      visible
      cancelText="Cancel"
      okText="Save"
      onOk={handleSave}
      onCancel={onCancel}
    >
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
