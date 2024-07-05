import { useState, useEffect} from 'react'
import {useNavigate}  from 'react-router-dom'
import { Table , Flex, Layout, Button } from 'antd'
import type { TableColumnsType } from 'antd';
import {Link} from 'react-router-dom';
import TranslationComponent from './TranslationComponent/TranslationComponent';
import {PlusCircleOutlined , CloseCircleTwoTone , EditTwoTone} from "@ant-design/icons" 

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { thematicActions } from './Store/redux/thematicSlice';
import GetCookie from './Utilities/Coookies/GetCookie';
import axios from 'axios';
import AxiosErrorHandling from './Utilities/ErrorHandling/AxiosErrorHandling';
;

  // costum კომპონენტი
  
  //ცხრილის ველების  მნიშვნელობები
  interface dataType {
    key:number;
    GeorgianMeaning:string;
    EnglishMeaning:string;
    status:string;
  }
  
  const Thematic:React.FC = () => {
    const navigate = useNavigate();
  // დავუშვათ და გვაქვს სზოგადად წამოღებული 
  //ბაზიდად ტოპიკები რომელსაც აქვს ეს ველები 
  // შემდეგ ამას დავმაპავთ და მხოლოდ იმ ველებს 
  //ამოვიღებთ რომლებიც გამოსაჩენად გვჭირდება
  
  
  // აქ განვსაზღვრავ თუ რა ველები არის საჭირო ცხრილის სახით გამოსაჩენათ
  // 
  const [isViewer, setIsViewer] = useState<boolean>(false)
  useEffect(() => {
    const fun = async () => {
  
      try{
      const response = await axios.get("http://localhost/api/identity/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      const user = response.data;
      const isVie= user.isViewer
      setIsViewer(isVie)
       
      }
  
      catch(err:any){
        AxiosErrorHandling(err);
      }
    };
    fun();
  }, []);
  const [thematic, setThematic] = useState([{}]);
  const jwt = GetCookie('jwt');
  
  
    useEffect(()=>{
      const fun = async ()=>{
          
          const response = await axios.get('http://localhost/api/topic',{
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
              }
      })
      const thematis = response.data
      setThematic(thematis)
      }
    fun()
    }

    ,[thematic.length])
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const onSave=(geo:string, english:string, id:any)=>{
        const response = axios.post("http://localhost/api/topic",{
              georgianName:geo,
              englishName:english
        },
      {
          headers:{
            "Content-Type":"application/json",
            'Authorization':"Bearer "+jwt
          }
      }).then(res=>{ setIsOpen(false); document.location.reload()})

   
    
  }
  
  const  columns: TableColumnsType<dataType> = [
    {
      title:"თემატიკა",// რაც  გამოჩნდება ცხრილის სვეტის სათაურში
      // ეს დანარჩენი ორი იგივე სახელისა რაც თემატიკის ობიექტში ველს ქვია
      dataIndex:"GeorgianMeaning",
      key:"GeorgianMeaning",
    },
    {
      title:"Thematic",
      dataIndex:"EnglishMeaning",
      key:"EnglishMEaning",
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
      title:!isViewer &&<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>აქტივაცია/დეაქტივაცია</span>,
      dataIndex:"status",
      render: (_,record)=>{

        if(record.status==='InActive')
          return (!isViewer&&<><Button onClick={()=>{
                try{
                  const fun  = async ()=>{
              const response = await  axios.put(`http://localhost/api/topic/activate/${record.key}`,{},
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
           return (!isViewer&&<><Button onClick={()=>{
            try{
              const fun  = async ()=>{
            const response = await axios.put(`http://localhost/api/topic/deactivate/${record.key}`,{},
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
      title:!isViewer&&"რედაქტირება",
      dataIndex:"update",
      render:(_,record)=>{
          return !isViewer && <Link to={`/update/${record.key}`} onClick={()=>{console.log(record.key)}}><EditTwoTone width={10}/></Link>
      }
    },
    {
      key:"delete",
      title:!isViewer&&"წაშლა",
      dataIndex:"delete",
      render:(_,record)=>{
        return !isViewer&&<Link style={{width:'100%'}} to={`/delete/${record.key}`} onClick={()=>{
          try{
          const response = axios.delete(`http://localhost/api/topic/${record.key}`,
    {
        headers:{
          "Content-Type":"application/json",
          'Authorization':"Bearer "+jwt
        },
        withCredentials:true
    })}
    catch(err:any){
      AxiosErrorHandling(err);
    }



        }}><CloseCircleTwoTone width={10}/></Link>
      }
    },
  ]
// აქ ცხრილის მონაცემების მასივს ვქმნი

  const data: dataType[]= thematic.map(item=>{
    // ამოვიღებ დესტრუქტურიზაციით იმ ველებს რომლებიც მჭირდება
    const {id, georgianName, englishName, status } = item;
    // ვქმნი ობიექტს შესაბბამისი ველებით და ვაბრუნებ
      const obj = {
              key:id,
              GeorgianMeaning:georgianName,
              EnglishMeaning:englishName,
              status:status
        }
        return obj
      }
    )
 
      
      
const dispatch = useDispatch()
  

    
  return (
      <div style={ {marginLeft: '',  width:'80vw'}} >
            <TranslationComponent

            georgianName=""
            englishName=""
            title="სიტყვის დამატება"
            isOpen={isOpen}
            onSave={onSave}
            onCancel={()=>{setIsOpen(false)}}
  />
    <Flex  gap={'20px'} vertical  style={{}} justify='center'>
    <Layout >
 
      {
        
        <Table  columns={columns} dataSource={data}></Table> 
        
        
        
        
      }
    
      
      </Layout>
  { !isViewer&&<button style={{width:'510px' , margin:'auto', backgroundColor:'green'
  }} onClick={()=>{ setIsOpen(true)}}><PlusCircleOutlined /> თემატიკის დამატება</button>}
    </Flex>
    </div>


    
  )
}

export default Thematic