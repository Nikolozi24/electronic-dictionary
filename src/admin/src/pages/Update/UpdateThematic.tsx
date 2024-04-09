import React ,{ useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TranslationComponent from "../../components/TranslationComponent/TranslationComponent";
import axios from "axios";




const UpdateThematic:React.FC=() => {
   const BASE_URL = 'http://localhost:5173/'
   const [thematic,setThematic] = useState({
    id:0,
    GeorgianMeaning:"",
    EnglishMeaning:"",
    subtopics:[""]
   })
   const {id } = useParams();
    useState(()=>{
        try{
            const response = async ()=>  await  axios.get(`${BASE_URL}/thematics/${id}`).then(res=>setThematic(res.data))
        }  
          catch(err){   
            console.log(err);

        }
        console.log(id);
    },[id])
    const [isOpen ,  setIsOpen] = useState(true)
    const onSave=  (Georgian:any , English:any, id?:any)=>{
            
            console.log(English , Georgian, id , "onSave")
            navigate('/added')
    }
    const navigate  =useNavigate();
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