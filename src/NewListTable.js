import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, IconButton } from '@mui/material';
import { Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';


export const NewListTable = ({ users, setUsers, page, setPage, filteredList, handleEdit }) => {

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(null);
    const [deleteMode, setDeleteMode] = useState(false);

    const ITEMS_PER_PAGE = 5;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;


    const handleCancel = () => {
        setEditMode(false);
        setDeleteMode(false);
        setFormData(null);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleDelete = (user) => {
        setFormData(user);
        setDeleteMode(true);
    }

    const handleConfirmDelete = () => {
        const updatedUsers = users.filter((user) => user.id !== formData.id);
        setUsers(updatedUsers);
        setFormData(null);
        setDeleteMode(false);
    }



    return (
        <>


            {/* <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>bank</TableCell>
                            <TableCell>ifsc</TableCell>
                            <TableCell>course</TableCell>
                            <TableCell>company</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList && filteredList.slice(startIndex, endIndex).map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.PersonalDetails.firstName}  {user.PersonalDetails.lastName}</TableCell>
                                <TableCell>{user.PersonalDetails.email}</TableCell>
                                <TableCell>{user.PersonalDetails.phone}</TableCell>
                                <TableCell>{user.PersonalDetails.state}</TableCell>
                                <TableCell>{user.BankDetails.bank}</TableCell>
                                <TableCell>{user.BankDetails.ifsc}</TableCell>
                                <TableCell>{user.Education.education && user.Education.education.map((edu, index) => <p key={index}>{edu.courseName}</p>)}</TableCell>
                                <TableCell>{user.Experience.experience && user.Experience.experience.map((exp, index) => <p key={index}>{exp.company}</p>)}</TableCell>
                                <TableCell>
                                    <EditIcon onClick={() => handleEdit(user)} style={{ color: '#303f9f' ,cursor:'pointer'}} />
                                    <DeleteIcon onClick={() => handleDelete(user)} style={{ color: '#ab2424',cursor:'pointer' }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {deleteMode && (
                    <Modal open={deleteMode} onClose={handleCancel}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', width: '600px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <p align="center">Are you sure you want to delete this form data?</p>
                            <div align="center">
                                <Button onClick={handleConfirmDelete}>Yes</Button>
                                <Button onClick={handleCancel}>No</Button>
                            </div>
                        </div>
                    </Modal>
                )}

            </TableContainer> */}
            <div class="container">
                
                <ul class="responsive-table">
                    <li class="table-header">
                        <div class="col col-1">Job Id</div>
                        <div class="col col-2">Employee Name</div>
                        <div class="col col-3">Age</div>
                        <div class="col col-4">Gender</div>
                        <div class="col col-5">Email</div>
                        <div class="col col-6">Phone</div>
                        <div class="col col-7">City</div>
                        <div class="col col-8">State</div>
                        <div class="col col-9">Country</div>
                        <div class="col col-10">Pincode</div>
                        <div class="col col-11">Actions</div>
                    </li>
                    {filteredList && filteredList.slice(startIndex, endIndex).map((user, index) => (
                        <li class="table-row">
                            <div class="col col-1" data-label="Job Id">{user.id}</div>
                            <div class="col col-2" data-label="Employee Name">{user.PersonalDetails.firstName}  {user.PersonalDetails.lastName}</div>
                            <div class="col col-3" data-label="age">{moment().diff(user.PersonalDetails.dob, 'years')}</div>
                            <div class="col col-4" data-label="gender">{user.PersonalDetails.gender}</div>
                            <div class="col col-5" data-label="Email">{user.PersonalDetails.email}</div>
                            <div class="col col-6" data-label="Phone Number">{user.PersonalDetails.phone}</div>
                            <div class="col col-7" data-label="City">{user.PersonalDetails.city}</div>
                            <div class="col col-8" data-label="State">{user.PersonalDetails.state}</div>
                            <div class="col col-9" data-label="Country">{user.PersonalDetails.country}</div>
                            <div class="col col-10" data-label="Pincode">{user.PersonalDetails.pincode}</div>
                            <div class="col col-11" data-label="Actions">
                                <EditIcon onClick={() => handleEdit(user)} style={{ color: '#303f9f', cursor: 'pointer' }} />
                                <DeleteIcon onClick={() => handleDelete(user)} style={{ color: '#33cdd8', cursor: 'pointer' }} />
                            </div>
                        </li>
                    ))}
                </ul>
                {deleteMode && (
                    <Modal open={deleteMode} onClose={handleCancel}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', width: '600px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <p align="center">Are you sure you want to delete this form data?</p>
                            <div align="center">
                                <Button onClick={handleConfirmDelete} color='inherit'>Yes</Button>
                                <Button onClick={handleCancel} color='inherit'>No</Button>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>

            <div className='pagination-container'>
                <Pagination count={Math.ceil(users.length / ITEMS_PER_PAGE)} page={page} onChange={handleChangePage} style={{ color: '#303f9f', cursor: 'pointer' }} />

            </div>
        </>
    );
};
