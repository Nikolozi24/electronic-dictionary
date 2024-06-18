import { Button, Layout, Tooltip} from "antd"

import NavBar from "../../Components/navigation/NavBar"
import { Content } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider";
import Search from "../../Components/Search";








const Main:React.FC = () => {
  return (  <Layout style={{backgroundColor:'blue', width:'100%',
   
   }}>
    <Layout style={{position:"absolute", top:'10vh', left:'100px', width:'300px'}}>
    <Sider  width={300} className="site-layout-background"  title="თემატიკა">
            <NavBar/>
    </Sider>
    </Layout>
    <Layout style={{position:"absolute" , width:'800px',  top:'100px', left:'454px'}}>
      <Content>
            <Search/>
       </Content>
    </Layout>
</Layout>
  )
}

export default Main