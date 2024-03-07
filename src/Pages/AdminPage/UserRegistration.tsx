import React ,{useEffect} from 'react'
import { TbUserStar } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import { useForm } from 'react-hook-form';

import "../../styles/Registration.css"
import { useStore } from '../../Store/Store'

const UserRegistration = () => {
  type formValues = {
    firstName:string ,
    lastName:string,
    email:string,
    priority:"admin" | "moderator";
  }

  const form = useForm<formValues>({
    defaultValues:{
      firstName:"",
      lastName:"",
      email:"example@example.com",
      priority:"moderator"
    }
  })
  const {register , formState , handleSubmit} = form;
  const {errors} = formState;
  const {isEnglish} = useStore()

    return (
      <div className='registration'>
   <div  className='container'>
            <form onSubmit={handleSubmit(()=>{} , ()=>{console.log("error")})} noValidate >
            <legend>{isEnglish?"User Registration":"მომხარებლის რეგისტრაცია"}</legend>
            <div className='inputs'>
            <input type='text'
                 placeholder={`${isEnglish?"first name":"სახელი"}`}
                {...register("firstName" , {required:"this filed is required!",
                    pattern:{
                      value:(/^[A-Za-z]+$/),
                      message:"this must not be number"
                    }  
              })}     
            />
            <TbUserEdit className='icon' />
            </div>
            <div className='inputs'>

            <input type="text"
              placeholder={`${isEnglish? "Last name ":"გვარი"}`}
              {...register("lastName" , {required:"this filed is required!",
              pattern:{
                value:(/^[A-Za-z]+$/),
                message:"this must not be number"
              }  
            })}
              />
            <TbUserEdit className='icon'/>
            </div>
            <div className='inputs' >
            <input type='email' 
              placeholder={`${isEnglish? "email":"ელ-ფოსტა"}`}
              {...register("email" ,{
                required:"email is required",
                pattern:{
                  value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message:"this is not valid email"
                },
                validate:{
                  isExampleEmail:(formValue)=>{
                        return !formValue.endsWith("@example.com") || "this is not valid email"                     
                  },
                  isBadEmail:(formValue)=>{
                    return formValue!=="admin@example.com" ||"this email is invalid"
                  }
                }
              })}
              />
            <MdEmail className='icon'/>
            </div>

            <div className='inputs'>
              
              <input placeholder={`${isEnglish?"priority":"წოდება"}`}
                  {...register("priority" ,{})}
              />
                <TbUserStar className="icon"/>
            </div>
            <button className='submit-button' type='submit'>Registration</button>
          <span>

            <span className='note'>
              შენიშვნა:წოდება არის ან admin(ადმინი) ან moderator(მოდერატორი)!
            </span>
          </span>
            </form>



    </div>
          
   </div>
  )
}

export default UserRegistration