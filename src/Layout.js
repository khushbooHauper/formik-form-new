import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NewListTable } from './NewListTable';
import StepperContainer from './StepperContainer';
import { Button, Modal, Box } from '@mui/material'
import SearchFilter from './SearchFilterDebounce';
function Layout() {
 
  const newList = [
    {
      PersonalDetails: {
        address: "gota",
        city: "ddfdfd",
        email: "j@gmail.com",
        firstName: "jiya",
        lastName: "thakar",
        phone: 43434343434,
        state: "punjab"
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
    }
  ]
  const [users, setUsers] = useState(newList);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [curRecord, setCurRecord] = useState(null)

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: 800,
    overflowY: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
  

  const filteredList = users && users.filter((user) =>
    user.PersonalDetails.firstName && user.PersonalDetails.firstName.toLowerCase().includes(filter.toLowerCase()) ||
    user.PersonalDetails.lastName && user.PersonalDetails.lastName.toLowerCase().includes(filter.toLowerCase()) ||
    user.PersonalDetails.email && user.PersonalDetails.email.toLowerCase().includes(filter.toLowerCase()) ||
    user.PersonalDetails.state && user.PersonalDetails.state.toLowerCase().includes(filter.toLowerCase())
  );


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

  return (
    <div>
      <div className='align-inline-box'>
        <div>
          <Button onClick={() => {
            handleOpen();
            setCurRecord(null)
          }}>Add User</Button>
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
        {/* <SearchFilter setPage={setPage} filter={filter} setFilter={setFilter} /> */}
        <SearchFilter setPage={setPage} filter={filter} setFilter={setFilter}/>
      </div>

      <NewListTable users={users} setUsers={setUsers} page={page} setPage={setPage} filteredList={filteredList} handleEdit={handleEdit} />
    </div>
  )
}

export default Layout
