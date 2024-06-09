import React from "react";
import { useState, useEffect } from "react";
import "./AddSubTopic.css";
import Header from "../../components/Header/Header";
import "./InputStyle.scss";
import axios from "axios";
import GetCookie from "../../components/Utilities/Coookies/GetCookie";
import { useNavigate, useNavigation , Link} from "react-router-dom";
import { CloseCircleTwoTone, EditTwoTone, PlusCircleOutlined } from "@ant-design/icons";
import { Flex, Layout, Table, TableColumnsType } from "antd";
import TranslationComponent from "../../components/TranslationComponent/TranslationComponent";
// just for testing thematic list
interface dataType {
  key:number;
  GeorgianMeaning:string;
  EnglishMEaning:string;
  subthematics:string[];
}

const AddSubTopic: React.FC = () => {


    const jwt = GetCookie('jwt');

    useEffect(()=>{
      const fun = async ()=>{
        console.log(jwt)      
          const response = await axios.get('http://localhost/api/topic',{
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
              }
      })
      const thematis = response.data
      setThematic(thematis)
      }
    fun()
    }

    ,[])
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const onSave=(geo:string, english:string, id:any)=>{
        const response = axios.post("http://localhost/api/topic",{
              georgianName:geo,
              englishName:english
        },
      {
          headers:{
            "Content-Type":"application/json",
            'Authorization':"Bearer "+jwt
          }
      })

    setIsOpen(false)
  }
  
  const  columns: TableColumnsType<dataType> = [
    {
      title:"თემატიკა",// რაც  გამოჩნდება ცხრილის სვეტის სათაურში
      // ეს დანარჩენი ორი იგივე სახელისა რაც თემატიკის ობიექტში ველს ქვია
      dataIndex:"GeorgianMeaning",
      key:"GeorgianMeaning",
    },
    {
      title:"Thematic",
      dataIndex:"EnglishMeaning",
      key:"EnglishMEaning",
    },
  ]
          // აქ ცხრილის მონაცემების მასივს ვქმნი
          const [thematic, setThematic] = useState([
          {
            id:1,
            georgianName:"",
            englishName:""
          }
          ]);
          const data: dataType[]= thematic.map(item=>{
    // ამოვიღებ დესტრუქტურიზაციით იმ ველებს რომლებიც მჭირდება
    const {id, georgianName, englishName } = item;
    // ვქმნი ობიექტს შესაბბამისი ველებით და ვაბრუნებ
      const obj = {
              key:id,
              GeorgianMeaning:georgianName,
              EnglishMeaning:englishName
        }
        return obj
      }
    )
    const [isFilled, setIsFilled] = useState<Boolean>(false);

    useEffect(()=>{
      const fun = async ()=>{
        console.log(jwt)
          const response = await axios.get('http://localhost/api/topic',{
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
              }
      })
      const thematis = response.data.map((item:{})=>{
            return {
              id:item.id,
              georgianName:item.georgianName
            }
          }

      )
      setThematic(thematis)
      }
    fun()
    }
    ,[])
    console.log(thematic)

  const navigate = useNavigate();
  // იღებს ინფორმაციას ველებიდან და  უბრალოდდ აკონსოლებს მათ
  const HandleSubmit:React.FC = (e: any) => {
    e.preventDefault();
    const elem = document.getElementById("thematic");
    const selectedValue = elem.value;
    const subThematicGeo = document.getElementById("subtopic").value;
    const subThematicEng = document.getElementById("sub").value;
    const obj = {
      topicId:selectedValue,
      georginName: subThematicGeo,
      englishName: subThematicEng,
    };
  try  {
    const response = axios.post('http://localhost/api/topic/subTopic',{
      topicId:selectedValue,
      georginName: subThematicGeo,
      englishName: subThematicEng,
    },
      {
        headers:{
          'Accept':'application/json',
           "Content-Type":"application/json",
           "Authorization":"Bearer "+jwt
           }
           }
           )
          console.log(response)
  }
  catch(err){
    alert(err)
  }
    
    console.log(obj);
    navigate('/added')


  };
  const [thematicId, setThematicId] = useState(0)

  return (<>
  <div className="add-sub-topic-header">

        <Header/>
  </div>
    <div className="add sub-tematic">
      <div className="add-sub-thematic">
      <div style={ {marginLeft: '',  width:'80vw'}} >
           
    <Flex  gap={'20px'} vertical  style={{}} justify='center'>
    <Layout >
      { 
        <Table  columns={columns} dataSource={data}></Table> 
      }
      </Layout>
  <button style={{width:'510px' , margin:'auto', backgroundColor:'green'
  }} onClick={()=>{ setIsOpen(true)}}><PlusCircleOutlined /> ქვეთემატიკის დამატება </button>
    </Flex>
    </div>

        {isOpen && <form>
          <select name="thematic" className="minimal" id="thematic">
            {
            thematic.map((item) => {
                return <option onClick={()=>{setIsFilled(true)}}key={item.id} value={item.id}>{item.georgianName}</option>;
            })}
          </select>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="ქვეთემატიკა ქართულად"
              name="subtopic"
              id="subtopic"
              
              required
              />
            <label htmlFor="subtopic" className="form__label">
              ქვეთემატიკა ქართულად
            </label>
          </div>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="ქვეთემატიკა ინგლისურად"
              name="sub"
              id="sub"
              required
              />
            <label htmlFor="sub" className="form__label">
              ქვეთემატიკა ინგლისურად
            </label>
          </div>
          <button onClick={(e) => HandleSubmit(e)}>დამატება</button>
        </form>}
      </div>
    </div>
              </>
  );
};

export default AddSubTopic;
