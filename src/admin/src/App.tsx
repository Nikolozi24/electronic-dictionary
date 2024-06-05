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
import RequireAuth from "./components/ProtectedRouting/RequireAuth.tsx";
import Missing from "./pages/MissingPage/Missing.tsx";
import Main from "./pages/Main/main.tsx";
import AddSubTopic from "./pages/addSubTopics/AddSubTopic";
import FillWordToDatabase from "./pages/FillWord/FillWord.tsx";
import axios from "./components/API/axios.tsx";

import { Header } from "antd/es/layout/layout";
import { useState } from "react";
function App() {
  const [Roles ,setRoles] = useState([])
  axios.get('http://localhost/api/identity/user-roles')
  .then(response=> setRoles(response.data));  
  return (
    <>
      <Router>
        <Routes>
     
          <Route path="/subTematic" element={<AddSubTopic />} />

          {/* // routes we want to protetc */}
          <Route element={<RequireAuth allowedRoles={[Roles[1]]}/>}>
            <Route path="/addUsers" element={<AddUser />} />

</Route>

<Route element={<RequireAuth allowedRoles={[Roles[0] , Roles[1]]} />}  >
<Route path='/main' element={<Main/>}/>
<Route path="/addTopic" element={<AddTopic />} />
<Route path={`/update/:ID`} element={<UpdateThematic />} />
<Route path='/delete/:id' element={<Delete/>}/>
<Route path='/added' element={<Added/>}/>
<Route path='/added-failed' element={<AddedFailed/>}/>
<Route path="/fill" element = {<FillWordToDatabase />} />
</Route>                                                                                
<Route path='*' element={<Missing/>} />
<Route path='/' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
