import React , { useState } from 'react'
import Main from './Pages/Main/Main'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import './App.css'
import WordPage from './Pages/WordPage/WordPage';

function App() {

  
  
  return (<>
      <Router>
        <Routes>
        
        <Route path='/' element={<Main/>}/>
        <Route path='/:id' element={<WordPage/>}/>
        </Routes>
        </Router>
  
        </>
                
 
  )
}

export default App
