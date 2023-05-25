import { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, IconButton } from '@mui/material';
import { Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import SearchFilter from './SearchFilterDebounce';
import { useNavigate } from 'react-router-dom';


export const List = ({ users, setUsers, setCurRecord ,curRecord}) => {

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(null);
    const [deleteMode, setDeleteMode] = useState(false);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");



    const ITEMS_PER_PAGE = 5;
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;



    useEffect(() => {
        // Retrieve users array from local storage
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const parsedUsers = JSON.parse(storedUsers);
            setUsers(parsedUsers);
        }
    }, []);

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

    // const handleConfirmDelete = () => {
    //     const updatedUsers = users && users.filter((user) => user.id !== formData.id);
    //     setUsers(updatedUsers);
    //     setFormData(null);
    //     setDeleteMode(false);
    // }
    const handleConfirmDelete = () => {
        const updatedUsers = users.filter((user) => user.id !== formData.id);
        setUsers(updatedUsers);
        setFormData(null);
        setDeleteMode(false);
      
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      };
      

    // const filteredList = users && users.filter((user) => {
    //     const personalDetails = user.PersonalDetails;
    //     const age = moment().diff(personalDetails.dob, 'years');

    //     return Object.values(personalDetails).some((value) =>
    //       value && value.toString().toLowerCase().includes(filter.toLowerCase())
    //     ) || age.toString().toLowerCase().includes(filter.toLowerCase());
    //   });


    const filteredList = users && users.filter((user) => {
        const personalDetails = user && user.PersonalDetails;
        const age = personalDetails ? moment().diff(personalDetails.dob, 'years') : '';

        return Object.values(personalDetails || {}).some((value) =>
            value && value.toString().toLowerCase().includes(filter.toLowerCase())
        ) || age.toString().toLowerCase().includes(filter.toLowerCase());
    });

    const navigate = useNavigate();

    const handleEdit = useCallback((user) => {
        navigate('/modal');
        setCurRecord(user);
        
    }, []);

    return (
        <>
            <div>
                <SearchFilter setPage={setPage} filter={filter} setFilter={setFilter} />

            </div>
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
                    {filteredList &&
                        filteredList.slice(startIndex, endIndex).map((user, index) => (
                            <li class="table-row">
                                <div class="col col-1" data-label="Job Id">{user.id}</div>
                                <div class="col col-2" data-label="Employee Name">
                                    {user.PersonalDetails && user.PersonalDetails.firstName} {user.PersonalDetails && user.PersonalDetails.lastName}
                                </div>
                                <div class="col col-3" data-label="age">
                                    {user.PersonalDetails && moment().diff(user.PersonalDetails.dob, 'years')}
                                </div>
                                <div class="col col-4" data-label="gender">
                                    {user.PersonalDetails && user.PersonalDetails.gender}
                                </div>
                                <div class="col col-5" data-label="Email">
                                    {user.PersonalDetails && user.PersonalDetails.email}
                                </div>
                                <div class="col col-6" data-label="Phone Number">
                                    {user.PersonalDetails && user.PersonalDetails.phone}
                                </div>
                                <div class="col col-7" data-label="City">
                                    {user.PersonalDetails && user.PersonalDetails.city}
                                </div>
                                <div class="col col-8" data-label="State">
                                    {user.PersonalDetails && user.PersonalDetails.state}
                                </div>
                                <div class="col col-9" data-label="Country">
                                    {user.PersonalDetails && user.PersonalDetails.country}
                                </div>
                                <div class="col col-10" data-label="Pincode">
                                    {user.PersonalDetails && user.PersonalDetails.pincode}
                                </div>
                                <div class="col col-11" data-label="Actions">
                                    <EditIcon
                                        onClick={() => handleEdit(user)}
                                        style={{ color: '#303f9f', cursor: 'pointer' }}
                                    />
                                    <DeleteIcon
                                        onClick={() => handleDelete(user)}
                                        style={{ color: '#33cdd8', cursor: 'pointer' }}
                                    />
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
                {users && users.length && users.length > 0 ? (<Pagination count={Math.ceil(users.length / ITEMS_PER_PAGE)} page={page} onChange={handleChangePage} style={{ color: '#303f9f', cursor: 'pointer' }} />) : (<h1 >No Data Found</h1>)}

            </div>
        </>
    );
};
