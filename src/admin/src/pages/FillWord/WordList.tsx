import React, { useEffect, useState } from 'react';
// import { Button, Input, Modal } from 'antd';
// import TranslationComponent from '../../components/TranslationComponent/TranslationComponent.tsx';


import Header from '../../components/Header/Header.tsx';
import { Link, useNavigate } from 'react-router-dom';
import GetCookie from '../../components/Utilities/Coookies/GetCookie.ts';
import axios from 'axios';
import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling.tsx';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Button, Flex, Layout, Table, TableColumnsType } from 'antd';
import { CloseCircleTwoTone, EditTwoTone, PlusCircleOutlined } from '@ant-design/icons';
import TranslationComponent from '../../components/TranslationComponent/TranslationComponent.tsx';
import Search from '../../components/Search/Search.tsx';
const WordList: React.FC = () => {
      interface dataType {
          key:number;
          GeorgianMeaning:string;
          EnglishMeaning:string;
          functionalLabel:string;
          status:string;
          }
  const [current, setCurrent] = useState(1);
  const [value, setValue] = useState("")
    const navigate = useNavigate();
    const [WordList, setWordList] = useState([{}]);
    const [pageNumber, setPageNumber] = useState(1);
    const jwt = GetCookie('jwt');
  
    const pageSize = 10;
    useEffect(()=>{
      const fun = async ()=>{     
        try{
          const response = await axios.get(`http://localhost/api/entry?pageNumber=${current}&pageSize=${10}&searchText=${value}`,{
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
              }
      })
    const WordLis1 = (response.data)
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
  }
  catch(err:any){
       AxiosErrorHandling(err);    
  }
  }
fun()
}

,[current,value])

  const [WordCount , setWordCount] = useState(0);
  useEffect(()=>{
      const fun =async ()=>{
        try{
        const length = axios.get("http://localhost/api/entry/count",{

         headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
              }
        }).then(res=>res.data).then(res=>{setWordCount(res);console.log(res)});
      }
      catch(err:any){
        AxiosErrorHandling(err);
      }
      }
      fun();
    }

  ,[])
  const [modalIsOpen, setModalOpen] = useState(false);

    function onSave(georgianName: string, englishName: string, id?: number){
       // localStorage
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
                  try{
                    const fun  = async ()=>{
                const response = await  axios.put(`http://localhost/api/entry/activate/${record.key}`,{},
                  {
                    headers:{
                      'Content-Type':'application/json',
                      'Authorization':"Bearer "+jwt
                    }
                  }
                );
                location.reload();
              }
              fun();
              }
              catch(err:any){
                AxiosErrorHandling(err);
              }
                
              }}>გააქტიურება</Button>
             
              
              </>)
          else
             return (<><Button onClick={()=>{
              try{
                const fun  = async ()=>{
              const response = await axios.put(`http://localhost/api/Entry/deactivate/${record.key}`,{},
                {
                  headers:{
                    'Content-Type':'application/json',
                    'Authorization':"Bearer "+jwt
                  }
                }
              );
              location.reload();
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
        key:"update",
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>რედაქტირება</span>,
        dataIndex:"update",
        render:(_,record)=>{
            return <Link to={`/update/Entry/${record.key}`} onClick={()=>{}}><EditTwoTone width={10}/></Link>
        }
      },
      {
        key:"delete",
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>წაშლა</span>,
        dataIndex:"delete",
        render:(_,record)=>{
          return <button style={{width:'100%'}}  onClick={()=>{
            try{
              const fun = async() =>{
            const response = await axios.delete(`http://localhost/api/entry/${record.key}`,
      {
          headers:{
            "Content-Type":"application/json",
            'Authorization':"Bearer "+jwt
          },
      }).then(res=>location.reload())
   
    }
    fun()
    }
    catch(err:any){
      AxiosErrorHandling(err);
    }
    }}><CloseCircleTwoTone width={10}/></button>
    }
  }
  ]
  

  
    const onChange: PaginationProps['onChange'] = (page) => {
      setCurrent(page);
    }
    const handleChange= (e)=>{
          const val = e.target.value;
          setValue(val)
    }
    
    
    
    
    return ( 
      <div className='thematic'>
            <Header/>
            {/* <input type='text' value={value} onChange={(e)=>handleChange(e)}/> */}
          

            <Search value={value} handleChange={handleChange}/>
       
            
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
        <Pagination current={current} onChange={onChange} total={WordCount} />
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
