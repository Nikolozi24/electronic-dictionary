import React, { useEffect, useState } from 'react';
// import { Button, Input, Modal } from 'antd';
// import TranslationComponent from '../../components/TranslationComponent/TranslationComponent.tsx';


import Header from '../../components/Header/Header.tsx';
import { Link, useNavigate } from 'react-router-dom';
import GetCookie from '../../components/Utilities/Coookies/GetCookie.ts';
import axios from 'axios';

import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Button, Flex, Layout, Table, TableColumnsType } from 'antd';
import { CloseCircleTwoTone, EditTwoTone, PlusCircleOutlined } from '@ant-design/icons';
import TranslationComponent from '../../components/TranslationComponent/TranslationComponent.tsx';
interface dataType {
    key:number;
    GeorgianMeaning:string;
    EnglishMeaning:string;
    functionalLabel:string;
    status:string;
    }
    const WordList: React.FC = () => {
  const [current, setCurrent] = useState(1);
    const navigate = useNavigate();
    const [WordList, setWordList] = useState([{}]);
    const [pageNumber, setPageNumber] = useState(1);
    const jwt = GetCookie('jwt');
  
    const pageSize = 10;
    useEffect(()=>{
      const fun = async ()=>{
        console.log(jwt)      
        try{
          const response = await axios.get(`http://localhost/api/Entry?pageNumber=${current}&pageSize=${10}`,{
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
              }
      })
    const WordLis1 = (response.data)
  console.log(WordLis1)
const WordLis = (response.data)?.map(item=>{
  const obj ={
    key:item.id,
  GeorgianMeaning:item.georgianHeadword,
EnglishMeaning:item.englishHeadword,
functionalLabel:item.functionalLabel,
status:item.status

}
return obj


})
      setWordList(WordLis)
    console.log(WordLis)
  }
  catch(err:any){
        if(err.response.statusCode===401){
          const refresh = GetCookie('refresh');
          const response  = axios.post('http://localhost/api/identity/refresh', {
            refreshToken:refresh
          },{
            withCredentials:true,
            headers:{
              'Content-Type':'application/json'
            }
          })
         const jwtValue = (await response).data.accessToken;
         const expireIn  = (await response).data.expiresIn;
         const Refresh = (await response).data.refreshToken;
        document.cookie = `jwt=${jwtValue}; max-age=${expireIn}`;
        document.cookie = `refresh=${Refresh}; max-age=${expireIn}`;
      }
  }
  }
fun()
}

,[current])

  const [WordCount , setWordCount] = useState(0);
  useEffect(()=>{
        const length = axios.get("http://localhost/api/entry/count?pageNumber=1&pageSize=200000",{

         headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
              }
        }).then(res=>res.data).then(res=>setWordCount(res));
        console.log("Length",length)

    }

  ,[])
  const [modalIsOpen, setModalOpen] = useState(false);

    function onSave(georgianName: string, englishName: string, id?: number){
        console.log(id);
        console.log(georgianName);
        console.log(englishName);
        localStorage
        setModalOpen(false);
    }
    const  columns: TableColumnsType<dataType> = [
      {
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>ქართული მნიშვნელობა</span>,// რაც  გამოჩნდება ცხრილის სვეტის სათაურში
        // ეს დანარჩენი ორი იგივე სახელისა რაც თემატიკის ობიექტში ველს ქვია
        dataIndex:"GeorgianMeaning",
        key:"GeorgianMeaning",
      },
      {
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>ინგლისური მნიშვნელობა</span>,
        dataIndex:"EnglishMeaning",
        key:"EnglishMEaning",
      },
      {
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>მეტყველების ნაწილი</span>,
        dataIndex:"functionalLabel",
        key:"functionalLabel",
      },
      {
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>სტატუსი</span>,
        dataIndex:"functionalLabel",
        key:"status",
        render:(_,record)=>{
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
        render: (_,record)=>{

          if(record.status==='InActive')
            return (<><Button onClick={()=>{
                const response =  axios.put(`http://localhost/api/Entry/activate/${record.key}`,{},
                  {
                    headers:{
                      'Content-Type':'application/json',
                      'Authorization':"Bearer "+jwt
                    }
                  }
                );
                {
                  document.location.reload
                }
                
                
              }}>გააქტიურება</Button>
             
              
              </>)
          else
             return (<><Button onClick={()=>{
              const response = axios.put(`http://localhost/api/Entry/deactivate/${record.key}`,{},
                {
                  headers:{
                    'Content-Type':'application/json',
                    'Authorization':"Bearer "+jwt
                  }
                }
              );
              {
                location.reload
              }
            
            }
            
            }>დეაქტივაცია</Button></>)

        }
      },
      {
        key:"update",
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>რედაქტირება</span>,
        dataIndex:"update",
        render:(_,record)=>{
            return <Link to={`/update/Entry/${record.key}`} onClick={()=>{console.log(record.key)}}><EditTwoTone width={10}/></Link>
        }
      },
      {
        key:"delete",
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>წაშლა</span>,
        dataIndex:"delete",
        render:(_,record)=>{
          return <Link style={{width:'100%'}} to={`/delete/${record.key}`} onClick={()=>{
            const response = axios.delete(`http://localhost/api/Entry/${record.key}`,
      {
          headers:{
            "Content-Type":"application/json",
            'Authorization':"Bearer "+jwt
          },
          withCredentials:true
      })
    }}><CloseCircleTwoTone width={10}/></Link>
    }
  }
  ]
  

  
    const onChange: PaginationProps['onChange'] = (page) => {
      setCurrent(page);
    }
  
    
    
    
    
    return ( 
      <div className='thematic'>
            <Header/>
            <div style={ {marginLeft: '',  width:'80vw'}} >
            <TranslationComponent

            georgianName=""
            englishName=""
            title="სიტყვის დამატება"
            isOpen={false}
            onSave={onSave}
            onCancel={()=>{}}
  />
    <Flex  gap={'20px'} vertical  style={{}} justify='center'>
    <Layout >
 
      {
        <>
        <Table  onChange={()=>{navigate("#")}} columns={columns} pagination={false} dataSource={WordList}></Table> 
        <Pagination current={current} onChange={onChange} total={WordCount} />;
        </>
        
        
        
        
        }
    
      
      </Layout>
 
    </Flex>
            
            
            </div>

            <TranslationComponent
                georgianName="ქართული"
                englishName="english"
                title={"თემა"}
                isOpen={modalIsOpen}
                onSave={onSave}
                onCancel={() => setModalOpen(false)}
            /> 
        </div>
    )
}


export default WordList;
