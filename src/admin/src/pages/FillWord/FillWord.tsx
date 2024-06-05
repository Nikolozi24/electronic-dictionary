import React, { useEffect, useState } from "react";
import "./fillWord.css";

import { useForm, useFieldArray, FieldValue } from "react-hook-form";
import { DeleteFilled } from "@ant-design/icons"

import Header from "../../components/Header/Header";


const FillWordToDatabase:React.FC = () => {

  type formType = {
    headWord: string;
    partOfSpeech: "noun" | "adjective";
    styleQualification: string;
    EqToTheHeadOfWord: string;
    DefOfTheHeadGeorgian: {
      definition: string;
    }[];
    DefInEnglish: string;
    IllustrativeSentInGeorgian: {ilustrationGeo:string;}[];
    TranslationOfIlSentIntoEng: {ilustrationEng:string;}[];
    ContextSrc: string;
    idiom: string;
    Synonym: string;
    UsageNote: string;
    photo: string;
    topic: string;
    subtopic: {
      value:string
    }[];
  };

  const form = useForm<formType>({
    defaultValues: {
      headWord: "",
      partOfSpeech: "noun",
      styleQualification: "",
      EqToTheHeadOfWord: "",
      DefOfTheHeadGeorgian: [{ definition: "" }],
      DefInEnglish: "",
      IllustrativeSentInGeorgian: [{ ilustrationGeo: "" }],
      TranslationOfIlSentIntoEng: [{ ilustrationEng: "" }],
      ContextSrc: "",
      idiom: "",
      Synonym: "",
      UsageNote: "",
      photo: "",
      topic: "",
      subtopic:[{
            value:""
      }],
    },
  });
  const { register, control , getValues } = form;
  const { fields:defields, append:defAppend, remove:deffRemove } = useFieldArray(
    {
    name:"DefOfTheHeadGeorgian",
    control,
  });
  const { fields:subtopFields, append:subtopAppend, remove:subtopRemove } = useFieldArray(
    {
    name:"subtopic",
    control,
  });
  const { fields:ilustrationGeoFields, append:IlustratonGeoAppend, remove:IlustrationGeoRemove } = useFieldArray(
    {
    name:"IllustrativeSentInGeorgian",
    control,
  });
  const { fields:ilustrationEngFields, append:ilustrationEngAppend, remove:ilustrationEngRemove } = useFieldArray(
    {
    name:"TranslationOfIlSentIntoEng",
    control,
  });
  return (
    <div className="fillWordForm">
      <Header>

      </Header>
  
      <form className="form" onSubmit={(e)=>{ e.preventDefault(); console.log(getValues())}} >
        <input
          type="text"
          {...register("headWord", {
            required: "მეთაური სიტყვა სავალდებულოა!",
          })}
          placeholder={`  მეთაური სიტყვა`}
        />
        <input
          type="text"
          {...register("partOfSpeech", {
            required: "მეტყველების ნაწილის ველი სავალდებულოა!",
          })}
          placeholder={"ნეტყველების ნაწილი"}
        />
        <input
          type="text"
          {...register("styleQualification", {required:"ველი სავალდებულოა"})}
          placeholder={` სტილისტური კვალიფიკაცია`}
        />
        <input
          type="text"
          {...register("EqToTheHeadOfWord", {
            required: "მეთაური სიტყვის ექვივალენტი სავალდებულოა!",
          })}
          placeholder={`მეთაური სიტყვის ექვივალენტი`}
        />
        {
          defields.map((field, index)=>{
            return(index>0? <div className="subtopic">

                <input
                type="text"
                placeholder="მეთაური სიტყვის განმარტება"
                {...register(`DefOfTheHeadGeorgian.${index}.definition` as const , {required:"ველი სავალდებულოა"})}
                />
                {
                  index>0 && <button className="remove-button" onClick={()=>{deffRemove(index)}}><DeleteFilled /></button>
                }
                </div>
                :
                <input
                type="text"
                placeholder="მეთაური სიტყვის განმარტება"
                {...register(`DefOfTheHeadGeorgian.${index}.definition` as const , {required:"ველი სავალდებულოა"})}
                />

            )
          }
          )
        }
        <button
          type="button"
          className="add-button"
          onClick={() => defAppend({ definition: "" })}
        >
          {"მეთაური სიტყვის განმარტება ქართულად"}
        </button>

        <input
          type="text"
          {...register("DefInEnglish", {required:"ველი სავალდებულოა"})}
          placeholder={` განმარტება ინგლისურად`}
        />
          {
          ilustrationGeoFields.map((field, index)=>{
            return(index>0? <div className="subtopic">

                <input
                type="text"
                placeholder="საილუსტრაციო წინადადება ქართულად"
                {...register(`IllustrativeSentInGeorgian.${index}.ilustrationGeo` as const , {required:"ველი სავალდებულოა"})}
                />
                {
                  index>0 && <button className="remove-button" onClick={()=>{IlustrationGeoRemove(index)}}><DeleteFilled /></button>
                }
                </div>
                :
                <input
                type="text"
                placeholder="საილუსტრაციო წინადადება  ქართულად"
                {...register(`IllustrativeSentInGeorgian.${index}.ilustrationGeo` as const , {required:"ველი სავალდებულოა"})}
                />

            )
          }
          )
        }
         <button
          type="button"
          className="add-button"
          onClick={() => IlustratonGeoAppend({ ilustrationGeo: "" })}
        >
          საილუსტრაციო წინადადების  დამატება
        </button>
        {
        ilustrationEngFields.map((field, index)=>{
            return(index>0? <div className="subtopic">

                <input
                type="text"
                placeholder="საილუსტრაციო წინადადების თარგმაანი ინგლისურად"
                {...register(`TranslationOfIlSentIntoEng.${index}.ilustrationEng` as const , {required:"ველი სავალდებულოა"})}
                />
                {
                  index>0 && <button className="remove-button" onClick={()=>{ilustrationEngRemove(index)}}><DeleteFilled /></button>
                }
                </div>
                :
                <input
                type="text"
                placeholder="საილუსტრაციო წინადადების თარგმაანი ინგლისურად"
                {...register(`TranslationOfIlSentIntoEng.${index}.ilustrationEng` as const , {required:"ველი სავალდებულოა"})}
                />

            )
          }
          )
        }
         <button
          type="button"
          className="add-button"
          onClick={() => ilustrationEngAppend({ ilustrationEng:""})}
        >
          საილუსტრაციო წინადადება ინგლისურად  დამატება
        </button>
        <input
          type="text"
          {...register("ContextSrc", {required:"ველი სავალდებულოა"})}
          placeholder={`კონტექსტის წყარო`}
        />
        <input
          type="text"
          {...register("idiom", {})}
          placeholder={`  "idiom":"იდიომი"}`}
        />
        <input
          type="text"
          {...register("Synonym", {})}
          placeholder={`  სინონიმი`}
        />
        <input
          type="text"
          {...register("UsageNote", {})}
          placeholder={`  დამატებითი კომენტარი`}
        />
        <input
          type="text"
          {...register("photo", {})}
          placeholder={` ფოტო`}
        />
        <input
          type="text"
          {...register("topic", {required:"ველი სავალდებულოა"})}
          placeholder={`თემატიკა`}
        />
        {
          subtopFields.map((field, index)=>{
            return(index>0? <div className="subtopic">
                <input
                type="text"
                placeholder="ქვეთემატიკა"
                {...register(`subtopic.${index}.value` as const ,{required:"ველი სავალდებულოა"})}
                />
                  {
                    index>0 && <button className="remove-button" onClick={()=>{subtopRemove(index)}}><DeleteFilled /></button>
                  }
                </div> :   <input
                type="text"
                placeholder="ქვეთემატიკა"
                {...register(`subtopic.${index}.value` as const , {required:"ველი სავალდებულოა"})}
                />
            )
            
          }
          )
        }
        <button className="add-button" onClick={()=>{subtopAppend({value:""})}}>ქვეთემატიკის დამატება</button>

        <button  className="submit-button" type="submit">
          Add word
        </button>
      </form>
    </div>
  );
};

export default FillWordToDatabase;
