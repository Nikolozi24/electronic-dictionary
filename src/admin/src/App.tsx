import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AddTopic from './pages/AddTopicPage/addTopicPage';
import AddUser from './pages/AddUserPage/addUserPage';

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
