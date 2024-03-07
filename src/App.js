import logo from './logo.svg';
import "./App.css";
import Login from './Pages/AdminPage/Login.tsx';
import Main from './Pages/Main.jsx';
import SideBar from './Components/Molecules/SideBar.jsx';
import { Routes, Route } from 'react-router-dom';
import UserRegistration from './Pages/AdminPage/UserRegistration.tsx';

function App() {
  return (
    <div className='App'>
            <SideBar/>
              <Routes>

            <Route path='/login' element={<Login/>}/> 
            <Route path='/add-user' element={<UserRegistration/>}/>
          </Routes>
    </div>
  );
}

export default App;
