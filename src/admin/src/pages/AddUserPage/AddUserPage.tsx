import React, { useState, useEffect } from 'react';
import AddUserComponent from '../../components/AddUserComponent';
import Header from '../../components/Header/Header';
import GetCookie from '../../components/Utilities/Coookies/GetCookie';
import axios from 'axios';

import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling';
import { Button, Table, TableColumnsType } from 'antd';

interface userInfo {
  id: string;
  email: string;
  status: string;
  role: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isViewer: boolean;
}
const AddUser:React.FC = () => {
    const [isOpen , setIsOpen] = useState<boolean>(false)
    const [users,setUsers] = useState<userInfo[]>([])

  const  columns: TableColumnsType<userInfo> = [
    {
      title:"ემაილი",// რაც  გამოჩნდება ცხრილის სვეტის სათაურში
      // ეს დანარჩენი ორი იგივე სახელისა რაც თემატიკის ობიექტში ველს ქვია
      dataIndex:"email",
      key:"email",
    },
    {
      title:"როლი",
      dataIndex:"role",
      key:"role",
      render:(_,record)=>{
        return <span>{record.role}</span>
      }
    },
    {
      title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>სტატუსი</span>,
      dataIndex:"status",
      key:"status",
      render:(_, record)=>{
          if(record.status==="InActive")
              return<>არა აქტიური</>
              else
              return<>აქტიური</>

      }
    },{

      title:"ადმინი",
      dataIndex:"isAdmin",
      key:"isAdmin",
      render:(_,record)=>{
          return record.isAdmin? <span>კი</span>:<span>არა</span>
         }
    },
    ,{

      title:"სუპერ ადმინი",
      dataIndex:"isSuperAdmin",
      key:"isSuperAdmin",
      render:(_,record)=>{
          return record.isSuperAdmin? <span>კი</span>:<span>არა</span>
         }
    },
    ,{

      title:"მაყურებელი",
      dataIndex:"isViewer",
      key:"isViewer",
      render:(_,record)=>{
          return record.isViewer? <span>კი</span>:<span>არა</span>
         }
    },
   
   
,
  ]
  useEffect(()=>{
        const fun= async() =>{
            await axios.get('http://localhost/api/identity/users',{
              headers:{
                "Content-Type":"application/json"
              }
            }).then(res=>res.data).then(data=>setUsers(data))
        }
        fun();
  },[])
  const jwt = GetCookie('jwt');


  const handleSave = () => {
      setIsOpen(false)
  }

  const handleCancel = () => {
      setIsOpen(false);
  };
  const data: userInfo[] = users;
    
  return (
    <div>
      <Header/>

       <Table  style={{padding:'20px'}}columns={columns} dataSource={data}></Table>
       <Button onClick={()=>{setIsOpen(true)}}>Add user</Button>
      <AddUserComponent isOpen={isOpen} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default AddUser;
