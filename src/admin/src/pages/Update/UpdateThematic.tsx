import React ,{ useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TranslationComponent from "../../components/TranslationComponent/TranslationComponent";
import UseAxiosPrivate from "../../components/Hooks/UseAxiosPrivate";
import { axiosPrivate } from "../../components/API/axios";



const UpdateThematic:React.FC=() => {
   const BASE_URL = 'http://localhost:5173/'
   const { ID } = useParams();
   const [thematic,setThematic] = useState({
    id:ID,
    GeorgianMeaning:"",
    EnglishMeaning:"",
    subtopics:[""]
   })

   useState(()=>{
       try{
           const response = async ()=>  await  axiosPrivate.get(`http://localhost/api/topic/${ID}`);
            setThematic = {
                  

            }
       }  
         catch(err){   
           console.log(err);

       }
       console.log(ID);
       console.log(typeof(ID))
   },[ID])
   ///useParam-ით გავიგოთ თუ რა აიდის მატარებელი ელემენტი უნდა დააბდეითდეს
   const navigate  =useNavigate();
   console.log(useParams()?.ID)
    const [isOpen ,  setIsOpen] = useState(true)
    const onSave=  (Georgian:any , English:any, id?:any)=>{
        try{   

         const response = async ()=>  await  axiosPrivate.put("http://localhost/api/topic",{
        id:ID,
        georgianName:thematic.GeorgianMeaning,
        englishName:thematic.EnglishMeaning
      },{
      })
    console.log(response)
    }
    catch(resp){
          alert("shecdoma")
    } 
            console.log(English , Georgian, id , "onSave")
  
            navigate('/added')
        }
    const onCancel=()=>{
        navigate(-1)
        setIsOpen(false);
          //navigate(-1)
    }
    return (
    <div>

            <TranslationComponent
            id={thematic.id}
            georgianName={thematic.GeorgianMeaning}
            englishName={thematic.EnglishMeaning}
            title="სიტყვის რედაქტირება"
            isOpen={isOpen}
            onSave={onSave}
            onCancel={onCancel}
             />
        
    </div>
  )
}
export default UpdateThematic