import React, { useEffect, useState } from "react";
import { RiFlutterFill } from "react-icons/ri";
import { FcMenu } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BsDatabaseAdd } from "react-icons/bs";
import { GrContact , GrHomeRounded} from "react-icons/gr";
import { FcAbout } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { FaUser, FaEdit} from "react-icons/fa";
import GetCookie from "../Utilities/Coookies/GetCookie";
import axios from "axios";


import "./Header.css"
import RemoveCookie from "../Utilities/Coookies/RemoveCookie";
import AxiosErrorHandling from "../Utilities/ErrorHandling/AxiosErrorHandling";
const Header: React.FC = () => {

  const isLogin = true;
  const [isActive, setIsActive] = useState(false);
  const [login, setLogin] = useState({
    in: (
      <Link to="/login" onClick={()=>{
        RemoveCookie('jwt')
        RemoveCookie('refresh');
      }}>
        <BiLogOut className="icon" />
        <span className="links-name">გამოსვლა</span>
      </Link>
    ),
    out: (
      <Link to="/login" >
        <FaUser className="icon" />
        <span className="links-name">შესვლა</span>
      </Link>
    ),
  });
  useEffect(() => {
  }, [isActive]);
  const handleActive = () => {
    setIsActive((prev) => !prev);
  };



  const [role, setRole] = useState("");
  const jwt = GetCookie("jwt");
  useEffect(() => {
    const fun = async () => {
   
      try{
      const response = await axios.get("http://localhost/api/identity/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      const role = response.data.role;
      setRole(role);
    }
    catch(err:any){
      AxiosErrorHandling(err);
    }
    };
    fun();
  }, []);

  return (
      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <div className="logo-content">
          <div className="logo">

            <h3>e-dictionary</h3>
          </div>
        </div>
        <button onClick={() => handleActive()}>
          <FcMenu id="btn" />
        </button>
        <ul className="list">
          <li className="list-item">
            <Link title="მთავარი" to="/">
              <GrHomeRounded className="icon" />
              <span className="links-name">მთავარი</span>
            </Link>
          </li>
          <li className="list-item">
            <Link title=" სიტყვის შევსება" to="/fill">
              <BsDatabaseAdd className="icon" />
              <span className="links-name">სიტყვის შევსება</span>
            </Link>
          </li>
         {role=="super_admin"&& <li className="list-item">
            <Link title="მომხამრებლის დამატება" to="/addUsers">
              <AiOutlineUserAdd className="icon" />
              <span className="links-name">მომხმარებლის დამატება</span>
            </Link>

          </li>}
         {role=="super_admin"&&  <li className="list-item">
            <Link  title="თემატიკის დამატება"to="/addTopic">
              < FaEdit className="icon" />
              <span className="links-name">თემატიკის
                   დამატება</span>
            </Link>
          </li>}
           {role=="super_admin"&&  <li className="list-item ">
              <Link title="ქვეთემატიკის დამატება"to="/subTematic">
              < FaEdit className="icon" />
                <span className="links-name">ქვეთემატიკის დამატება</span>
              </Link>
            </li>}
           {role=="super_admin"&&  <li className="list-item ">
              <Link title="სიტყვების ცხრილი " to="/EntryList">
              < FaEdit className="icon" />
                <span className="links-name">სიტყვების ცხრილი</span>
              </Link>
            </li>}
        </ul>
        <ul className="list-logout">
          <li className="list-logout">{isLogin ? login.in : login.out}</li>
        </ul>
      </div>
  );
};

export default Header;
