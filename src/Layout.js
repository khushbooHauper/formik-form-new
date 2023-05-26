import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NewListTable } from './NewListTable';
import StepperContainer from './StepperContainer';
import { Button, Modal, Box } from '@mui/material'
import SearchFilter from './SearchFilterDebounce';
import People from './people.png'
import moment from 'moment';
import { auto } from '@popperjs/core';

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
  const [open, setOpen] = React.useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsButtonClicked(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 5,
    height: 490,
    // overflowY: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
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
    if (user.id === users.length + 1) {
      setUsers([...users, user]);
      localStorage.setItem('users', JSON.stringify([...users, user])); // Save new users array in local storage
    } else {
      let index = users.findIndex((t) => t.id === user.id)
      if (index >= 0) {
        user[index] = user;
        setUsers([...users])
        localStorage.setItem('users', JSON.stringify([...users])); // Save updated users array in local storage
      } else {
        alert("something went wrong")
      }
    }
    setOpen(false)
    setShowTable(true); // Show the table after adding a user
    setShowFilter(true);//show filter after adding a user
  };

  // const addUser = (user) => {
  //   let updatedUsers;
  
  //   if (user.id === users.length + 1) {
  //     updatedUsers = [...users, user]; // Add the new user to the list
  //   } else {
  //     const index = users.findIndex((t) => t.id === user.id);
  
  //     if (index >= 0) {
  //       updatedUsers = [...users];
  //       updatedUsers[index] = user; // Update the specific user at the given index
  //     } else {
  //       alert("Something went wrong");
  //       return;
  //     }
  //   }
  
  //   setUsers(updatedUsers);
  //   localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save updated users array in local storage
  //   setOpen(false);
  //   setShowTable(true); // Show the table after adding a user
  //   setShowFilter(true); // Show filter after adding a user
  // };
  

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
    setShowTable(false); // Hide the table when "Add User" button is clicked
    setShowFilter(false);// Hide the filter when "Add User" button is clicked
    setIsButtonClicked(true);
  };
  const buttonStyle = {
    background: '#303f9f',
    cursor: 'pointer',
    color: 'white',
    padding: '8px 40px',
    marginLeft: '297px'
  };

  const centeredButtonStyle = {
    // background: 'white',
    // cursor: 'pointer',
    // color: '#303f9f',
    // padding: '8px 40px',
    // fontWeight: 'bold',
    display: 'none'
  };

  return (

    <div className="container">
    <h2>{showTable && 'Employee List'}</h2>
    <div>

      <div className='align-inline-box'>
        <div>
          {showFilter && <SearchFilter setPage={setPage} filter={filter} setFilter={setFilter} style={{margin:'auto'}}/>}
        </div>

        <div>
          <div style={{ width: '1000px', display: 'flex', justifyContent: 'center' }}>
            { !isButtonClicked && !editMode && (<div className="jumbotron">
              <div className="container">
                <div className="main">
                  <h1>We are Hiring</h1>
                  <a href="#" className="btn-main" onClick={handleAddUserClick}>Add Employee</a>

                </div>
              </div>
            </div>)}
            {showTable && (<Button
              onClick={handleAddUserClick}
              variant="contained"
              style={isButtonClicked ? buttonStyle : centeredButtonStyle}
              className="btn-main"
            >
              Add Employee
            </Button>)}
            
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box sx={style}>
              <StepperContainer users={users} addUser={addUser} handleClose={handleClose} id={users.length} curUser={default_record} editMode={editMode}/>
            </Box>
          </Modal>
        </div>
      </div>
    </div>

    { showTable && <NewListTable users={users} setUsers={setUsers} page={page} setPage={setPage} filteredList={filteredList} handleEdit={handleEdit} setEditMode={setEditMode}/>}
    </div>
  )
}

export default Layout
