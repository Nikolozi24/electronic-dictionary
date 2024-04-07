import React, { useState } from 'react'
  // ცხრილის  შესაქნელი ბიბლიოთეკა
import { Table , Flex, Layout } from 'antd'
import type { TableColumnsType } from 'antd';
import {Link} from 'react-router-dom';
import TranslationComponent from './TranslationComponent/TranslationComponent';
import {PlusCircleOutlined , CloseCircleTwoTone , EditTwoTone} from "@ant-design/icons" 
  // costum კომპონენტი

//ცხრილის ველების  მნიშვნელობები
 interface dataType {
    key:number;
    GeorgianMeaning:string;
    EnglishMEaning:string;
 }
const handleDelete=()=>{
}
const Thematic:React.FC = () => {
  const {Footer , Header, Content} = Layout
  const [isOpen ,  setIsOpen] = useState(false)
    const onSave=  (Georgian:any , English:any, id?:any)=>{
            console.log(English , Georgian, id , "onSave")
    }
    const onCancel=()=>{
          setIsOpen(false)
    }
  const  columns: TableColumnsType<dataType> = [
    {
      title:"თემატიკა",
      dataIndex:"GeorgianMeaning",
      key:"GeorgianMeaning",
    },
      {
        title:"Thematic",
        dataIndex:"EnglishMEaning",
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
            return <Link style={{width:'100%'}} to={`/delete/`} onClick={()=>{console.log(record.key)}}><CloseCircleTwoTone width={10}/></Link>
          }
      },
  ]

  const data: dataType[]= [
      {
          key:1,
          GeorgianMeaning:"წაშლა",
          EnglishMEaning:"remove",
         
      },
      {
          key:2,
          GeorgianMeaning:"დამატება",
          EnglishMEaning:"add",
      },
      {
          key:3,
          GeorgianMeaning:"წაშლა",
          EnglishMEaning:"remove",
      }

  ]
  
console.log(data)

  
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
   
    width:'100%',
    backgroundColor: '#4096ff',
  };



    
  return (
      <div style={ {marginLeft: '',  width:'80vw'}} >
            <TranslationComponent
            id={1}
            georgianName=""
            englishName=""
            title="სიტყვის დამატება"
            isOpen={isOpen}
            onSave={onSave}
            onCancel={onCancel}
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