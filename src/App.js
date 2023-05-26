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
    return storedUsers ? JSON.parse(storedUsers) : [{
      PersonalDetails: {
        address: "gota",
        city: "rajkot",
        email: "j@gmail.com",
        firstName: "jiya",
        lastName: "thakar",
        phone: 9414896734,
        state: "ahmedabad",
        country:"india",
        pincode:327001,
        dob:23,
        gender:'female'
      },
      BankDetails: {
        bank: "hdfc",
        accountNumber: 8738273923923,
        ifsc: "HGG577H",
        panCard: "ABCD1234F",

      },
      Education: {
        education: [{ courseName: "IIT", university: "GTU", percentage: '78', passingYear: '2008' }]
      },
      Experience: {
        experience: [{ company: "Microsoft", designation: "Engineer", joiningDate: "2018-08-28", leavingDate: "2018-08-28" }]
      },
      id: 1
    }];
  });
  const [curRecord, setCurRecord] = useState(null)
  const [editMode, setEditMode] = useState(false);
  return (
    
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/modal" element={<ModalForm users={users} setUsers={setUsers} curRecord={curRecord} editMode={editMode}/>} />
        <Route path="/table" element={<List users={users} setUsers={setUsers} setCurRecord={setCurRecord} curRecord={curRecord} setEditMode={setEditMode}/>} />
      </Routes>
    </Router>
      
    </div>
    
  );
}

export default App;
