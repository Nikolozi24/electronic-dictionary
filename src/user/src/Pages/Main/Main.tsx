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
import MyFooter from "../../Components/footer/MyFooter";
import image from "../../Images/Background.jpeg"

/// ეს არის მთავარი გვერდი სადაც არის სიტყვების ძებნა , წარმოდგენა და გაილტვრა


const Main:React.FC = () => {
  // ყველა სიტყვა
  const [words, setWords] = useState<Entry[]>([])
  // რამდენი სიტყვაა
  const [wordCount, setWordCount] = useState<number>(0)
  // საძიებო სიტყვის შესანახად
  const [value, setValue] = useState<string>("")
  // გვერდის პოზიციის შესანახად, რათა გავიგოთ რომელ გვერდძე ვიმყოფებით
  const [current, setCurrent] = useState<number>(1);
  const SearchStyle = {
    width:'70%',
    margin:'2px auto'
  }
  // გვერდებზე როცა გადავდივართ ფუნქცია რომელიც საშუალებას  
  //გვაძლევს გავიგოთ რომელ  გვერძე ვიმყოფებით
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  }
  // წამოვიღოთ ინფორმაცია სიტყვებზე გვერდების და საძიებო სიტყვის ცვლილების მიხედვით
  useEffect(()=>{
    const fun= async ()=>{
 const resp =  await axios.get(`http://localhost/api/entry?pageNumber=${current}&pageSize=${10}&searchText=${value}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
      setWords(data)
    })
 const resp2 =  await axios.get(`http://localhost/api/entry/count?searchText=${value}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
        setWordCount(data)
    })
  }
  fun()


  },[value, current])
  // თემატიკებით გაფილტვრის ფუნქცია
  const handleFilterByThematic= async (id:number)=>{
    
    setCurrent(1);
      

    const resp =  await axios.get(`http://localhost/api/entry?pageNumber=${current}&pageSize=${10}&searchText=${value}&${id!==null? `subTopicId=${id}`:""}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
      setWords(data)
    })
    const resp2 =  await axios.get(`http://localhost/api/entry/count?pageNumber=${current}&searchText=${value}&${id!==null? `subTopicId=${id}`:""}`,{
      headers:{
        "Content-Type":'application/json'
      }
    }).then(res=>res.data).then( data=>{
      setWordCount(data)
    })
  }
  return (  
  <div className="main_page" style={{backgroundImage:`url(${image}`, backgroundRepeat:'no-repeat' , backgroundSize:"cover", height:"auto", opacity:"0.95"}} >
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
      
          <ul className="listOfWord">
            {
            // სიტყვების წარმოდგენა
              words?.map(item=>{
                return item.status=="Active"? <Word word={item}/> :<></>
              })
            }
         </ul>
          
  <Pagination 
  className="Pagination"
  pageSizeOptions={[]} // Disable page size options
  current={current} onChange={onChange} total={wordCount}/>
    </div>
</div>


            <MyFooter/>

          {/* <ToolTip/> */}


  </div>
        
  )
}

export default Main