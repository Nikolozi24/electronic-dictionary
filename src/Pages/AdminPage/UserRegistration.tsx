import React ,{useEffect} from 'react'
import { TbUserStar } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";

import "../../styles/Registration.css"
import { useStore } from '../../Store/Store'

const UserRegistration = () => {
   const {isEnglish} = useStore()

    return (
      <div className='registration'>
   <div  className='container'>
            <form noValidate >
            <legend>User Registration</legend>
            <div className='inputs'>
            <input type='text' placeholder={`${isEnglish?"first name":"სახელი"}`}/>
            <TbUserEdit className='icon' />
            </div>
            <div className='inputs'>

            <input type="text"  placeholder={`${isEnglish? "Last name ":"გვარი"}`}/>
            <TbUserEdit className='icon'/>
            </div>
            <div className='inputs' >
            <input type='email' placeholder={`${isEnglish? "email":"ელ-ფოსტა"}`}/>
            <MdEmail className='icon'/>
            </div>

            <div className='inputs'>
              
              <input placeholder={`${isEnglish?"priority":"წოდება"}`}/>
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