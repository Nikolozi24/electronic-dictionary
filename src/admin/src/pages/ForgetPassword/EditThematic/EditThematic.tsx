import React from 'react'
import Header from '../../../components/Header/Header';
import {useForm} from 'react-hook-form'

const EditThematic:React.FC = () => {
    type formType = {
        headWord: string;
        partOfSpeech: "noun" | "adjective";
        styleQualification: string;
        EqToTheHeadOfWord: string;
        DefOfTheHeadGeorgian:string
        DefInEnglish: string;
        IllustrativeSentInGeorgian: string
        TranslationOfIlSentIntoEng:string
        ContextSrc: string;
        idiom: string;
        Synonym: string;
        UsageNote: string;
        photo:  string;
        topic: string;
        subtopic:string
      }
      const form = useForm<formType>({
        defaultValues: {
          headWord: "",
          partOfSpeech: "noun",
          styleQualification: "",
          EqToTheHeadOfWord: "",
          DefOfTheHeadGeorgian:"",
          DefInEnglish: "",
          IllustrativeSentInGeorgian: "",
          TranslationOfIlSentIntoEng: "",
          ContextSrc: "",
          idiom: "",
          Synonym: "",
          UsageNote: "",
          topic: "",
          subtopic:""
        },
      });
      const { register, getValues } = form;
      // const { fields:defields, append:defAppend, remove:deffRemove } = useFieldArray(
      //   {
      //   name:"DefOfTheHeadGeorgian",
      //   control,
      // });
      // const { fields:subtopFields, append:subtopAppend, remove:subtopRemove } = useFieldArray(
      //   {
      //   name:"subtopic",
      //   control,
      // });
      // const { fields:ilustrationGeoFields, append:IlustratonGeoAppend, remove:IlustrationGeoRemove } = useFieldArray(
      //   {
      //   name:"IllustrativeSentInGeorgian",
      //   control,
      // });
      // const { fields:ilustrationEngFields, append:ilustrationEngAppend, remove:ilustrationEngRemove } = useFieldArray(
      //   {
      //   name:"TranslationOfIlSentIntoEng",
      //   control,
      // });
      return (
        <div className="fillWordForm">
          <Header>
    
          </Header>
      
          <form className="formFill" onSubmit={(e)=>{ e.preventDefault(); console.log(getValues())}} >
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
              <input
              type="text"
              placeholder="მეთაური სიტყვის განმარტება"
              {...register("DefOfTheHeadGeorgian" , {required:"ველი სავალდებულოა"})}
              />
            <input
              type="text"
              {...register("DefInEnglish", {required:"ველი სავალდებულოა"})}
              placeholder={` განმარტება ინგლისურად`}
            />
                    <input
                    type="text"
                    placeholder="საილუსტრაციო წინადადება ქართულად"
                    {...register("IllustrativeSentInGeorgian" , {required:"ველი სავალდებულოა"})}
                    />
                    <input
                    type="text"
                    placeholder="საილუსტრაციო წინადადების თარგმაანი ინგლისურად"
                    {...register('TranslationOfIlSentIntoEng' , {required:"ველი სავალდებულოა"})}
                    />
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
            <div className="input-div">
              <label htmlFor="photo">photo</label>
       <input id="photo" className="input" {...register("photo",{})} type="file"/>
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
                    {...register(`subtopic`  ,{required:"ველი სავალდებულოა"})}
            />
            <button  className="submit-button" type="submit">
              Add word
            </button>
          </form>
        </div>
      );
}

export default EditThematic