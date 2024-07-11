import React, { useEffect, useState } from 'react'
import axios from "axios"
import AxiosErrorHandling from "../Utilities/ErrorHandling/AxiosErrorHandling";
import {  Menu } from 'antd';

import { Topics } from '../TypeDef/Types';

const { SubMenu } = Menu;


interface NaBarProsp{
  handleFilterByThematic:(e:any)=>void

}
const NavBar:React.FC<NaBarProsp> = (props) => {
  const {handleFilterByThematic} = props
    const [item,setItem] = useState<Topics>();
    useEffect(()=>{
      const fun = async ()=>{
        try{
          const resp =  await axios.get("http://localhost/api/topic",{
            headers:{
              "Content-Type":"application/json"
            }
          })
          setItem(resp.data)
          console.log(item)
      }
      
      catch(err:any){
        AxiosErrorHandling(err)
      }
    }
    fun();
  },[item?.length])
  const style:{}= { 
    position: 'relative',
    top: '90px',
    left: '0',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    borderTop: 'none',
    width: '200px',
    heigh:'100%',
    padding: '10px',
    zIndex: '1000',
      }

  return (
  //   <Menu mode="horizontal">
      
  //   {
  //      item.map(item=>{
  //   return   <SubMenu key={item.id}  title={`${item.georgianName}`}>
  //         {
  //           item.subTopics.map(subTopic=>{ return<Menu.Item key={subTopic.id}>{subTopic.georgianName}</Menu.Item> 


  //           })}
        
  //     </SubMenu>
  //      }
  //      )  
  // }

  //   </Menu>

  
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['']}
      style={style}
    >
        <Menu.Item onClick={(id)=>handleFilterByThematic(null)}>ყველა</Menu.Item>
    {
      item?.map(item=>{
    return  item.status=="Active"?  <SubMenu key={item.id}  title={`${item.georgianName}`}> 
          {
              item.subTopics.map(subTopic=> { return subTopic.status=="Active"? <Menu.Item style={{fontFamily:"fantasy"}} onClick={(id)=>handleFilterByThematic(subTopic.id)} key={subTopic.id}>{subTopic.georgianName}</Menu.Item> 
                :<></>

           })}
        
     </SubMenu>:<></>
       }
      )  
 }
         </Menu>
 



  )
}

export default NavBar