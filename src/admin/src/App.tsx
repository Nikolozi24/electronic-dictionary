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

import { Header } from "antd/es/layout/layout";
function App() {
  const Roles = {
    admin: 5000,
    user: 1900,
    moderator: 2001,
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/fill" element={<FillWordToDatabase />} />
          <Route path="/addTopic" element={<AddTopic />} />
          <Route path={`/update/:ID`} element={<UpdateThematic />} />
          <Route path="/delete/:id" element={<Delete />} />
          <Route path="/added" element={<Added />} />
          <Route path="/added-failed" element={<AddedFailed />} />
          <Route path="*" element={<Missing />} />
          <Route path="/" element={<Login />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/subTematic" element={<AddSubTopic />} />

          {/* // routes we want to protetc */}
          {/* <Route element={<RequireAuth allowedRoles={[Roles.admin]}/>}>

<Route path="/addUsers" element={<AddUser />} />
</Route>
<Route element={<RequireAuth allowedRoles={[Roles.admin ,Roles.moderator]}/>}>
<Route path='/main' element={<Main/>}/>
</Route>
<Route element={<RequireAuth allowedRoles={[Roles.moderator , Roles.admin]} />}  >
<Route path="/addTopic" element={<AddTopic />} />
<Route path={`/update/:ID`} element={<UpdateThematic />} />
<Route path='/delete/:id' element={<Delete/>}/>
<Route path='/added' element={<Added/>}/>
<Route path='/added-failed' element={<AddedFailed/>}/>
</Route>                                                                                
<Route path='*' element={<Missing/>} />
<Route path='/' element={<Login/>}/>
<Route path="/fillWord" element = {<FillWordToDatabase />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
