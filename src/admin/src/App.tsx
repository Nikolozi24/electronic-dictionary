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
import EditThematic from "./pages/ForgetPassword/EditThematic/EditThematic.tsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.tsx";
import { useState } from "react";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword.tsx";
function App() {
  const [Roles, setRoles] = useState({
    ADMIN: "admin",
    SUPER_ADMIN: "super_admin",
  });

  return (
      <Router>
        <Routes>
          {/* // routes we want to protetc */}
          <Route element={<RequireAuth allowedRoles={["super_admin"]} />}>
            <Route path="/subTematic" element={<AddSubTopic />} />
          </Route>
          <Route path="/addUser" element={<AddUser />} />
            <Route path="/main" element={<Main />} />
          <Route
            element={<RequireAuth allowedRoles={["admin", "super_admin"]} />}
          >
            <Route path="/addTopic" element={<AddTopic />} />
            <Route path={`/update/:ID`} element={<UpdateThematic />} />
            <Route path="/delete/:id" element={<Delete />} />
            <Route path="/added" element={<Added />} />
            <Route path="/added-failed" element={<AddedFailed />} />
            <Route path="/fill" element={<FillWordToDatabase />} />
            <Route path="/editThematic/:id" element={<EditThematic/>} />
            <Route path="*" element={<Missing />} />
          </Route>
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
