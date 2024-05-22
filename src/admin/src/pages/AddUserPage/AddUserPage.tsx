import React from 'react';
import AddUserComponent from '../../components/AddUserComponent';
import Header from '../../components/Header/Header';

const AddUser: React.FC = () => {

  const handleSave = (username: string, email: string, password: string, role: string) => {
    // Handle saving the user
    console.log('Saving user:', username, email, password, role);
  };

  const handleCancel = () => {
   
    console.log('Cancelled');
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
