import { Button, Grid, IconButton, TextField } from '@mui/material';
import { Formik, Form, FieldArray, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
  education: Yup.array().of(
    Yup.object().shape({
      courseName: Yup.string()
        .required('Course name is required')
        .matches(/^[A-Za-z\s]+$/, 'Course name must only contain letters and spaces')
        .min(2, 'Course name must be at least 2 characters')
        .max(50, 'Course name must be at most 50 characters'),
      university: Yup.string()
        .required('university name is required')
        .matches(/^[A-Za-z\s]+$/, 'university name must only contain letters and spaces')
        .min(2, 'university name must be at least 2 characters')
        .max(50, 'university name must be at most 50 characters'),
      percentage: Yup.number()
        .typeError('Percentage must be a number')
        .min(0, 'Percentage must be greater than or equal to 0')
        .max(100, 'Percentage must be less than or equal to 100')
        .required('Percentage is required'),
      passingYear: Yup.number()
        .typeError('Passing year must be a number')
        .integer('Passing year must be an integer')
        .min(1900, 'Passing year must be after 1900')
        .max(new Date().getFullYear(), 'Passing year cannot be in the future')
        .required('Passing year is required'),
    })
  ),
});

const initialValues = {
  education: [{ courseName: "", university: "", percentage: "", passingYear: "" }]
};
export const Education2 = ({ formData, onError, onSuccess }) => {

  const formik = useFormik({
    initialValues: formData || initialValues,
    validationSchema: validationSchema,

  });

  const { values, handleChange, touched, errors, isValid, handleBlur, setFieldValue, handleSubmit } = formik;

  useEffect(() => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        onSuccess(formik.values, "Education");
      } else {
        onError(errors);
      }
    });
  }, [formik.values, formik.dirty, onSuccess, onError]);

 

  return (
    <form onSubmit={handleSubmit}>
      <Formik>
        <Grid container spacing={2} >
          <Grid item sm={11}>
            <FieldArray
              name="education"
              validateOnChange={false}
              render={(arrayHelpers) => (
                <Grid item xs={12}>
                  <div >
                    {values.education && values.education.map((education, index) => (
                      <Grid container key={index} spacing={2}  >
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name={`education.${index}.courseName`}
                            label="Course Name"
                            variant="outlined"
                            value={values.education[index].courseName || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}

                            error={touched.education && touched.education[index] && touched.education[index].courseName && errors.education && errors.education[index] && errors.education[index].courseName ? true : false}
                            helperText={touched.education && touched.education[index] && touched.education[index].courseName && errors.education && errors.education[index] && errors.education[index].courseName ? errors.education[index].courseName : ''}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name={`education.${index}.university`}
                            label="University"
                            variant="outlined"
                            value={values.education[index].university || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}

                            error={touched.education && touched.education[index] && touched.education[index].university && errors.education && errors.education[index] && errors.education[index].university ? true : false}
                            helperText={touched.education && touched.education[index] && touched.education[index].university && errors.education && errors.education[index] && errors.education[index].university ? errors.education[index].university : ''}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name={`education.${index}.percentage`}
                            label="Percentage"
                            variant="outlined"
                            value={values.education[index].percentage || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}

                            error={touched.education && touched.education[index] && touched.education[index].percentage && errors.education && errors.education[index] && errors.education[index].percentage ? true : false}
                            helperText={touched.education && touched.education[index] && touched.education[index].percentage && errors.education && errors.education[index] && errors.education[index].percentage ? errors.education[index].percentage : ''}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name={`education.${index}.passingYear`}
                            label="Passing Year"
                            variant="outlined"
                            value={values.education[index].passingYear || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}

                            error={touched.education && touched.education[index] && touched.education[index].passingYear && errors.education && errors.education[index] && errors.education[index].passingYear ? true : false}
                            helperText={touched.education && touched.education[index] && touched.education[index].passingYear && errors.education && errors.education[index] && errors.education[index].passingYear ? errors.education[index].passingYear : ''}
                          />
                        </Grid>
                        <Grid item xs={2}>

                          {values.education.length > 1 &&
                            <IconButton onClick={(index) => {
                              const currentValues = [...values.education];
                              currentValues.splice(index, 1);
                              setFieldValue("education", currentValues);
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
                courseName: "",
                university: "",
                percentage: "",
                passingYear: "",
              };
              const currentValues = values.education || [];
              const isValid = currentValues.every((value) => {
                return value.courseName && value.university && value.percentage && value.passingYear;
              });

              if (isValid) {
                setFieldValue("education", [newValues, ...currentValues]);
              } else {
                alert("Please fill all fields in the Education section");
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



