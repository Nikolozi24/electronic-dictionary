import { Button, Layout} from "antd"

import NavBar from "../../Components/navigation/NavBar"
import { Content, Footer } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider";
import Search from "../../Components/Search";
import { useState } from "react";
import axios from 'axios';
import "./Main.css"
import ToolTip from "../../Components/Footer/ToolTip";
import { Pagination } from 'antd';







const Main:React.FC = () => {
  const [words, setWords] = useState([{}])
  const [current, setCurrent] = useState(1);
  const handleFilterByThematic= async (id)=>{

    const resp =  await axios.get(`http://localhost/api/entry?subTopicId=${id}&pageNumber=${1}&pageSize=${10}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
      setWords(data)
    })
  }
  return (  <Layout  className="mainLayout" style={{width:'100%',
   
   }}>
    <Layout style={{position:"absolute", top:'10vh', left:'100px', width:'300px'}}>
    <Sider  width={300} className="site-layout-background"  title="თემატიკა">
            <NavBar handleFilterByThematic={handleFilterByThematic}/>
    </Sider>
    </Layout>
    <Layout style={{position:"absolute" , borderRadius:'40px',padding:'2px', width:'50%', alignItems:"center",textAlign:"justify", backgroundColor:"#262a5a",border:"1px solid grey",   top:'100px', left:'454px'}}>
      <Content>
            <Search words={words} setWords={setWords}/>
       </Content>

    </Layout>
    <Layout>
      <Footer style={{position:'absolute', bottom:"0px", margin:'auto'}}>
                <ToolTip/>
      </Footer>
    </Layout>
</Layout>
  )
}

export default Main