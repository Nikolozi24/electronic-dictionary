import {PaginationProps} from "antd"

import NavBar from "../../Components/navigation/NavBar"
import { Footer } from "antd/es/layout/layout"

import Search from "../../Components/Searching/Search";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./Main.css"
import Word from "../../Components/WordRender/Word";
import { Pagination } from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { Entry } from "../../Components/TypeDef/Types";

import image from "../../Images/Background.jpeg"
import {AnimatePresence, motion} from "framer-motion"
import MyFooter from "../../Components/footer/MyFooter";


const  Content:React.FC = () => {
  const [words, setWords] = useState<Entry[]>([])
  const [wordCount, setWordCount] = useState<number>(0)
  const [value, setValue] = useState<string>("")
  const [current, setCurrent] = useState<number>(1);

  const SearchStyle = {
    width:'70%',
    margin:'2px auto'
  }
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  }

  useEffect(()=>{
    const fun= async ()=>{
     await axios.get(`http://localhost/api/entry?pageNumber=${current}&pageSize=${10}&searchText=${value}&status=Active`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
      setWords(data)
    })
  await axios.get(`http://localhost/api/entry/count?searchText=${value}&status=Active`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
        setWordCount(data)
    })
  }
  fun()


  },[value, current])
  const handleFilterByThematic= async (id:number)=>{
    
    setCurrent(1);
      

   await axios.get(`http://localhost/api/entry?pageNumber=${current}&pageSize=${10}&searchText=${value}&${id!==null? `subTopicId=${id}`:""}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
      setWords(data)
    })
    await axios.get(`http://localhost/api/entry/count?pageNumber=${current}&searchText=${value}&${id!==null? `subTopicId=${id}`:""}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
      setWordCount(data)
    })
  }
  
  return (  
  <div className="main_page" style={{backgroundImage:`url(${image}`, backgroundRepeat:'no-repeat' , backgroundSize:"cover"}} >
       <div className='SearchingWordPage' >
         
          <Link style={{paddingLeft:'20px', color:"black", }} to="/"><HomeOutlined/>მთავარი</Link>
            {/* <Link style={{color:'black', marginLeft:"20px"}} to="/about-us">ჩვენს შესახებ</Link> */}
            <Search value={value} words={words} styleAdditional={SearchStyle} setValue={setValue}/>
        </div>
  <div className="main_page_container">
    <div className="navigationBar" >

          <NavBar handleFilterByThematic={handleFilterByThematic}/>     
    </div>
      <div className="Searching_div">
<AnimatePresence >

          <ul className="listOfWord">
            {
              words?.map(item=>{
                return item.status=="Active"?
                <motion.div
                initial={{ scale: 5 }}
                whileHover={{scaleX:1.1,
    scaleY:1.1,
    border:0
  }}
  animate={{ rotate: 0, scale: 1 }}
  transition={{
    duration:10,
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
> <Word word={item}/></motion.div> 
:<></>
})
}
         </ul>
</AnimatePresence>
    </div>
</div>
<Footer style={{background:"none", width:'98vw', display:'inline-block', left:'0', bottom:'0px'}}>

  <Pagination 
  pageSizeOptions={[]} // Disable page size options
  current={current} onChange={onChange} total={wordCount}/>
  </Footer>
    <MyFooter/>
  </div>
        
  )
}

export default Content