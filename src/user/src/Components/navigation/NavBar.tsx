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
  const style= {  margin:'12px 0px',
                  borderRadius:"20px" ,width:"110%", 
                  backdropFilter:"blur(30px)",
                  background:'linear-gradient(140deg , #36BA98 30%, #E76F51 40%)',
                  padding:'13px 14px', display:"inline-block",
                   position:"relative" , top:"53px", 
                   fontSize:"18px",
                   opacity:"0.95",
                   left:'-20px' }

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