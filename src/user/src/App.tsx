
import Main from './Pages/Main/Main'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import WordPage from './Pages/WordPage/WordPage';

function App() {

  
  
  return (<>
      <Router>
        <Routes>
        
        <Route path='/' element={<Main/>}/>
        <Route path='/:id' element={<WordPage/>}/>
        <Route path='/*' />
        </Routes>
        </Router>
  
        </>
                
 
  )
}

export default App
