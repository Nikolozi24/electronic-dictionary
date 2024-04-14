import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link , useNavigate ,  useLocation} from 'react-router-dom'

import axios from 'axios'
import "./Login.css"
import {useStore} from "../../components/ContextAPI/StoreProvider.jsx"
import { useForm } from 'react-hook-form';

interface valueType {
  values:{
    username:string;
    password:string;
    remember:boolean;
  }
}
const LoginForm: React.FC = () => {



  const { setAuth } =useStore();
  const BASE_URL = 'http://localhost:5173/';
  const LOGIN_URL ='/auth';
  const navigate = useNavigate();
  
  // რომ გავიგოთ თუ რომელ გვერდიდან გადმოვიდა
  const location = useLocation();
  
  const from  = location.state?.from?.pathname || "/";
  const onFinish =  async (values:any) => {
    /// ნავიგაციისთის
    try{
        const response = await axios.post( `${BASE_URL}${LOGIN_URL}`, JSON.stringify({values})
      ,{
            headers:{"Content-Type":'application/json'},
            withCredentials:true
        }
      )
      const accessToken = response.data.accessToken;
      const roles = response.data.roles
      console.log(values , values.user)
      setAuth({ user:values?.username ,password:values?.password, roles, accessToken});
      navigate(from , {replace:true})

    }

    catch(err:any){
      console.log(values.username)
      if(!err?.response){
          alert("No Server Response")
      }
      else if(err.response?.status ===400){
        alert("missing username or password")
      }
      else if(err.response?.status===401){
          alert("Unauthorized")
      }
          else{
              alert("Login Failed");

          }
      }

    }


  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish }
    >
      <Form.Item
        rules={[{ required: true, message: 'Please input your Username!' }]}
        name="username"
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
       
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
