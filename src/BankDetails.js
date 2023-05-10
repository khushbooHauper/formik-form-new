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
      bank: Yup.string().required("Bank name is required"),
      accountNumber: Yup.string()
        .required("Account number is required")
        .matches(/^[0-9]*$/, "Account number should only contain digits"),
      ifsc: Yup.string().required("IFSC code is required"),
      panCard: Yup.string()
        .required("PAN number is required")

    }),

  });


  useEffect(() => {
    if (formik.dirty && formik.isValid) {
      onSuccess(formik.values, "BankDetails")
    } else {
      onError(formik.errors)
    }
  }, [formik])

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
