import React from 'react'
import "../../styles/FillWordToDatabase.css"
import { BsDatabaseAdd } from "react-icons/bs";
import { useStore } from '../../Store/Store';
import {useForm , useFieldArray, FieldValue} from "react-hook-form"
const FillWordToDatabase = () => {
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
  const {isEnglish} = useStore()
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
  const {register , formState , handleSubmit , control} = form;
const {errors} = formState;
const {fields , append , remove}= useFieldArray({
  name:"DefOfTheHeadGeorgian",
  control
})

  return (
    <div className='fillWordForm'>   
                <div className='background'>

                    <span className='database-logo'><BsDatabaseAdd size="middle"/></span>
                    <span className="text">Input to database</span>
                </div>

            <form className='form' method='post'>
                <input type='text'{...register("headWord",{ required:isEnglish?"head word field is required!":"მეთაური სიტყვა სავალდებულოა!"})} placeholder={`${isEnglish?"Head word":"მეთაური სიტყვა"}`}/>
                <input type='text'{...register("partOfSpeech",{required:isEnglish?"part of speech field is required!":"მეტყველების ნაწილის ველი სავალდებულოა!"})} placeholder={`${isEnglish?"Part of speech":"ნეტყველების ნაწილი"}`}/>
                <input type='text'{...register("styleQualification",{})} placeholder={`${isEnglish?"stylistic qualifications":"სტილისტური კვალიფიკაცია"}`}/>
                <input type='text'{...register("EqToTheHeadOfWord",{required: isEnglish?"Equivalent field is required! ":"მეთაური სიტყვის ექვივალენტი სავალდებულოა!"})} placeholder={`${isEnglish?"Equivalent to the head word":"მეთაური სიტყვის ექვივალენტი"}`}/>
               
                  {
                    fields.map((field , index) =>{
                      return(
                       
                        <>
                      <input type='text' key={field.id }
                      {...register(`DefOfTheHeadGeorgian.${index}.definition` as const ,{})} placeholder={`${isEnglish?"Definition of the head word in Georgian":"მეთაური სიტყვის განმარტება ქართულად"}`}/>
                      
                       {index>0&& <button className='remove-button' type='button' onClick={()=>remove(index)}>remove</button>
                    }
                    </>
                    

                        )
                  })
                }
                <button type='button' className='add-button' onClick={()=>append({definition:""})}>{isEnglish?`Add Definition of the Head word of Georgian`:"მეთაური სიტყვის განმარტება ქართულად"}</button>
        
                <input type='text'{...register("DefInEnglish",{})} placeholder={`${isEnglish?"Definition in English":" განმარტება ინგლისურად"}`}/>
                <input type='text'{...register("IllustrativeSentInGeorgian",{})} placeholder={`${isEnglish?"Illustrative sentence in Georgian":"საილუსტრაციო წინადადება ქართულად"}`}/>
                <input type='text'{...register("TranslationOfIlSentIntoEng",{})} placeholder={`${isEnglish?"Translation of the illustrative sentence into English":"საილუსტრაციო წინადადების თარგმაანი ინგლისურად"}`}/>
                <input type='text'{...register("ContextSrc",{})} placeholder={`${isEnglish?"context source":"კონტექსტის წყარო"}`}/>
                <input type='text'{...register("idiom",{})} placeholder={`${isEnglish?"idiom":"იდიომი"}`}/>
                <input type='text'{...register("Synonym",{})} placeholder={`${isEnglish?"Synonym":"სინონიმი"}`}/>
                <input type='text'{...register("UsageNote",{})} placeholder={`${isEnglish?"Usage note ":"დამატებითი კომენტარი"}`}/>
                <input type='text'{...register("photo",{})} placeholder={`${isEnglish?"photo":"ფოტო"}`}/>
                <input type='text'{...register("topic",{})} placeholder={`${isEnglish?"topic ":"თემატიკა "}`}/>
                <input type='text'{...register("subtopic",{})} placeholder={`${isEnglish?" subtopic":"ქვეთემატიკა "}`}/>
                
              <button className='submit-button' type='submit'>Add word</button>


            </form>
            

    </div>
  )
}

export default FillWordToDatabase