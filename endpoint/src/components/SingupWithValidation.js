import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import { OutlinedInput } from '@mui/material';

import axios from 'axios'

const validationSchema = yup.object({
  username: yup
    .string('Enter your user name')
    .required('Email is required')
    //.min(8, 'The username must be at least 8 characters ')
    .test('Unique Email', 'Email already in use',
      (value) => {
        return new Promise((resolve, reject) => {
          axios.get(`http://localhost:4000/middleware/isValidEmail/${value}`)
            .then((data) => {
              if (!(data.data === 'yes'))
                resolve(true)
              else
                resolve(false)
            })

        })
      })
  ,
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      country: '',
      city: '',
      street: '',
      ZIP: '',
      gender: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  const [showPass, setShowPass] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPass(!showPass)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div className='container'>
      <div className='row' style={{
        marginTop: '20px'
      }}>
        <div className='col-md-2 col-sm-0' />
        <div className='col-md-8 col-sm-12'>
          <form onSubmit={formik.handleSubmit} className='row'>
            {/* 
            <div className='col-md-12 m-2'>
              <Box

                component="form"
                sx={{
                  display: 'flex',

                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >


                <TextField
                  size='small'
                  id="outlined-basic" label="dept name" variant="outlined" />


              </Box>
            </div> */}

            <TextField
              variant="outlined"
              label="user name"
              id="username"
              name="username"

              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}

              InputProps={{
                startAdornment:
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
              }}
            />

            {/*<TextField
              sx={{
                marginBottom: '20px'
              }}
              variant="outlined"
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.touched.password && formik.errors.password}

              inputProps={{
                startAdornment: <InputAdornment position="end">
                  end
                </InputAdornment>
              }} />




            <FormControl variant="outlined"

            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"

                type={showPass ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                error={formik.touched.password && Boolean(formik.errors.password)}


                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl> */}
            <Button color="primary" variant="contained" fullWidth type="submit">
              Register
            </Button>
          </form>

        </div>
        <div className='col-md-2 col-sm-0' />
      </div>
    </div>
  );
};
