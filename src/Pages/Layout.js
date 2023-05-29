import React, { useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment';
import SearchFilter from '../Components/Filter';
import ModaL from '../Components/ModaL';
import '../css/Layout.css';
import { TablE } from '../Components/Table';





function Layout() {
  const storedUsers = localStorage.getItem('users');
  const hasStoredUsers = storedUsers !== null;
  const [hasUsers, setHasUsers] = useState(hasStoredUsers);
  const [users, setUsers] = useState(() => {
    return hasStoredUsers ? JSON.parse(storedUsers) : [];
  });
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [curRecord, setCurRecord] = useState(null)
  const [showTable, setShowTable] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);



  const handleOpen = () => {
    setOpen(true);
    setIsButtonClicked(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsButtonClicked(false);
  };




  const filteredList = users && users.filter((user) => {
    const personalDetails = user.PersonalDetails;
    const age = moment().diff(personalDetails.dob, 'years');

    return Object.values(personalDetails).some((value) =>
      value && value.toString().toLowerCase().includes(filter.toLowerCase())
    ) || age.toString().toLowerCase().includes(filter.toLowerCase());
  });



  useEffect(() => {
    setUsers(users);
  }, [users]);



  const addUser = (user) => {
    const updatedUsers = [...users]; // Create a deep copy of the users array

    if (user.id === users.length + 1) {
      updatedUsers.push(user); // Add the new user to the copied array
    } else {
      let index = updatedUsers.findIndex((t) => t.id === user.id);
      if (index >= 0) {
        updatedUsers[index] = user; // Update the specific user in the copied array
      } else {
        alert("Something went wrong");
        return;
      }
    }

    setUsers(updatedUsers); // Update the state with the copied array
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save the copied array in local storage
    setOpen(false);
    setShowTable(true);
    setShowFilter(true);
  };


  let default_record = useMemo(() => {
    if (curRecord === null) {
      return {
        id: users.length + 1
      }
    }
    return curRecord;
  }, [curRecord, users])

  const handleEdit = useCallback((user) => {
    setOpen(true);
    setEditMode(true);
    setCurRecord(user);
  }, []);

  const handleAddUserClick = () => {
    setOpen(true);
    setCurRecord(null);
    setEditMode(false);
    setShowTable(false); // Hide the table when "Add User" button is clicked
    setShowFilter(false);// Hide the filter when "Add User" button is clicked
    setIsButtonClicked(true);
  };


  return (

    <div className="container">
      
      {users.length > 0 ? (<div className='second-part'>
       <h2>Employee List</h2>
        <div className='align-inline-box'>
        <SearchFilter setPage={setPage} filter={filter} setFilter={setFilter} className='searchfilter-margin-auto' />
        <ModaL isButtonClicked={isButtonClicked} open={open} handleClose={handleClose} users={users} setUsers={setUsers} addUser={addUser} id={users.length} curUser={default_record} editMode={editMode} handleAddUserClick={handleAddUserClick} />
        </div>
        
        <TablE users={users} setUsers={setUsers} page={page} setPage={setPage} filteredList={filteredList} handleEdit={handleEdit} setEditMode={setEditMode} />
      </div>
      
      ) 
      : (
      <div className='first-part'>
       
        <div>

          <div className='btn-centered'>
            <div>
              {showFilter && <SearchFilter setPage={setPage} filter={filter} setFilter={setFilter} className='searchfilter-margin-auto' />}
            </div>

            <ModaL isButtonClicked={isButtonClicked} open={open} handleClose={handleClose} users={users} setUsers={setUsers} addUser={addUser} id={users.length} curUser={default_record} editMode={editMode} handleAddUserClick={handleAddUserClick} />
          </div>
        </div>

        {showTable && <TablE users={users} setUsers={setUsers} page={page} setPage={setPage} filteredList={filteredList} handleEdit={handleEdit} setEditMode={setEditMode} />}

      </div>)}


    </div>
  )
}

export default Layout
