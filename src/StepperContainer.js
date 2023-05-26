import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PersonalDetails } from './PersonalDetails';
import { BankDetails } from './BankDetails';
import { Education2 } from './Education2';
import { Experience3 } from './Experience3';
import { useNavigate } from 'react-router-dom';



const steps = ['PersonalDetails', 'BankDetails', 'Education', 'Experience'];

export default function StepperContainer({ addUser, id, curUser, users, setUsers,editMode }) {
    const navigate = useNavigate();
    ///+++++
    const [curRecord, setCurRecord] = React.useState(curUser || {})
    const [allowedNext, setAllowNext] = React.useState(false)
    const [activeStep, setActiveStep] = React.useState(0);


    const onSuccess = React.useCallback((data, node) => {

        // setCurRecord((curRecord)=>{
        //     if(curRecord[node].validated){
        //         return curRecord;
        //     }
        //     let t=JSON.parse(JSON.stringify(curRecord))
        //     t[node]=data;
        //     t[node].validated=true;
        //     return t;
        // })
        switch (activeStep) {
            case 0: curRecord.PersonalDetails = data; break;
            case 1: curRecord.BankDetails = data; break;
            case 2: curRecord.Education = data; break;
            case 3: curRecord.Experience = data; break;

        }
        console.log("on success got this data", data)
        setAllowNext(true)
    }, [activeStep])

    const onError = React.useCallback((data) => {
        console.log("on error got this data", data)
        setAllowNext(false)
    }, [])

    ///+++++

    
    const handleNext = () => {
        if (allowedNext) {
          if (activeStep === steps.length - 1) {
            if (curUser) {
              // Editing an existing user
              const updatedUsers = users && users.map((user) =>
                user.id === curRecord.id ? curRecord : user
              );
              setUsers(updatedUsers);
              localStorage.setItem('users', JSON.stringify(updatedUsers));
              navigate('/table');
            } else {
              // Adding a new user
              const newUser = { ...curRecord, id: id + 1 };
              addUser(newUser);
              localStorage.setItem('users', JSON.stringify([...users, newUser]));
              navigate('/table');
              console.log(curRecord);
            }
          } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        }
      };
      
    
      

    const handleUpdate = () => {
        const updatedUsers =users && users.map((user) =>
            user.id === curRecord.id ? curRecord : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        navigate('/table');
    };



    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
        <Box sx={{ width: '100%', overflowY: 'auto', maxHeight: 400 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};


                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Box sx={{ minHeight: '400px', overflowY: 'auto' }} >
                {(() => {
                    switch (activeStep) {
                        case 0:
                            return <PersonalDetails
                                onSuccess={onSuccess}
                                onError={onError}
                                formData={curRecord.PersonalDetails} />;
                        case 1:
                            return <BankDetails
                                onSuccess={onSuccess}
                                onError={onError}
                                formData={curRecord.BankDetails} />;
                        case 2:
                            return <Education2
                                onSuccess={onSuccess}
                                onError={onError}
                                formData={curRecord.Education} />;
                        case 3:
                            return <Experience3
                                onSuccess={onSuccess}
                                onError={onError}
                                formData={curRecord.Experience}
                            />;
                        default:
                            return null;
                    }
                })()}
            </Box>

            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>

                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant='contained'
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1, mt: 4 }}
                        >
                            Back
                        </Button>
                        {editMode && (<Button onClick={handleUpdate} disabled={!allowedNext} variant='outlined' sx={{ mr: 1, mt: 4 }}>
                            Update
                        </Button>)}
                        
                        <Button onClick={handleNext} disabled={!allowedNext} variant='contained' sx={{ mr: 1, mt: 4 }}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </React.Fragment>
            )}
        </Box>
    );
}


