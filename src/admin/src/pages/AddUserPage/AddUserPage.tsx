import React, { useState, useEffect } from 'react';
import AddUserComponent from '../../components/AddUserComponent/AddUserComponent';
import Header from '../../components/Header/Header';
import GetCookie from '../../components/Utilities/Coookies/GetCookie';
import axios from 'axios';

import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling';
import { Button, Table, TableColumnsType } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';

interface userInfo {
  id: number;
  email: string;
  status: string;
  role: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isViewer: boolean;
}
const AddUser:React.FC = () => {
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const [users,setUsers] = useState<userInfo[]>([{
    id: 0,
    email: "",
    status: "string",
    role: "",
    isAdmin: false,
    isSuperAdmin: false,
    isViewer: true,
  },])
  const jwt = GetCookie('jwt');
  useEffect(()=>{
        const fun= async() =>{
            await axios.get('http://localhost/api/identity/users',{
              headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+jwt
              }
            }).then(res=>res.data).then(data=>setUsers(data))
        }
        fun();
  },[])

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
    },
    {
      key:"status",
      title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>აქტივაცია/დეაქტივაცია</span>,
      dataIndex:"status",
      render:  (_,record)=>{

        if(record.status==='InActive')
          return ( <><Button onClick={()=>{
                try{
                  const fun  = async ()=>{
               await  axios.put(`http://localhost/api/identity/activate-user/${record.id}`,{},
                {
                  headers:{
                    'Content-Type':'application/json',
                    'Authorization':"Bearer "+jwt
                  }
                }
              ).then(res=>{location.reload();  console.log(res)});
            }
            fun();
            }
            catch(err:any){
              AxiosErrorHandling(err);
            }
              
            }}>გააქტიურება</Button>
           
            
            </>)
        else
           return ( <><Button onClick={()=>{
            try{
              const fun  = async ()=>{
             await axios.put(`http://localhost/api/identity/deactivate-user/${record.id}`,{},
              {
                headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
                }
              }
            ).then(res=>{document.location.reload(); console.log(res)});
           
          }
          fun();
            }
            catch(err:any){
              AxiosErrorHandling(err);
            }
          }
          
          }>დეაქტივაცია</Button></>)

      }
    },
    {

      title:"ადმინი",
      dataIndex:"isAdmin",
      key:"isAdmin",
      render:(_,record)=>{
          return record.isAdmin? <span>კი</span>:<span>არა</span>
         }
    },
    {

      title:"სუპერ ადმინი",
      dataIndex:"isSuperAdmin",
      key:"isSuperAdmin",
      render:(_,record)=>{
          return record.isSuperAdmin? <span>კი</span>:<span>არა</span>
         }
    },
    {

      title:"მაყურებელი",
      dataIndex:"isViewer",
      key:"isViewer",
      render:(_,record)=>{
          return record.isViewer? <span style={{textAlign:"center"}}>კი</span>:<span>არა</span>
         }
    },
    {
      key:"delete",
      title: <span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>წაშლა</span>,
      dataIndex: "id",
      render:(_,record)=>{
        return <button style={{width:'100%' , textAlign:"center"}}  onClick={()=>{
          try{
            const fun = async() =>{
             await axios.delete(`http://localhost/api/identity/delete-user/${record.id}`,
    {
        headers:{
          "Content-Type":"application/json",
          'Authorization':"Bearer "+jwt
        },
    }).then(res=>{location.reload(); console.log(res)})
 
  }
  fun()
  }
  catch(err:any){
    AxiosErrorHandling(err);
  }
  }} ><CloseCircleTwoTone width={10}/></button>
  }
}
  ]


  const handleSave = () => {
      setIsOpen(false)
  }

  const handleCancel = () => {
      setIsOpen(false);
  };
 
      const data:userInfo[] = users?.map(item=>item)
  return (
    <div>
      <Header/>

       <Table columns={columns}  dataSource={data}/>
       <Button onClick={()=>{setIsOpen(true)}}>Add user</Button>
      <AddUserComponent isOpen={isOpen} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default AddUser;
