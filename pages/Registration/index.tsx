// Import Packages
import { useFormik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import Link from "next/link";
import axios from "axios";
import Swal from 'sweetalert2'
import {Button, CssBaseline, TextField, Grid, Box, Typography, Container, IconButton, InputAdornment} from "@mui/material"
import {Visibility,VisibilityOff} from "@mui/icons-material";
import Router from 'next/router';
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("../../components/header"), {});

//Yup Validation
const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const mobileNumberRegex = new RegExp("^0[0-9]{10}$");

const regvalidation = Yup.object({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters long")
    .max(10, "Username must not exceed 10 characters")
    .required("Username is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(15, "Password must not exceed 15 characters")
    .matches(
      passwordRegex,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 special character, and 1 number"
    )
    .required("Password is required"),

  confirmPass: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match"),

  firstName: Yup.string().required("Required"),

  middleName: Yup.string(),

  lastName: Yup.string().required("Required"),

  emailAdd: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  contact: Yup.string()
    .matches(
      mobileNumberRegex,
      "Mobile number must start with 0 and be 11 digits long"
    )
    .required("Mobile number is required"),
});

export default function Registration() {
  //Formik validationSchema
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPass: "",
      firstName: "",
      middleName: "",
      lastName: "",
      emailAdd: "",
      contact: "",
    },

    onSubmit: (data) => {
      axios({
        method: "POST",
        url: "https://63e1d7b34324b12d963f6754.mockapi.io/test/",
        data: data,
      })
        .then(function (res) {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Registered',
            showConfirmButton: false,
            timer: 1500
          })
          formik.resetForm();
          setTimeout(() => {
            Router.push('/');
          }, 2000);
          
        })
        .catch(function (res) {
          console.log(res);
        });
    },

    validationSchema: regvalidation,
  });

  //Password Visibilty ON/OFF
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConPassword, setShowConPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConPassword = () => setShowConPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <DynamicHeader/>
        <Box
          sx={{
            boxShadow: 1,
            borderRadius: 2,
            mt:12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography
            component="h6"
            sx={{ color: "text.primary", fontWeight: "large" }}
          >
            REGISTRATION
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  id="password"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPass"
                  label="Confirm Password"
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPass}
                  type={showConPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showConPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  id="confirmPass"
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPass &&
                    Boolean(formik.errors.confirmPass)
                  }
                  helperText={
                    formik.touched.confirmPass && formik.errors.confirmPass
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="middleName"
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  helperText="Middle name is optional"
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onBlur={formik.handleBlur}
                  name="lastName"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailAdd"
                  label="Email Address"
                  onBlur={formik.handleBlur}
                  name="emailAdd"
                  variant="outlined"
                  value={formik.values.emailAdd}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.emailAdd && Boolean(formik.errors.emailAdd)
                  }
                  helperText={formik.touched.emailAdd && formik.errors.emailAdd}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                  onBlur={formik.handleBlur}
                  name="contact"
                  variant="outlined"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.contact && Boolean(formik.errors.contact)
                  }
                  helperText={formik.touched.contact && formik.errors.contact}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="space-evenly" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, ":hover": { bgcolor: "green" } }}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link href="/Auth">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}