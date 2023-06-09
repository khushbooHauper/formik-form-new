import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Formik, Form, FieldArray, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useEffect } from 'react';
import moment from 'moment';

const validationSchema = Yup.object().shape({
    experience: Yup.array().of(
        Yup.object().shape({
            company: Yup.string()
                .required('company name is required')
                .matches(/^[A-Za-z\s]+$/, 'company name must only contain letters and spaces')
                .min(2, 'company name must be at least 2 characters')
                .max(50, 'company name must be at most 50 characters'),
            designation: Yup.string()
                .required('designation is required')
                .matches(/^[A-Za-z\s]+$/, 'designation must only contain letters and spaces')
                .min(2, 'designation must be at least 2 characters')
                .max(50, 'designation must be at most 50 characters'),
            joiningDate: Yup.date()
                .required('Joining date is required'),
            leavingDate: Yup.date()
                .required('Leaving date is required')
                .notOneOf([Yup.ref('joiningDate')], 'Leaving date cannot be the same as joining date')
                .min(Yup.ref('joiningDate'), 'Leaving date cannot be before joining date')
                .test('minimum-experience', 'Minimum 6 months experience required', function (leavingDate) {
                    const joiningDate = this.parent.joiningDate;
                    const sixMonthsAgo = moment(joiningDate).add(6, 'months'); // Modify to add 6 months instead of subtracting
                    const isAfterSixMonths = moment(leavingDate).isSameOrAfter(sixMonthsAgo, 'day');
                    return isAfterSixMonths || !leavingDate; // Allow empty leaving date
                })
                .test('future-date', 'Leaving date cannot be in the future', function (leavingDate) {
                    return moment(leavingDate).isSameOrBefore(moment(), 'day');
                })
                .test('not-same-date', 'Joining date and leaving date cannot be the same', function (leavingDate) {
                    const joiningDate = this.parent.joiningDate;
                    return moment(leavingDate).isAfter(joiningDate, 'day');
                }),

        })
    )
});

const initialValues = {
    experience: [{ company: "", designation: "", joiningDate: "", leavingDate: "" }]
};
export const Experience = ({ formData, onError, onSuccess }) => {
    const formik = useFormik({
        initialValues: formData || initialValues,
        validationSchema: validationSchema,

    });

    const { values, handleChange, touched, errors, isValid, handleBlur, setFieldValue, handleSubmit } = formik;
    useEffect(() => {
        const isAnyArrayEmpty = formik.values.experience.some((experience) => {
            return (
                !experience.company ||
                !experience.designation ||
                !experience.joiningDate ||
                !experience.leavingDate
            );
        });

        if (formik.isValid && !isAnyArrayEmpty) {
            onSuccess(formik.values, 'Experience');
        } else {
            onError(formik.errors);
        }
    }, [formik.isValid, formik.values, onSuccess, onError]);
    return (
        <form onSubmit={handleSubmit}>
            <Formik>
                <Grid container spacing={2} style={{ marginTop: "40px", padding: '20px' }}>
                    <Grid item sm={11}>
                        <FieldArray
                            name="experience"
                            validateOnChange={false}
                            render={(arrayHelpers) => (
                                <Grid item xs={12}>
                                    <div>
                                        {values.experience.map((experience, index) => (
                                            <Grid container key={index} spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography variant='h6'>{values.experience[index].designation || `Experience ${values.experience.length}`}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        name={`experience.${index}.company`}
                                                        label="company Name"
                                                        variant="outlined"
                                                        value={values.experience[index].company || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
                                                        error={touched.experience && touched.experience[index] && touched.experience[index].company && errors.experience && errors.experience[index] && errors.experience[index].company ? true : false}
                                                        helperText={touched.experience && touched.experience[index] && touched.experience[index].company && errors.experience && errors.experience[index] && errors.experience[index].company ? errors.experience[index].company : ''}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        name={`experience.${index}.designation`}
                                                        label="designation"
                                                        variant="outlined"
                                                        value={values.experience[index].designation || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
                                                        error={touched.experience && touched.experience[index] && touched.experience[index].designation && errors.experience && errors.experience[index] && errors.experience[index].designation ? true : false}
                                                        helperText={touched.experience && touched.experience[index] && touched.experience[index].designation && errors.experience && errors.experience[index] && errors.experience[index].designation ? errors.experience[index].designation : ''}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        name={`experience.${index}.joiningDate`}
                                                        label="joiningDate"
                                                        variant="outlined"
                                                        value={values.experience[index].joiningDate || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        id="date"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        error={touched.experience && touched.experience[index] && touched.experience[index].joiningDate && errors.experience && errors.experience[index] && errors.experience[index].joiningDate ? true : false}
                                                        helperText={touched.experience && touched.experience[index] && touched.experience[index].joiningDate && errors.experience && errors.experience[index] && errors.experience[index].joiningDate ? errors.experience[index].joiningDate : ''}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        name={`experience.${index}.leavingDate`}
                                                        label="leavingDate"
                                                        variant="outlined"
                                                        value={values.experience[index].leavingDate || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        id="date"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        error={touched.experience && touched.experience[index] && touched.experience[index].leavingDate && errors.experience && errors.experience[index] && errors.experience[index].leavingDate ? true : false}
                                                        helperText={touched.experience && touched.experience[index] && touched.experience[index].leavingDate && errors.experience && errors.experience[index] && errors.experience[index].leavingDate ? errors.experience[index].leavingDate : ''}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {values.experience.length > 1 &&
                                                        <IconButton onClick={() => {
                                                            const currentValues = [...values.experience];
                                                            currentValues.splice(index, 1);
                                                            setFieldValue("experience", currentValues);
                                                        }}>
                                                            <RemoveIcon />
                                                        </IconButton>
                                                    }
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </div>
                                </Grid>
                            )}
                        />
                    </Grid>

                    <Grid item sm={1}>
                        <IconButton onClick={() => {
                            const newValues = {
                                company: "",
                                designation: "",
                                joiningDate: "",
                                leavingDate: "",
                            };
                            const currentValues = values.experience || [];
                            const isValid = currentValues.every((value) => {
                                return value.company && value.designation && value.joiningDate && value.leavingDate;
                            });

                            if (isValid) {
                                setFieldValue("experience", [newValues, ...currentValues]);
                            } else {
                                alert("Please fill all fields in the Experience section");
                            }
                        }}
                        >
                            <AddIcon
                                variant="outlined"
                                color="primary"
                            />
                        </IconButton>
                    </Grid>
                </Grid>
            </Formik>
        </form>
    )
}



