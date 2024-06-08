import { useEffect, useState} from 'react'
  import {useNavigate}  from 'react-router-dom'
import { Table , Flex, Layout } from 'antd'
import type { TableColumnsType } from 'antd';
import {Link} from 'react-router-dom';
import TranslationComponent from './TranslationComponent/TranslationComponent';
import {PlusCircleOutlined , CloseCircleTwoTone , EditTwoTone} from "@ant-design/icons" 
import { useDispatch } from 'react-redux';
import axios from './API/axios';
import GetCookie from './Utilities/GetCookie';
;

  // costum კომპონენტი

//ცხრილის ველების  მნიშვნელობები
 interface dataType {
    id:number;
    GeorgianMeaning:string;
    EnglishMEaning:string;
 }

const Thematic:React.FC = () => {
  const navigate = useNavigate();
  // დავუშვათ და გვაქვს სზოგადად წამოღებული 
  //ბაზიდად ტოპიკები რომელსაც აქვს ეს ველები 
  // შემდეგ ამას დავმაპავთ და მხოლოდ იმ ველებს 
  //ამოვიღებთ რომლებიც გამოსაჩენად გვჭირდება

  
    // აქ განვსაზღვრავ თუ რა ველები არის საჭირო ცხრილის სახით გამოსაჩენათ
    // 
    const [thematics,setThematics] =useState([{id:"", GeorgianMeaning:"", EnglishMeaning:""}]) 

  useEffect(   ()=>{
    const accToken = GetCookie('jwt')
   const  response =  axios.get("http://localhost/api/topic",{
     
          headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            'Authorization':'Bearer'+" "+accToken
          }
    }).then(resp =>console.log(resp.data))

  },
  [])
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const onSave=(geo:string, english:string, id:any)=>{
      console.log({geo, english,id})


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
      key:"update",
      title:"რედაქტირება",
      dataIndex:"update",
      render:(_,record)=>{
          return <Link to={`/update/${record.key}`} onClick={()=>{console.log(record.key)}}><EditTwoTone width={10}/></Link>
      }
    },
    {
      key:"delete",
      title:"წაშლა",
      dataIndex:"delete",
      render:(_,record)=>{
        return <Link style={{width:'100%'}} to={`/delete/${record.key}`} onClick={()=>{console.log(record.key)}}><CloseCircleTwoTone width={10}/></Link>
      }
    },
  ]
// აქ ცხრილის მონაცემების მასივს ვქმნი
  const data: dataType[]= thematics.map(item=>{
    // ამოვიღებ დესტრუქტურიზაციით იმ ველებს რომლებიც მჭირდება
    const {id, GeorgianMeaning, EnglishMeaning } = item;
    // ვქმნი ობიექტს შესაბბამისი ველებით და ვაბრუნებ
      const obj = {
              key:id,
              GeorgianMeaning:GeorgianMeaning,
              EnglishMeaning:EnglishMeaning
        }
        return obj
      }
    )
 
      
      
  const dispatch = useDispatch()
  
console.log(data)

    
  return (
      <div style={ {marginLeft: '',  width:'80vw'}} >
            <TranslationComponent
            id={1}
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
  <button style={{width:'510px' , margin:'auto', backgroundColor:'green'
  }} onClick={()=>{ setIsOpen(true)}}><PlusCircleOutlined /> Add New  Tematic</button>
    </Flex>
    </div>


    
  )
}

export default Thematic