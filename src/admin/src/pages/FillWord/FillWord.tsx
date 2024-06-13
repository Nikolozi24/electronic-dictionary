import React, { useEffect, useState } from "react";
import "./fillWord.css";

import { useForm, useFieldArray, FieldValue } from "react-hook-form";

import { DeleteFilled } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import GetCookie from "../../components/Utilities/Coookies/GetCookie";
import axios from "axios";
import { Value } from "sass";
import AxiosErrorHandling from "../../components/Utilities/ErrorHandling/AxiosErrorHandling";


const FillWordToDatabase:React.FC = () => {
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
  
  const form = useForm<formType>({
    defaultValues: {
      georgianHeadword: "",
      functionalLabel: "",
      stylisticQualification: "",
      englishHeadword: "",
      georgianDefinition:"",
      englishDefinition: "",
      georgianIllustrationSentence: "",
      englishIllustrationSentence: "",
      source: "",
      idiom: "",
      synonym: "",
      usageNote: "",
      imageUrl:"",
      subTopicId:0,
      },
      })
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
  catch(err:any){
    AxiosErrorHandling(err)
  }
      }
      fun();
      },
  [])

      const [thetamticId, setThematicId] = useState(thematic[0].id);
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
   console.log(selectedValue)
   setThematicId(selectedValue);
  }


  const { register, control , setValue, getValues } = form;
  console.log(thetamticId)
  const handleSubmit=(e:any)=>{
    e.preventDefault()
    console.log(getValues())
    try{
        const file = getValues("imageUrl")[0];
        console.log("file" , file);
        if(file){
          const formData = new FormData();
          formData.append('file' , file);

          fetch('http://localhost:80/api/multimedia/', {
            method: 'POST',
            body: formData
        })
        }
      setValue("imageUrl", "testUrl")
      const el = document.getElementById('Sub-thematic')
      const value = el?.value;
      const response = axios.post("http://localhost/api/entry",{...getValues() , subTopicId: parseInt(value)},{
        headers:{
              "Content-Type":'application/json',
              'Authorization':"Bearer "+jwt
        },
       
      })

  }catch(err:any){
    AxiosErrorHandling(err)
  }
}
  
  return (
    <div className="fillWordForm">
      <Header>

      </Header>
  
      <form className="formFill" onSubmit={(e)=>handleSubmit(e)} >
      <select name="thematic" id="thematic" onChange={()=>handleThematicSelect()}  className="minimal" >
            {
            thematic.map((item) => {
                return <option key={item.id}  onClick={()=>{
                  setThematicId(item.id);
                  console.log(item.id)
                }} value={item.id}>  {item.georgianName} </option>;
            })}
     </select>
   
      <select name="thematic" id="Sub-thematic" onChange={()=>handleThematicSelect()}  className="minimal" >
            {
            subThematic?.map((item) => {
                return <option key={item.id}  onClick={()=>{
                  
                }} value={item.id}>  {item.georgianName} </option>;
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
          placeholder={"ნეტყველების ნაწილი"}
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
          placeholder={`  იდიომა`}
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
        <div className="input-div">
          <label htmlFor="photo">photo</label>
   <input id="photo" className="input" {...register("imageUrl",{})}   type="file"/>
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
</div>
        <button  className="submit-button" type="submit">
          Add word
        </button>
      </form>
    </div>
  );
};

export default FillWordToDatabase;
