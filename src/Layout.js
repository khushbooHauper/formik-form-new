import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NewListTable } from './NewListTable';
import StepperContainer from './StepperContainer';
import { Button, Modal, Box } from '@mui/material'
import SearchFilter from './SearchFilterDebounce';
import People from './people.png'
import moment from 'moment';

 function Layout() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [curRecord, setCurRecord] = useState(null)
  const [showTable, setShowTable] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
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
    } else {
      let index = users.findIndex((t) => t.id === user.id)
      if (index >= 0) {
        user[index] = user;
        setUsers([...users])
      } else {
        alert("something went wrong")
      }
    }
    setOpen(false)
    setShowTable(true); // Show the table after adding a user
    setShowFilter(true);//show filter after adding a user
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
    marginLeft: '296px'
  };

  const centeredButtonStyle = {
    background: 'white',
    cursor: 'pointer',
    color: '#303f9f',
    padding: '8px 40px',
    // display: 'block',
    // margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: 'bold'
  };

  return (
    <div class="container">
      {!isButtonClicked && (<div style={{ position: 'relative', display: 'inline-block' }} >
        <img src={People} alt="Your Image" style={{ width: '700px', borderRadius: '10px' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}></div>
      </div>
      )}
      <h2>{isButtonClicked && 'Employee List'}</h2>
      <div>

        <div className='align-inline-box'>
          <div>
            {showFilter && <SearchFilter setPage={setPage} filter={filter} setFilter={setFilter} />}
          </div>

          <div>
            <div style={{ width: '1000px' }}>
              <Button onClick={handleAddUserClick} style={isButtonClicked ? buttonStyle : centeredButtonStyle}>Add Employee</Button>
            </div>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Box sx={style}>
                <StepperContainer addUser={addUser} handleClose={handleClose} id={users.length} curUser={default_record} />
              </Box>
            </Modal>
          </div>
        </div>
      </div>

      {showTable && <NewListTable users={users} setUsers={setUsers} page={page} setPage={setPage} filteredList={filteredList} handleEdit={handleEdit} />}
    </div>
  )
}

export default Layout
