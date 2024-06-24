import React, { useEffect, useState } from "react";
import "./fillWord.css";

import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import GetCookie from "../../components/Utilities/Coookies/GetCookie";
import axios from "axios";

import AxiosErrorHandling from "../../components/Utilities/ErrorHandling/AxiosErrorHandling";
import Item from "antd/es/list/Item";


const EditWordToDatabase:React.FC = () => {
 const jwt = GetCookie('jwt')
  type formType = {
    georgianHeadword: string;
    functionalLabel:string;
    stylisticQualification: string;
    englishHeadword: string;
    georgianDefinition:string
    englishDefinition: string;
    georgianIllustrationSentence: string;
    englishIllustrationSentence:string;
    source: string;
    idiom: string;
    synonym: string;
    usageNote: string;
    imageUrl:  any;
    subTopicId:number;

  }
  const { id } = useParams();
  const [subTopicId, setSubTopicId] = useState(0)
  const [subTopic, setSubTopic] = useState({})
  const form = useForm<formType>({
    defaultValues: async()=>{
      const response = await fetch(`http://localhost/api/entry/${id}`);
      const data = await response.json();
      setSubTopicId(data.subTopic.id);
      setSubTopic(data.subTopic);
      console.log(subTopicId)
      return {
        
        georgianHeadword:data.georgianHeadword,
        functionalLabel:data.functionalLabel,
        stylisticQualification: data.stylisticQualification,
        englishHeadword: data.englishHeadword,
        georgianDefinition: data.georgianDefinition,
        englishDefinition: data.englishDefinition,
        georgianIllustrationSentence: data.georgianIllustrationSentence ,
                englishIllustrationSentence: data.englishIllustrationSentence ,
                source: data.source ,
                idiom: data.idiom ,
                synonym: data.synonym ,
                usageNote:  data.usageNote ,
                imageUrl: data.imageUrl,
                subTopicId: data?.subTopic?.id ,
                
              }
              
            },
            
            
          })
          const { register, setValue, getValues } = form;
    const [subThematic, setSubThematic] = useState([{
      id:1,
      georgianName:"",
      englishName:""
      
    }]);
    const [thematic, setThematic] = useState([
      {
        id:1,
        georgianName:"",
        englishName:""
        }])
      const navigate = useNavigate();
        useEffect(()=>{
          if(jwt===""){
              navigate('/login')
          }
         
          const fun = async ()=>{
              console.log(jwt)
            try{
          
              const response = await axios.get('http://localhost/api/identity/user',{
                  headers:{
                      'Content-Type':'application/json',
                      'Authorization':"Bearer "+jwt
                  }
          })
        }
  catch(err){
      if(err==400){
          console.log('jwt removed')
      }
  }
      }
      fun();
      },
  [])

      const [thetamticId, setThematicId] = useState(thematic[0].id);
      const [isHide, setisHide] = useState(false);
useEffect(()=>{

  const fun = async ()=>{
    console.log(jwt)
    try{
      const response = await axios.get('http://localhost/api/topic',{
          headers:{
              'Content-Type':'application/json',
              'Authorization':"Bearer "+ jwt
          }
  });
const thematis = response.data
console.log(thematis)
setThematic(thematis)
}
catch(err:any){
  AxiosErrorHandling(err);
}
  
  }
fun()

  },[])

  useEffect(()=>{
    const Thmatic = thematic.filter(item=> {return item.id == thetamticId});
    console.log(Thmatic)
    setSubThematic(Thmatic[0].subTopics)
    console.log(Thmatic[0].subThopics)

  }
,[thetamticId])
const handleThematicSelect  = ()=>{
  var selectElement = document.getElementById("thematic");
  var selectedValue = selectElement.value;
  if(selectedValue=="none"){
    return ;
  }
  else{
    setisHide(true)
   setThematicId(selectedValue);
  }

  
  }

useEffect(()=>{
  console.log(getValues("imageUrl"))

},[getValues("imageUrl")])

  console.log(thetamticId)
  const handleSubmit=(e:any)=>{
    e.preventDefault()
    console.log(getValues())
    const el = document.getElementById('Sub-thematic')
    const value = el?.value;
    try{
      const fun = async()=>{
        const file = getValues("imageUrl")[0];
        console.log("file" , file);
        const formData = new FormData();
        formData.append('file', file)
        console.log(formData)
        if(file!="h"){
   
          const response = await fetch('http://localhost/api/multimedia/', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': "Bearer " + jwt
          }
        }).then(res=>res.json()).then(data=>setValue("imageUrl", data))
     
    }
      else{
        setValue("imageUrl", null)
  
      }
        
        console.log({...getValues(), subTopicId:subTopicId, id:id})
        const resp = await axios.put("http://localhost/api/entry",{...getValues(), subTopicId:parseInt(value), id:parseInt(id)},{

          headers:{
            'Content-Type':'application/json',
            'Authorization':"Bearer "+ jwt
          }
        })
      }
      fun();

  }catch(err){
    AxiosErrorHandling(err);
  }
}


  
  return (
    <div className="fillWordForm">
      <Header>

      </Header>
      <form className="formFill" onSubmit={(e)=>handleSubmit(e)} >   
      <select name="thematic" id="thematic" onChange={() => handleThematicSelect()} className="minimal" >
          <option value="none"   >აირჩეთ თემატიკა </option>;
          {
            thematic.map((item) => {
              return <option key={item.id} onClick={() => {
                setThematicId(item.id);
                console.log(item.id)
              }} value={item.id}>  {item.georgianName} </option>;
            })}
        </select>



        <select name="thematic" id="Sub-thematic" onChange={() => handleThematicSelect()} className="minimal" >
          {
            !isHide && <option value={subTopic?.id}  >{subTopic?.georgianName}</option>}
            {
            subThematic?.map((item) => {
              return <option key={item?.id} onClick={() => {

              }} value={item?.id}>  {item?.georgianName} </option>;
            })}
        </select>

        <input
          type="text"
          {...register("georgianHeadword", {
            required: "მეთაური სიტყვა სავალდებულოა!",
          })}
          placeholder={`  მეთაური სიტყვა`}
        />
        <input
          type="text"
          {...register("functionalLabel", {
            required: "მეტყველების ნაწილის ველი სავალდებულოა!",
          })}
          placeholder={"მეტყველების ნაწილი"}
        />
        <input
          type="text"
          {...register("stylisticQualification", {required:"ველი სავალდებულოა"})}
          placeholder={` სტილისტური კვალიფიკაცია`}
        />
        <input
          type="text"
          {...register("englishHeadword", {
            required: "მეთაური სიტყვის ექვივალენტი სავალდებულოა!",
          })}
          placeholder={`მეთაური სიტყვის ექვივალენტი`}
        />
          <input
          type="text"
          placeholder="მეთაური სიტყვის განმარტება"
          {...register("georgianDefinition" , {required:"ველი სავალდებულოა"})}
          />
        <input
          type="text"
          {...register("englishDefinition", {required:"ველი სავალდებულოა"})}
          placeholder={` განმარტება ინგლისურად`}
        />
                <input
                type="text"
                placeholder="საილუსტრაციო წინადადება ქართულად"
                {...register("georgianIllustrationSentence" , {required:"ველი სავალდებულოა"})}
                />
                <input
                type="text"
                placeholder="საილუსტრაციო წინადადების თარგმაანი ინგლისურად"
                {...register("englishIllustrationSentence" , {required:"ველი სავალდებულოა"})}
                />
        <input
          type="text"
          {...register("source", {required:"ველი სავალდებულოა"})}
          placeholder={`კონტექსტის წყარო`}
        />
        <input
          type="text"
          {...register("idiom", {})}
          placeholder={`იდიომა`}
        />
        <input
          type="text"
          {...register("synonym", {})}
          placeholder={`  სინონიმი`}
        />
        <input
          type="text"
          {...register("usageNote", {})}
          placeholder={`  დამატებითი კომენტარი`}
        />
           <input id="photo" className="" {...register("imageUrl", {})}  type="file" />
        <button  className="submit-button" type="submit">
         რედაქტირება
        </button>
      </form>
    </div>
  );
};

export default EditWordToDatabase;
