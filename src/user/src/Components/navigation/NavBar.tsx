import React, { useEffect, useState } from 'react'
import axios from "axios"
import AxiosErrorHandling from "../Utilities/ErrorHandling/AxiosErrorHandling";
import { Layout, Menu } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { Content } from 'antd/es/layout/layout';

const { SubMenu } = Menu;

const { Sider } = Layout;


const NavBar:React.FC = (props) => {
  const {handleFilterByThematic} = props
    const [item,setItem] = useState([{
      subTopics:[{}]
    }]);
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
  },[item.length])

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
      style={{ height: '100%', borderRight: 0 }}
    >
    {
      item.map(item=>{
    return   <SubMenu key={item.id}  title={`${item.georgianName}`}>
          {
         item.subTopics.map(subTopic=>{ return<Menu.Item onClick={(id)=>handleFilterByThematic(subTopic.id)} key={subTopic.id}>{subTopic.georgianName}</Menu.Item> 


           })}
        
     </SubMenu>
       }
      )  
 }
         </Menu>
 



  )
}

export default NavBar