import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Modal from './Modal';
import HomePage from './HomePage';
import ModalForm from './Modal';
import { NewListTable } from './NewListTable';
import { List } from './List';
import { useCallback, useState } from 'react';


function App() {
  
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [curRecord, setCurRecord] = useState(null)
 
  return (
    
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/modal" element={<ModalForm users={users} setUsers={setUsers} curRecord={curRecord}/>} />
        <Route path="/table" element={<List users={users} setUsers={setUsers} setCurRecord={setCurRecord} curRecord={curRecord}/>} />
      </Routes>
    </Router>
      
    </div>
    
  );
}

export default App;
