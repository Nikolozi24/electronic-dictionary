import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddUser from './pages/AddUserPage/AddUserPage.tsx';
import AddTopic from './pages/AddTopicPage/AddTopicPage.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/addUsers" element={<AddUser />} />
                <Route path="/addTopic" element={<AddTopic />} />
            </Routes>
        </Router>
    );
}

export default App;
