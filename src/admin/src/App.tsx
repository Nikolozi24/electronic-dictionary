import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import "./App.css";
import AddUser from "./pages/AddUserPage/AddUserPage.tsx";
import AddTopic from "./pages/AddTopicPage/AddTopicPage.tsx";
import UpdateThematic from "./pages/Update/UpdateThematic.tsx";
import Delete from "./pages/Delete/Delete.tsx";
import Added from "./pages/AddTopicPage/Added/Added.tsx";
import AddedFailed from "./pages/AddTopicPage/Added/Failed.tsx";
import Login from "./pages/Authorization/Login.tsx";

import Missing from "./pages/MissingPage/Missing.tsx";

import AddSubTopic from "./pages/addSubTopics/AddSubTopic";
import FillWordToDatabase from "./pages/FillWord/FillWord.tsx";
import axios from "./components/API/axios.tsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.tsx";
import Welcome from "./pages/WelComePage/Welcome.tsx";
import WordList from "./pages/FillWord/WordList.tsx";
import { useState, useEffect } from "react";
import GetCookie from "./components/Utilities/Coookies/GetCookie.ts";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword.tsx";
import EditWordToDatabase from "./pages/FillWord/editWord.tsx";
import AxiosErrorHandling from "./components/Utilities/ErrorHandling/AxiosErrorHandling";


// Example: Context for managing user role


// Usage Example:




function App() {
  const [role, setRole] = useState("");
  const [user , setUser] = useState({
    isAdmin:false,
    isSuperAdmin:false});
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
      setUser(response.data)
      }
      catch(err:any){
        AxiosErrorHandling(err);
      }
    };
    fun();
  }, []);
  
  return (
    <div className="app">

      <Router>
        <Routes>
          {/* // routes we want to protetc */}
          {/* <Route element={<RequireAuth allowedRoles={["admin" , "super_admin"]}/>}> */}
          {/* </Route> */}
          <Route path="/fill" element={<FillWordToDatabase />} />

          <Route path="/" element={<Welcome />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

        
         {user.isSuperAdmin && <Route path="/addTopic" element={<AddTopic />} />}
         {user.isSuperAdmin &&  <Route path={`/update/:ID`} element={<UpdateThematic />} />}
          {user.isSuperAdmin && <Route path="/subTematic" element={<AddSubTopic />} />}

         {user.isSuperAdmin &&  <Route path="/addUsers" element={<AddUser />} />}
         {user.isSuperAdmin &&  <Route path="/delete/:id" element={<Delete />} />}
        { user.isSuperAdmin &&  <Route path="/added" element={<Added />} />}
        { user.isSuperAdmin &&  <Route path="/added-failed" element={<AddedFailed />} />}
         { user.isSuperAdmin && <Route path="*" element={<Missing />} />}
         { user.isSuperAdmin && <Route path="/update/Entry/:id" element={<EditWordToDatabase/>} />}
         {user.isSuperAdmin && <Route path="/EntryList" element={<WordList/>} />}
\
          {/* </Route> */}
        <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
