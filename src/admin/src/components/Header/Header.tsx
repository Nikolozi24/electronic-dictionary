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
        <span className="links-name">Log out</span>
      </Link>
    ),
    out: (
      <Link to="/login" >
        <FaUser className="icon" />
        <span className="links-name">Log in</span>
      </Link>
    ),
  });
  useEffect(() => {
    console.log(isActive);
  }, [isActive]);
  const handleActive = () => {
    setIsActive((prev) => !prev);
  };



  const [role, setRole] = useState("");
  const jwt = GetCookie("jwt");
  useEffect(() => {
    const fun = async () => {
      console.log(jwt);
      const response = await axios.get("http://localhost/api/identity/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      const role = response.data.role;
      setRole(role);
    };
    fun();
  }, []);
  console.log(role)
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
            <Link to="/">
              <GrHomeRounded className="icon" />
              <span className="links-name">მთავარი</span>
            </Link>
          </li>
          <li className="list-item">
            <Link to="/fill">
              <BsDatabaseAdd className="icon" />
              <span className="links-name">სიტყვის შევსება</span>
            </Link>
          </li>
         {role==="super_admin"&& <li className="list-item">
            <Link to="/addUsers">
              <AiOutlineUserAdd className="icon" />
              <span className="links-name">მომხარებლის დამატება</span>
            </Link>

          </li>}
         {role==="super_admin"&&  <li className="list-item">
            <Link to="/addTopic">
              < FaEdit className="icon" />
              <span className="links-name">თემატიკის დამატება</span>
            </Link>
          </li>}
           {role==="super_admin"&&  <li className="list-item ">
              <Link to="/subTematic">
              < FaEdit className="icon" />
                <span className="links-name">ქვეთემატიკის დამატება</span>
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
