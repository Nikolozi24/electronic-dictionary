import { Button, Layout, PaginationProps} from "antd"

import NavBar from "../../Components/navigation/NavBar"
import { Content, Footer } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider";
import Search from "../../Components/Searching/Search";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./Main.css"
import Word from "../../Components/WordRender/Word";
import ToolTip from "../../Components/Footer/ToolTip";
import { Pagination } from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";





const Main:React.FC = () => {
  const [words, setWords] = useState([{}])
  const [wordCount, setWordCount] = useState(0)
  const [value, setValue] = useState("")
  const [current, setCurrent] = useState(1);
  const SearchStyle = {
    width:'70%',
    margin:'2px auto'
  }
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  }
  useEffect(()=>{
    const fun= async ()=>{
 const resp =  await axios.get(`http://localhost/api/entry?pageNumber=${current}&pageSize=${10}&searchText=${value}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
      setWords(data)
    })
  }
  fun()

  },[value, current])
  const handleFilterByThematic= async (id)=>{

    const resp =  await axios.get(`http://localhost/api/entry?pageNumber=${current}&pageSize=${10}&searchText=${value}&subTopicId=${id}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
      setWords(data)
    })
}
  return (  
  <div className="main_page">
       <div className='SearchingWordPage'>
          <Link style={{paddingLeft:'20px', color:"black"}} to="/"><HomeOutlined/>მთავარი</Link>
            <Search value={value} words={words} styleAdditional={SearchStyle} setValue={setValue}/>
        </div>
  <div className="main_page_container">
    <div>

          <NavBar handleFilterByThematic={handleFilterByThematic}/>     
    </div>
      <div className="Searching_div">

          <ul>
            {
              words?.map(item=>{
                  return item.status=="Active"? <Word word={item}/> :<></>
              })
            }
         </ul>
    </div>
</div>
<Footer style={{backgroundColor:"#ab4040", width:'90vw', position:'relative',left:'0', marginBottom:'100px'}}>

<Pagination 
  pageSizeOptions={[]} // Disable page size options
  
  current={current} onChange={onChange} total={words.length} 
/>
  </Footer>
          {/* <ToolTip/> */}
  </div>
        
  )
}

export default Main