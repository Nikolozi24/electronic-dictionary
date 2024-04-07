import React, { useState } from 'react'
  // ცხრილის  შესაქნელი ბიბლიოთეკა
import { Table , Flex, Layout } from 'antd'
import type { TableColumnsType } from 'antd';
import {Link} from 'react-router-dom';
import {PlusCircleTwoTone , PlusCircleOutlined , CloseCircleTwoTone , EditTwoTone} from "@ant-design/icons" 
  // costum კომპონენტი
import TranslationComponent from '../../Components/TranslationComponent.tsx'

//ცხრილის ველების  მნიშვნელობები
 interface dataType {
    key:number;
    GeorgianMeaning:string;
    EnglishMEaning:string;
 }
const handleDelete=()=>{
}
const Thematic = () => {
  const {Footer , Header, Content} = Layout
  const [isOpen ,  setIsOpen] = useState(false)
    const onSave=  (Georgian , English, id)=>{
            console.log(English , Georgian, id , "onSave")
    }
    const onCancel=(e)=>{
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
            return <Link to={`/update/${record.key}`} onClick={()=>{console.log(record.key)}}><CloseCircleTwoTone width={10}/></Link>
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
    color: '#fff',
    width:'100%',
    backgroundColor: '#4096ff',
  };



    
  return (
      <div style={ {marginLeft: '10%',  width:'80%'}} >
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
    <Layout  content='center'>
      <Header >Header</Header>
      <Content style={{ width:'100%'}} >
      {
        
        <Table  columns={columns} dataSource={data}></Table> 
        
        
        
        
      }
      </Content>
      
      </Layout>
      <Footer style={footerStyle}><button onClick={()=>{ setIsOpen(true)}}><PlusCircleOutlined /> Add New  Tematic</button></Footer>
    </Flex>
    </div>


    
  )
}

export default Thematic