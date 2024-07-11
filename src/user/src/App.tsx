
import Main from './Pages/Main/Main'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import WordPage from './Pages/WordPage/WordPage';
import WrongPage from './Pages/WrongPage/WrongPage';

function App() {

  
  
  return (<>
      <Router>
        <Routes>
        
        <Route path='/' element={<Main/>}/>
        <Route path='/:id' element={<WordPage/>}/>
        <Route path='/*' element={<WrongPage/>} />
        </Routes>
        </Router>
      
        </>
                
 
  )
}

export default App
