import React from 'react';
import AddUserComponent from '../../components/addUserComponent/addUserComponent';

const AddUser: React.FC = () => {
  const handleSave = (username: string, email: string, password: string, role: string) => {
    // Handle saving the user
    console.log('Saving user:', username, email, password, role);
  };

  const handleCancel = () => {
    // Handle canceling
    console.log('Cancelled');
  };

  return (
    <div>
      <h1>Add User</h1>
      <AddUserComponent onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default AddUser;
