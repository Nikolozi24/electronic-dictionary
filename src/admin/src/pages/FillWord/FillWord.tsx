import React from 'react'
import "../../styles/FillWordToDatabase.css"
import { BsDatabaseAdd } from "react-icons/bs";
import { useStore } from '../../Store/Store';
import {useForm , useFieldArray, FieldValue} from "react-hook-form"
import Cookies from 'universal-cookie';
const FillWordToDatabase = () => {
  const cookies  = new Cookies()
  type formType = {
      headWord:string,
      partOfSpeech:"noun"|"adjective", 
      styleQualification:string,
      EqToTheHeadOfWord:string,
      DefOfTheHeadGeorgian:{
        definition:string,
      }[],
      DefInEnglish:string,
      IllustrativeSentInGeorgian:string,
      TranslationOfIlSentIntoEng:string,
      ContextSrc:string,
      idiom:string,
      Synonym:string,
      UsageNote:string,
      photo:string,
      topic:string,
      subtopic:string,
    }

  const form  = useForm<formType>({
    defaultValues:{
      headWord:"",
      partOfSpeech:"noun",
      styleQualification:"",
      EqToTheHeadOfWord:"",
      DefOfTheHeadGeorgian:[{definition:""}],
      DefInEnglish:"",
      IllustrativeSentInGeorgian:"",
      TranslationOfIlSentIntoEng:"",
      ContextSrc:"",
      idiom:"",
      Synonym:"",
      UsageNote:"",
      photo:"",
      topic:"",
      subtopic:""

    }
  });
  const {register  , control} = form;
const {fields , append , remove}= useFieldArray({
  name:"DefOfTheHeadGeorgian",
  control
})

  return (
  (cookies.get("moderator")|| cookies.get("admin"))&&  <div className='fillWordForm'>   
                <div className='background'>

                    <span className='database-logo'><BsDatabaseAdd size="middle"/></span>
                    <span className="text">Input to database</span>
                </div>

            <form className='form' method='post'>
                <input type='text'{...register("headWord",{ required: "მეთაური სიტყვა სავალდებულოა!"}) }placeholder={`  "Head word":"მეთაური სიტყვა"}`}/>
                <input type='text'{...register("partOfSpeech",{required:"მეტყველების ნაწილის ველი სავალდებულოა!"})} placeholder={"ნეტყველების ნაწილი"}/>
                <input type='text'{...register("styleQualification",{})} placeholder={` "სტილისტური კვალიფიკაცია"}`}/>
                <input type='text'{...register("EqToTheHeadOfWord",{required:  "მეთაური სიტყვის ექვივალენტი სავალდებულოა!"})} placeholder={`  "Equivalent to the head word":"მეთაური სიტყვის ექვივალენტი"}`}/>
               
                  {
                    fields.map((field , index) =>{
                      return(
                       
                        <>
                      <input type='text' key={field.id }
                     // {...register(`DefOfTheHeadGeorgian.index}.definition` as const ,{})} placeholder={`  "Definition of the head word in Georgian":"მეთაური სიტყვის განმარტება ქართულად"}`}/>
                      
                       {index>0&& <button className='remove-button' type='button' onClick={()=>remove(index)}>remove</button>
                    }
                    </>
                    

                        )
                  })
                }
                <button type='button' className='add-button' onClick={()=>append({definition:""})}>{ `Add Definition of the Head word of Georgian`:"მეთაური სიტყვის განმარტება ქართულად"}</button>
        
                <input type='text'{...register("DefInEnglish",{})} placeholder={`  "Definition in English":" განმარტება ინგლისურად"}`}/>
                <input type='text'{...register("IllustrativeSentInGeorgian",{})} placeholder={`  "Illustrative sentence in Georgian":"საილუსტრაციო წინადადება ქართულად"}`}/>
                <input type='text'{...register("TranslationOfIlSentIntoEng",{})} placeholder={`  "Translation of the illustrative sentence into English":"საილუსტრაციო წინადადების თარგმაანი ინგლისურად"}`}/>
                <input type='text'{...register("ContextSrc",{})} placeholder={`  "context source":"კონტექსტის წყარო"}`}/>
                <input type='text'{...register("idiom",{})} placeholder={`  "idiom":"იდიომი"}`}/>
                <input type='text'{...register("Synonym",{})} placeholder={`  "Synonym":"სინონიმი"}`}/>
                <input type='text'{...register("UsageNote",{})} placeholder={`  "Usage note ":"დამატებითი კომენტარი"}`}/>
                <input type='text'{...register("photo",{})} placeholder={`  "photo":"ფოტო"}`}/>
                <input type='text'{...register("topic",{})} placeholder={`  "topic ":"თემატიკა "}`}/>
                <input type='text'{...register("subtopic",{})} placeholder={`  " subtopic":"ქვეთემატიკა "}`}/>
                
              <button className='submit-button' type='submit'>Add word</button>


            </form>
            

    </div>
  )
}

export default FillWordToDatabase