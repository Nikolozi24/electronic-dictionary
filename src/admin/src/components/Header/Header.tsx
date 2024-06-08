import React, { useEffect , useState} from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import RemoveCookie from '../Utilities/RemoveCookie';
import "./Header.css"

const { SubMenu } = Menu;



const Header: React.FC = () => {
  const role = useSelector(state=>state.auth.auth.role)
  console.log(role)
  const handleLogaut=()=>{
    RemoveCookie("jwt")
    RemoveCookie("refresh")
    navigate("/")
  }
 

  const navigate = useNavigate();
  return (
    <div className='headerDiv'>

    <Menu mode="horizontal">
     {role==="super_admin" && <SubMenu key="sub1" icon={<UserOutlined />} title="ადმინის პანელი">
        <Menu.Item key="profile:1" onClick={()=>{navigate("/addUser")}}>მომხარებლის რეგისტრაცია</Menu.Item>
        <Menu.Item key="profile:2" onClick={()=>{navigate("/addTopic")}}>თემატიკები</Menu.Item>
        <Menu.Item key="profile:3" onClick={()=>{navigate("/subTematic")}}>ქვე თემატიკები</Menu.Item>
      </SubMenu>
      }
      <SubMenu key="sub2" icon={<SettingOutlined />} title="მოდერატორი">
        <Menu.Item key="setting:1" onClick={()=>{navigate('/fill')}}>სიტყვის დამატება</Menu.Item>
      </SubMenu>
      <Menu.Item onClick={()=>handleLogaut()} key="home" icon={<LogoutOutlined />}>
     გამოსვლა
      </Menu.Item>
    </Menu>
    </div>
  );
};

export default Header;
