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
import { Topics } from '../TypeDef/Types';

const { SubMenu } = Menu;

const { Sider } = Layout;

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
      style={{ height: '100%', margin:"12px 4px", borderRadius:"20px" , background:"none", backdropFilter:"blur(400px)",padding:'3px 4px', display:"inline-block", position:"relative" , top:"53px", left:'-20px' }}
    >
        <Menu.Item onClick={(id)=>handleFilterByThematic(null)}>ყველა</Menu.Item>
    {
      item?.map(item=>{
    return  item.status=="Active"?  <SubMenu key={item.id}  title={`${item.georgianName}`}> 
          {
              item.subTopics.map(subTopic=> { return subTopic.status=="Active"? <Menu.Item onClick={(id)=>handleFilterByThematic(subTopic.id)} key={subTopic.id}>{subTopic.georgianName}</Menu.Item> 
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