import React, {useEffect, useState} from "react";
import "./fillWord.css";

import { useForm} from "react-hook-form";


import Header from "../../components/Header/Header";
import axios from "axios";
import GetCookie from "../../components/Utilities/GetCookie";




const FillWordToDatabase:React.FC = () => {

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
    imageUrl:  string;
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

  const { register, getValues } = form;
 
  
//   const [topics, setTopics] = useState([]);
//  useEffect( ()=>{
  
//   // try{
//   //     const jwt = GetCookie('jwt');
//   //   const response =   axios.get("http://localhost/api/topic",{
//   //         headers:{
//   //           'Content-Type':' application/json',
//   //           'Authorization':"Bearer "+jwt
//   //         }
//   //   })
//   //   setTopics(response.data);  
//   // }
//   // catch(err:any){
//   //   if(err.response.status===401 && GetCookie('refresh')){
//   //         const resp = axios.post("http://localhost/api/identity/refresh",{
//   //               refreshToken:GetCookie('refresh')
//   //         },{
//   //           headers:{
//   //             "Content-Type":'application/json'
//   //           }
//   //         }
//   //       )
    
//   //   }
//   //   else{
//   //     alert(err);
//   //   }
//   // }

//  },[])

  return (
    <div className="fillWordForm">
      <Header>

      </Header>
  
      <form className="formFill" onSubmit={(e)=>{ e.preventDefault(); console.log(getValues())}} >
        <select/>
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
   <input id="photo" className="input" {...register("imageUrl",{})} type="file"/>
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
</div>
        <input
          type="text"
          {...register("topic", {required:"ველი სავალდებულოა"})}
          placeholder={`თემატიკა`}
        />
        <input
                type="text"
                placeholder="ქვეთემატიკა"
                {...register("thematic"  ,{required:"ველი სავალდებულოა"})}
        />
        <button  className="submit-button" type="submit">
          Add word
        </button>
      </form>
    </div>
  );
};

export default FillWordToDatabase;
