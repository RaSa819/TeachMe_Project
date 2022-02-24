import React, { useState, useRef } from 'react'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Drawer from './Layout/Drawer'
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


//
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function EditProfile() {


  let token = localStorage.getItem('token')

  const username = useRef()
  const firstName = useRef();
  const middleName = useRef();
  const lastName = useRef();
  const passwordRef = useRef();
  const newPassword = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const country = useRef();
  const city = useRef();
  const street = useRef();
  const ZIP = useRef();

  const [img, setImg] = useState(null);



  var errorCount = 0;
  const update = () => {

    [username, email,
      firstName, middleName, lastName, country, city, street, ZIP,
    ].forEach((item) => {
      if (item.current.value.length <= 0) {
        item.current.focus();
        errorCount++;
      }
    })

    if (errorCount > 0)
      return;

    const data = {
      userName: username.current.value,
      firstName: firstName.current.value,
      middleName: middleName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      address: {
        country: country.current.value,
        city: city.current.value,
        street: street.current.value,
        ZIP: ZIP.current.value,
      }
    }

    axios.post('http://localhost:4000/student/updateProfile', {
      data: data,
      id:token
    }).
      then((data) => {
        console.log(data)
      }).
      catch((error) => {
        console.log('the error ' + error)
      })
  }
  React.useEffect(async () => {
    const axi1 = axios.get('http://localhost:4000/fetch', {
      responseType: 'blob'
    });

    const axi2 = axios.get('http://localhost:4000/student/profile', {
      params: {
        id: token
      }
    })

    await axios.all([axi1, axi2]).then(axios.spread((res1, res2) => {
      var imgUrl = URL.createObjectURL(res1.data)
      if (img === null)
        setImg(imgUrl)
      console.log(res2.data)

      username.current.value = res2.data.userName;
      firstName.current.value = res2.data.name.firstName;
      middleName.current.value = res2.data.name.middleName;
      lastName.current.value = res2.data.name.lastName;

      //passwordRef.current.value = res2.data.password;
      email.current.value = res2.data.email;
      phoneNumber.current.value = res2.data.phoneNumber[0];
      country.current.value = res2.data.address.country;
      city.current.value = res2.data.address.city;
      street.current.value = res2.data.address.city;
      ZIP.current.value = res2.data.address.ZIP;


    })).catch((error) => {
      console.log('the error is' + error)
    })
  }, [])

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Drawer>
      <div style={{
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px'
      }}>
        <Avatar alt="Mohammed" src={img}
          sx={{
            height: '100px',
            width: '100px',

          }}
        />
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <TextField
              fullWidth
              label="User name"
              id="outlined-start-adornment"
              inputRef={username}
              InputProps={{
                startAdornment: <InputAdornment position="start">User name</InputAdornment>,
              }}
            />
          </div>
        </div>

        <Divider
          style={{
            marginBottom: '20px',
            marginTop: '20px'
          }}
        />

        <div className='row'>
          <div className='col-md-6'>
            <FormControl
              fullWidth
              inputRef={passwordRef}
              variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                startAdornment={

                  <InputAdornment position="start">Password</InputAdornment>
                }

                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>

          <div className='col-md-6'>
            <FormControl
              fullWidth
              variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                inputRef={newPassword}
                onChange={handleChange('password')}
                startAdornment={

                  <InputAdornment position="start">New Password</InputAdornment>
                }

                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>
          </div>
        </div>

        <Divider
          style={{
            marginBottom: '20px',
            marginTop: '20px'
          }}
        />

        <div className='row'>
          <div className='col-md-4'>
            <TextField
              fullWidth
              label="First name"
              id="outlined-start-adornment"
              inputRef={firstName}
              InputProps={{
                startAdornment: <InputAdornment position="start">First name</InputAdornment>,
              }}
            />
          </div>

          <div className='col-md-4'>
            <TextField
              fullWidth
              label="Middle name"
              id="outlined-start-adornment"
              inputRef={middleName}
              InputProps={{
                startAdornment: <InputAdornment position="start">Middle name</InputAdornment>,
              }}
            />
          </div>

          <div className='col-md-4'>
            <TextField
              fullWidth
              label="Last name"
              inputRef={lastName}
              id="outlined-start-adornment"

              InputProps={{
                startAdornment: <InputAdornment position="start">Last name</InputAdornment>,
              }}
            />

          </div>
        </div>
        <Divider
          style={{
            marginBottom: '20px',
            marginTop: '20px'
          }}
        />
        <div className='row'>
          <div className='col-md-12'>
            <TextField
              fullWidth
              label="Email"
              id="outlined-start-adornment"
              inputRef={email}
              InputProps={{
                startAdornment: <InputAdornment position="start">Email</InputAdornment>,
              }}
            />
          </div>
        </div>
        <Divider
          style={{
            marginBottom: '20px',
            marginTop: '20px'
          }}
        />

        <div className='row'>
          <div className='col-md-12'>
            <TextField
              fullWidth
              label="Phone Number"
              id="outlined-start-adornment"
              inputRef={phoneNumber}
              InputProps={{
                startAdornment: <InputAdornment position="start">Phone Number</InputAdornment>,
              }}
            />
          </div>

        </div>

        <Divider
          style={{
            marginBottom: '20px',
            marginTop: '20px'
          }}
        />

        <div className='row'>
          <div className='col-md-3'>
            <TextField
              fullWidth
              label="country"
              id="outlined-start-adornment"
              inputRef={country}
              InputProps={{
                startAdornment: <InputAdornment position="start">country</InputAdornment>,
              }}
            />
          </div>

          <div className='col-md-3'>
            <TextField
              fullWidth
              label="city"
              inputRef={city}
              id="outlined-start-adornment"

              InputProps={{
                startAdornment: <InputAdornment position="start">city</InputAdornment>,
              }}
            />
          </div>

          <div className='col-md-3'>
            <TextField
              fullWidth
              label="street"
              id="outlined-start-adornment"
              inputRef={street}
              InputProps={{
                startAdornment: <InputAdornment position="start">street</InputAdornment>,
              }}
            />

          </div>

          <div className='col-md-3'>
            <TextField
              fullWidth
              label="ZIP"
              inputRef={ZIP}
              id="outlined-start-adornment"

              InputProps={{
                startAdornment: <InputAdornment position="start">ZIP</InputAdornment>,
              }}
            />
          </div>
        </div>

        <Divider
          style={{
            marginBottom: '20px',
            marginTop: '20px'
          }} />
      </div>
      <Stack direction="row" spacing={2}
        justifyContent="center"
      >
        <Button variant="contained" color="success"
          onClick={() => {
            update()
          }}
        >
          Save
        </Button>
        <Button variant="outlined" color="error">
          Cancel
        </Button>
      </Stack>
    </Drawer>
  )
}