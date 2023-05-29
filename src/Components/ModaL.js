import React, { useState } from 'react'
import StepperContainer from '../Pages/form/StepperContainer'
import { Box, Button, Modal } from '@mui/material'
import '../css/ModaL.css'
export default function ModaL({ addUser, id, curUser, editMode, users, setUsers, handleClose, open, handleAddUserClick }) {



    return (
        <div>
            {!open && (
                <div className='add-employee-btn-div'>
                    <Button onClick={handleAddUserClick} variant="contained">
                        Add Employee
                    </Button>
                </div>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box className='modalBoxStyle'>
                    <StepperContainer users={users} setUsers={setUsers} addUser={addUser} id={users.length} curUser={curUser} editMode={editMode} handleClose={handleClose} />
                </Box>
            </Modal>
        </div>
    )
}
