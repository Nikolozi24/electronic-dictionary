import React, { useEffect, useState } from "react";
import "./fillWord.css";

import { useForm } from "react-hook-form";


import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import GetCookie from "../../components/Utilities/Coookies/GetCookie";
import axios from "axios";
import AxiosErrorHandling from "../../components/Utilities/ErrorHandling/AxiosErrorHandling";
import { SubTopic, fillWord, Topic } from "../../components/TypeDef/Types";
import { Value } from "sass";


const FillWordToDatabase: React.FC = () => {
  const jwt = GetCookie('jwt')


  const form = useForm<fillWord>({
    defaultValues: {
      georgianHeadword: "",
      functionalLabel: "",
      stylisticQualification: "",
      englishHeadword: "",
      georgianDefinition: "",
      englishDefinition: "",
      georgianIllustrationSentence: "",
      englishIllustrationSentence: "",
      source: "",
      idiom: "",
      synonym: "",
      usageNote: "",
      imageUrl: "",
      subTopicId: 0,
    },
  })
  const [subThematic, setSubThematic] = useState<SubTopic[]>([]);
  const [thematic, setThematic] = useState<Topic[]>([])
  const navigate = useNavigate();
  useEffect(() => {
    if (jwt === "") {
      navigate('/login')
    }
    const fun = async () => {

      try {

        const response = await axios.get('http://localhost/api/identity/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + jwt
          }
        })
      }
      catch (err: any) {
        AxiosErrorHandling(err)
      }
    }
    fun();
  },[]);

    

  const [thetamticId, setThematicId] = useState<number>(thematic[0]?.id);
  useEffect(() => {

    const fun = async () => {
      try {
        const response = await axios.get('http://localhost/api/topic', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + jwt
          }
        })

        const thematis = response.data
        setThematic(thematis)
      }
      catch (err: any) {
        AxiosErrorHandling(err);
      }
    }
    fun()

  }, [])
  useEffect(() => {

    const fun = async () => {
      try {
        const Thmatic = thematic.filter(item => { return item.id == thetamticId });

        setSubThematic(Thmatic[0]?.subTopics)

      }
      catch (err: any) {
        AxiosErrorHandling(err);
      }
    }
    fun()

  }, [])

  useEffect(() => {
    const Thmatic = thematic.filter(item => { return item.id == thetamticId });

    setSubThematic(Thmatic[0]?.subTopics)

  }
    , [thetamticId])
  const handleThematicSelect = () => {
    var selectElement = document.getElementById("thematic");
    var selectedValue = selectElement.value;
    if (selectedValue == "none") {
      return;
    }
    else {
      setThematicId(selectedValue);
    }
  }
  
  const { register, control, setValue, getValues, formState , handleSubmit } = form;
  
// const handleUpload =(event)=>{

//     // event.preventDefault();
    
//     // const fileInput = document.getElementById('photo');
//     // const file = fileInput.files[0];
    
//     // if (file) {
//     //     const formData = new FormData();
//     //     formData.append('file', file);
        
//     //     fetch('http://localhost:80/api/multimedia/', {
//     //         method: 'POST',
//     //         body: formData
//     //     })
//     //     .then(response => response.json())
//     //     .then(data => {
//     //         document.getElementById('status')?.textContent = 'File uploaded successfully!';
//     //         console.log('Success:', data);
//     //         console.log(data);
//     //         setValue("imageUrl", data);
//     //     })
//     // } else {
//     //     document.getElementById('status')?.textContent = 'Please select a file!';
//     // }

// }
const [imageURL,setImageURL] = useState<string>('')
useEffect(()=>{
  console.log(getValues("imageUrl"))
  getValues();
  const val = getValues("imageUrl")
  setImageURL(val)

},[getValues("imageUrl")])

  const Submit = () => {
   
    try {
        
      const file = getValues("imageUrl")?.[0];
      console.log("file", file);
      const formData = new FormData();
      if(file){
      formData.append('file', file)
      }
      console.log(formData)
    const fun =  async ()=>{

      const el = document.getElementById('Sub-thematic')
      const value = el?.value;
      if(file){
   
        const response = await fetch('http://localhost:80/api/multimedia/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': "Bearer " + jwt
        }
      }).then(res=>res.json()).then(data=>setValue("imageUrl", data))
      fun()
      
    }
    else{
      setValue("imageUrl", null)
      
    }
    
    const resp = await axios.post("http://localhost/api/entry", { ...getValues(), subTopicId: parseInt(value) }, {
      headers: {
        "Content-Type": 'application/json',
        'Authorization': "Bearer " + jwt
      },
      
    }).then(res=>alert("წარმატებით დაემატა")).then(res=>document.location?.reload())
  }
  fun()
  
}
    catch(err: any) {
      AxiosErrorHandling(err)
      alert(err);
    }
}
  return (
    <div className="fillWordForm">
      <Header>

      </Header>

      <form className="formFill" onSubmit={handleSubmit(()=>Submit(), ()=>{alert("error")})} noValidate>
        <h3>*თუ ველი სავალდებულოა მაგრამ ცარიელია შეიყვანეთ n/a</h3>
      <span className="Required" >სავალდებულო*</span>
        <select name="thematic" id="thematic" onChange={() => handleThematicSelect()} className="minimal" >
          <option value="none">აირჩეთ თემატიკა </option>;
          {
            thematic.map((item) => {
              return <option key={item.id} onClick={() => {
                setThematicId(item.id);
                console.log(item.id)
              }} value={item.id}>  {item.georgianName} </option>;
            })}
        </select>


        <span className="Required">სავალდებულო*</span>

        <select name="thematic" id="Sub-thematic" onChange={() => handleThematicSelect()} className="minimal" >
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
            } })}
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
     
    
          <input id="photo" className="" {...register("imageUrl", {})} type="file"  multiple  accept=".jpg"/>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg> */}
  
        <div id="status"></div>
        <button className="submit-button" type="submit">
          სიტყვის დამატება
        </button>
      </form>
         
    </div>
  )
}

export default FillWordToDatabase
