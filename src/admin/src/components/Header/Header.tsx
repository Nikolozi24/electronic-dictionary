import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import "./Header.css"
const { SubMenu } = Menu;

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='headerDiv'>

    <Menu mode="horizontal">
      <Menu.Item onClick={()=>{navigate("/")}} key="home" icon={<HomeOutlined />}>
      მთავარი
      </Menu.Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="ადმინის პანელი">
        <Menu.Item key="profile:1" onClick={()=>{navigate("/addUser")}}>მომხარებლის რეგისტრაცია</Menu.Item>
        <Menu.Item key="profile:2" onClick={()=>{navigate("/addTopic")}}>თემატიკები</Menu.Item>
        <Menu.Item key="profile:3" onClick={()=>{navigate("/subTematic")}}>ქვე თემატიკები</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<SettingOutlined />} title="მოდერატორი">
        <Menu.Item key="setting:1" onClick={()=>{navigate('/fill')}}>სიტყვის დამატება</Menu.Item>
      </SubMenu>
    </Menu>
    </div>
  );
};

export default Header;
