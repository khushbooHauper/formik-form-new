import React, { useCallback, useEffect, useMemo, useState } from 'react'
import StepperContainer from './StepperContainer';

 function ModalForm({users,setUsers,curRecord,handleEdit}) {
 
  useEffect(() => {
    setUsers(users);
  }, [users]);

  ;


  // const addUser = (user) => {
  //   if (user.id === users.length + 1) {
  //     setUsers([...users, user]);
  //   } else {
  //     let index = users.findIndex((t) => t.id === user.id)
  //     if (index >= 0) {
  //       user[index] = user;
  //       setUsers([...users])
  //     } else {
  //       alert("something went wrong")
  //     }
  //   }
  // };
  const addUser = (user) => {
    if (user.id === users.length + 1) {
      setUsers([...users, user]); // Add new user to the list
    } else {
      let index = users.findIndex((t) => t.id === user.id);
      if (index >= 0) {
        let updatedUsers = [...users]; // Create a copy of the users array
        updatedUsers[index] = user; // Update the specific user at the given index
        setUsers(updatedUsers); // Set the updated array as the new users state
      } else {
        alert("Something went wrong");
      }
    }
  };
  
   
    
  
  


  let default_record = useMemo(() => {
    if (curRecord === null) {
      return {
        id: users.length + 1
      }
    }
    return curRecord;
  }, [curRecord, users])

  return (
    <div >
      <h2>Employee Form</h2>
      <div className='white'>
    <StepperContainer addUser={addUser} id={users.length} curUser={default_record} setUsers={setUsers} users={users} handleEdit={handleEdit}/>
    </div>
    </div>
  )
}

export default ModalForm
