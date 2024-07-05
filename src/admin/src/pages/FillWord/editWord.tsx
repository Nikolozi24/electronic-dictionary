import React, { useEffect, useState } from "react";
import "./fillWord.css";

import { useForm } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import GetCookie from "../../components/Utilities/Coookies/GetCookie";
import axios from "axios";

import AxiosErrorHandling from "../../components/Utilities/ErrorHandling/AxiosErrorHandling";
import Item from "antd/es/list/Item";

import { SubTopic, fillWord } from "../../components/TypeDef/Types";
import { NULL } from "sass";

const EditWordToDatabase:React.FC = () => {
 const jwt = GetCookie('jwt')
  const { id } = useParams();
  const [subTopicId, setSubTopicId] = useState(0)
  const [subTopic, setSubTopic] = useState<SubTopic>()
  const form = useForm<fillWord>({
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
    const { register, setValue, getValues, watch , formState, handleSubmit} = form;
    const [subThematic, setSubThematic] = useState([{
      id:1,
      georgianName:"",
      englishName:""
      
    }]);
    const [thematic, setThematic] = useState<[{id:number; georgianName:string; englishName:string;}]>([
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
const [imageURL,setImageURL] = useState<string>('')
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
  getValues();
  const val = getValues("imageUrl")
  setImageURL(val)

},[getValues("imageUrl")])

  console.log(thetamticId)
  const Submit=()=>{
   
    console.log('submit')
    console.log(getValues())
    const el = document.getElementById('Sub-thematic')
    const value = el?.value;
    try{
      const fun = async()=>{
        console.log({...getValues(), subTopicId:subTopicId, id:id})
        await axios.put("http://localhost/api/entry",{...getValues(),imageUrl:imageURL, subTopicId:parseInt(value), id:parseInt(id)},{

          headers:{
            'Content-Type':'application/json',
            'Authorization':"Bearer "+ jwt
          }
        })
      }
      fun();
      alert("რედაქტირება წარმატებით დამთავრდა ")
      navigate("/EntryList")

  }catch(err){
    AxiosErrorHandling(err);
  }
}

useEffect(()=>{
  try{
  const fun = async()=>{
  const file = getValues("imageUrl")?.[0]
  console.log("file" , file);
  const formData = new FormData();
  if(file){
  formData.append('file',file)
  }
  const response = await fetch('http://localhost/api/multimedia/', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': "Bearer " + jwt
    }
  }).then(res=>res.json()).then(data=>setValue("imageUrl", data))
  }
  fun();
  console.log(getValues("imageUrl"))
  }
  catch(err){
    AxiosErrorHandling(err);
  }

},[document.getElementById("photo")?.value])
useEffect(()=>{},[watch("imageUrl")])
  return (
    <div className="fillWordForm">
      <Header>

      </Header>
      <form className="formFill" onSubmit={handleSubmit(()=>Submit(), ()=>{alert("error")})} noValidate >   
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

        <span className="Required">სავალდებულო*</span>

<input
  type="text"
  {...register("georgianHeadword", {
    required: {
      value:true,
      message:"მეთაური სიტყვა სავალდებულოა!"},
      pattern:{
        value:/[\u10D0-\u10F9]+/g,
        message:"სიტყვა უნდა იყოს ქართული!"
       }
  })}
  placeholder={`  მეთაური სიტყვა`}
  className={`${formState.errors?.georgianHeadword? "bg-red":""}`}
  />
<p style={{}}>{formState.errors?.georgianHeadword?.message}</p>
<span className="Required">სავალდებულო*</span>

<input
  type="text"
  {...register("functionalLabel", {
    required: "მეტყველების ნაწილის ველი სავალდებულოა!",
  })}
  placeholder={"მეტყველების ნაწილი"}
  className={`${formState.errors?.functionalLabel? "bg-red":""}`} 
/>
<div>{formState.errors?.functionalLabel?.message}</div>
  <span className="Required">სავალდებულო*</span>

<input
 className={`${formState.errors?.stylisticQualification? "bg-red":""}`} 
  type="text"
  {...register("stylisticQualification", { required:{
    value:true,
    message:"სტილისტური კვალიფიკაციის ველი სავალდებულოა"
    }})}
  placeholder={` სტილისტური კვალიფიკაცია`}
/>
  <p style={{}}>{formState.errors?.stylisticQualification?.message}</p>
  <span className="Required">სავალდებულო*</span>
<input
 className={`${formState.errors?.englishHeadword? "bg-red":""}`} 
  type="text"
  {...register("englishHeadword", {
    required: "მეთაური სიტყვის ექვივალენტი სავალდებულოა!",
  })}
  placeholder={`მეთაური სიტყვის ექვივალენტი`}
/>
<p style={{}}>{formState.errors?.englishHeadword?.message}</p>
  <span className="Required">სავალდებულო*</span>

<input
 className={`${formState.errors?.georgianDefinition? "bg-red":""}`} 
  type="text"
  placeholder="მეთაური სიტყვის განმარტება"
  {...register("georgianDefinition", { required: "მეთაური სიტყვის ველი სავალდებულოა" })}
/>
<p style={{}}>{formState.errors?.georgianDefinition?.message}</p>
  <span className="Required">სავალდებულო*</span>

<input
  className={`${formState.errors?.englishDefinition? "bg-red":""}`} 
  type="text"
  {...register("englishDefinition", { required: "მეთაური სიტყვის განმარტება ინგლისურად სავალდებულოა" })}
  placeholder={` განმარტება ინგლისურად`}
/>
<p style={{}}>{formState.errors?.englishDefinition?.message}</p>
<input
  type="text"
  placeholder="საილუსტრაციო წინადადება ქართულად"
  {...register("georgianIllustrationSentence")}
/>
 

<input
  type="text"
  placeholder="საილუსტრაციო წინადადების თარგმაანი ინგლისურად"
  {...register("englishIllustrationSentence", { })}
  />
  <span className="Required">სავალდებულო*</span>
<input
   className={`${formState.errors?.source? "bg-red":""}`} 
  type="text"
  {...register("source", { required: " წყარო ველი სავალდებულოა (არ ქონის შემთხვევაში n/a)" })}
  placeholder={`კონტექსტის წყარო`}
/>
<p style={{}}>{formState.errors?.source?.message}</p>
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


  
  {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg> */}

<div id="status"></div>

           <input id="photo" className="" {...register("imageUrl")}  type="file" />
           { getValues("imageUrl") && <img  id="image" src={getValues("imageUrl") || ""}/>}
      { getValues("imageUrl") && <button type="button" onClick={(e)=>{
       e.preventDefault();
            const el = document.getElementById('photo');
             el.value = ""
             setImageURL("")
      
        }}>ფოტოს წაშლა</button>
      }
        <button  className="submit-button" type="submit">
         რედაქტირება
        </button>
      </form>
    </div>
  );
};

export default EditWordToDatabase;
