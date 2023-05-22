import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";


const initialValues = {
  bank: "",
  accountNumber: "",
  ifsc: "",
  panCard: "",

};



export const BankDetails = ({ formData, onError, onSuccess }) => {
  const formik = useFormik({
    initialValues: formData || initialValues,
    validationSchema: Yup.object({
      bank: Yup.string()
        .required('Bank Name is required')
        .matches(/^[A-Za-z\s]+$/, 'Bank Name should only contain letters and spaces')
        .min(3, 'Bank Name should be at least 3 characters')
        .max(50, 'Bank Name should not exceed 50 characters'),
      accountNumber: Yup.string()
        .required('Account Number is required')
        .matches(/^\d{6,12}$/, 'Account Number should be a numeric value between 6 and 12 digits'),
      ifsc: Yup.string()
        .required('ifsc code is required')
        .matches(/^[A-Za-z0-9]+$/, 'ifsc code should only contain letters and numbers')
        .min(6, 'ifsc code should be at least 6 characters')
        .max(20, 'ifsc code should not exceed 20 characters'),
      panCard: Yup.string()
        .required('PAN Card Number is required')
        .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN Card Number format'),

    }),

  });


 
  useEffect(() => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        onSuccess(formik.values, "BankDetails");
      } else {
        onError(errors);
      }
    });
  }, [formik.values, formik.dirty, onSuccess, onError]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={12}>
          <TextField
            name="bank"
            label="Bank Name"
            variant="outlined"
            fullWidth
            value={formik.values.bank}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bank && Boolean(formik.errors.bank)}
            helperText={formik.touched.bank && formik.errors.bank}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="accountNumber"
            label="Account Number"
            variant="outlined"
            fullWidth
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.accountNumber &&
              Boolean(formik.errors.accountNumber)
            }
            helperText={
              formik.touched.accountNumber && formik.errors.accountNumber
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="ifsc"
            label="IFSC Code"
            variant="outlined"
            fullWidth
            value={formik.values.ifsc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ifsc && Boolean(formik.errors.ifsc)}
            helperText={formik.touched.ifsc && formik.errors.ifsc}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="panCard"
            label="PAN Number"
            variant="outlined"
            fullWidth
            value={formik.values.panCard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.panCard && Boolean(formik.errors.panCard)}
            helperText={formik.touched.panCard && formik.errors.panCard}
          />
        </Grid>
      </Grid>

    </form>
  );
};
