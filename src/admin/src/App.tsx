import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddUser from './pages/AddUserPage/AddUserPage.tsx';
import AddTopic from './pages/AddTopicPage/AddTopicPage.tsx';
import UpdateThematic from './pages/Update/UpdateThematic.tsx';
import Delete from './pages/Delete/Delete.tsx';
import Added from './pages/AddTopicPage/Added/Added.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/addUsers" element={<AddUser />} />
                <Route path="/addTopic" element={<AddTopic />} />
                <Route path={`/update/:id`} element={<UpdateThematic />} />
                <Route path='/delete/:id' element={<Delete/>}/>
                <Route path='/added' element={<Added/>}/>
            </Routes>
        </Router>
    );
}

export default App;
