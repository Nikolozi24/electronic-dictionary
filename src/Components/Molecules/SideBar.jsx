import React, { useEffect, useState } from 'react'
import { RiFlutterFill } from "react-icons/ri";
import { FcMenu } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { BsGrid3X3Gap } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { GrContact } from "react-icons/gr";
import { FcAbout } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

import "../../styles/sideBar.css"
const SideBar = () => {
    const isLogin = true;
    const [isActive, setIsActive] = useState(false);
    const [login , setLogin] = useState({
            in:<Link 
            to="/login"   
       >
           <BiLogOut className='icon'/>
              <span className='links-name'>Log out</span> 
           </Link>,
           out:<Link 
           to="/login"   
      >
          <FaUser className='icon'/>
             <span className='links-name'>Log in</span> 
          </Link>,

    })
    useEffect(()=>{
            console.log(isActive)
    } , [isActive])
    const handleActive =()=>{
        setIsActive((prev)=>!prev);
    }
  return (
    <div className='menu'>
        <div className={`sidebar ${isActive?'active':'' }`}>
            <div className='logo-content'>
                    <div className='logo'>
                 
                 <div>
                    <RiFlutterFill  className='fluter icon' color='red'/>
                 </div>
                    
                            <h3>e-dictionary</h3>
                        
                    </div>
            </div>
         <button onClick={()=>handleActive()}>
                         <FcMenu id='btn'/>
              </button>
            <ul className='list'>
           
              <li className='list-item'>
                <Link to="/Search">
                    <CiSearch className='icon'/>
                    <span className='links-name'> Search</span>
                </Link>
             </li>
              <li className='list-item'>
                <Link to="/">
                    <GrHomeRounded className='icon'/>
                    <span className='links-name'> Home</span>
                </Link>
             </li>
              <li className='list-item'>
                <Link to="contact-us">
                    <GrContact className='icon'/>
                    <span className='links-name'> Contact us </span>
                </Link>
             </li>
              <li className='list-item'>
                <Link to="about-us">
                    <FcAbout className='icon'/>
                    <span className='links-name'>About us</span>
                </Link>
             </li>
             { <li className='list-item '>
                <Link to="admin-panel">
                    <span className='links-name'>admin Panel</span>
                </Link>
             </li> && false}
            </ul>
            <ul className='list-logout'>
                <li className='list-logout'> 

                {
                    isLogin?  login.in :login.out
                }
                </li>
            </ul> 
        </div>
    
    </div>
  )
}

export default SideBar