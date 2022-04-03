import React, { isValidElement } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TutorProvider, { TutorContext } from './Data/TutorProvider';
//import TutorDt from './Data/TutorDt';
import { useContext } from 'react';
import { useDialog } from "react-mui-dialog";
import TutorDialog from './TutorDialog'
import axios from 'axios'
import role from '../Roles';
import dtClouser from '../DataClouse';
import { MessageBox } from './MessageBox';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Footer from './footer/footer';




const genderDt = [
  1,
  0
]

const typeDt = [
  0,
  1
]


const validationSchema = yup.object({
  userName: yup
    .string('Enter your username')
    .required('username is required')
    .min(8, 'The minimum is 8 characters '),
  email: yup
    .string('Enter your email')
    .email("it's not Email Format")
    .required('Your Email is Required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'password must match')
  ,
  firstName: yup.
    string('Enter your first name').
    required('The first name is required '),
  middleName: yup.
    string('Enter your middle name').
    required('The middle name is required '),
  lastName: yup.
    string('Enter your last name').
    required('The last name is required '),
  country: yup
    .string('Enter your country ')
    .required('The country is required'),
  city: yup.
    string('Enter your city ').
    required('The city is required'),
  street: yup
    .string('Enter your street ').
    required('The street is required'),
  ZIP: yup
    .number('Enter your street ')
    .required('The street is required'),
  phoneNumber: yup
    .number('Enter your phone number ')
    .required('The phone number is required'),

  gender: yup
    .string('Enter your gender ')
    .required('The gender is required'),
  type: yup
    .string('Enter your type ')
    .required('The type is required')
});
export default () => {

  let navigate = useNavigate();
  const dt = dtClouser();

  const [isTutor, setTutor] = React.useState(false)
  const { openDialog } = useDialog()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      city: '',
      street: '',
      ZIP: '',
      gender: genderDt,
      phoneNumber: '',
      type: typeDt
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      isUsernameValid(values.userName)
     
      if (isTutor && error === 0) {
        dt.setData(values)

        axios.get('http://localhost:4000/fetchDept').
          then((res) => {
            let dept = res.data
            TutorDialog(openDialog, dt, dept,navigate)
          }).
          catch((err) => {
            console.log('there is error is' + err)
          })
      }

      else if (error != 0) {
        MessageBox(openDialog, 'Errors ', "you can't completely signup, there are errors", 'Okay');
      }

      else if (error === 0) {
        axios.post('http://localhost:4000/user/register', {
          data: values
        }).
          then((response) => {
            localStorage.removeItem('token')
            localStorage.removeItem('type')

            var type = values.type
            var token = response.data.token;
            localStorage.setItem('type', type);
            localStorage.setItem('token', token);
            console.log(type)
            navigate('/home')

          }).catch((error) => {
            alert(JSON.stringify(error, null, 2))
          })
      }
    },
  });



  React.useEffect(() => {
    var type = localStorage.getItem('type')
    if (type === 2)
      navigate('/admin/home')
    else if (type === 0)
      navigate('/student/profile')

  }, [])

  
  // to check if the user name is valid or not 
  const isUsernameValid = async (val) => {
    await axios.get(`http://localhost:4000/middleware/isUsernameValid/${val}`)
      .then((response) => {
        if (response.data === 'no')
          setError(11000)
        else setError(0)
      }).catch((error) => {
        alert(error)
      })
  }




  const [error, setError] = React.useState(false)

  return (

    <div className='container'>
      <div className='row' style={{
        marginTop: '20px'
      }}>

        <Typography color="#D90429" align="center" variant="h5" >Sign Up</Typography>

        <Box sx={{mt:1}}></Box>
        <div className='col-md-2 col-sm-0' />
        <div className='col-md-8 col-sm-12'>
          <Stack sx={{
            width: '100%',
            display: error === 11000 ? 'block' : 'none'
          }} spacing={2}>
            <Alert severity="error" variant='filled'>The user name is already exist, type Another</Alert>
          </Stack>
          <form onSubmit={formik.handleSubmit} className='row'>

            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 0 }
              }}
            >
              <TextField label="User name" variant='filled' size='small'
                name="userName"
                fullWidth
                value={formik.values.userName}
                onChange={(e) => {
                  formik.handleChange(e)
                  isUsernameValid(e.target.value)
                }}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
              />

            </Box>


            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 },
              }}
              
            >

              <TextField label="Email" variant='filled' size='small'
                name="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>


            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 },
              }}
            >
              <TextField label="Password" variant='filled' size='small'
                name="password"
                fullWidth
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>


            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 },
              }}>
              <TextField label="Confirm Password" variant='filled' size='small'
                name="confirmPassword"
                type="password"
                fullWidth
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Box>


            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 },
              }}
            >
              <TextField label="First Name" variant='filled' size='small'
                name="firstName"
                style={{
                  width: '30%',
                  marginRight: '5%'
                }}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField label="Middle Name" variant='filled' size='small'
                name="middleName"
                style={{
                  width: '30%',
                  marginRight: '4%'
                }}
                value={formik.values.middleName}
                onChange={formik.handleChange}
                error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                helperText={formik.touched.middleName && formik.errors.middleName}
              />

              <TextField label="Last Name" variant='filled' size='small'
                name="lastName"
                style={{
                  width: '30%',
                  marginLeft: '1%'
                }}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />

            </Box>

            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 }
              }}
              autoComplete="off">
              <TextField label="Country" variant='filled' size='small'
                name="country"
                style={{
                  width: '47%',
                  marginRight: '3%'
                }}
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />

              <TextField label="City" variant='filled' size='small'
                name="city"
                style={{
                  width: '47%',
                  marginLeft: '3%'

                }}
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Box>


            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 },


              }}
              autoComplete="off">
              <TextField label="Street" variant='filled' size='small'
                name="street"
                style={{
                  width: '47%',
                  marginRight: '3%'
                }}
                value={formik.values.street}
                onChange={formik.handleChange}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />

              <TextField label="ZIP" variant='filled' size='small'
                name="ZIP"
                style={{
                  width: '47%',
                  marginLeft: '3%'

                }}
                value={formik.values.ZIP}
                onChange={formik.handleChange}
                error={formik.touched.ZIP && Boolean(formik.errors.ZIP)}
                helperText={formik.touched.ZIP && formik.errors.ZIP}
              />
            </Box>

            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 },
              }}>
              <TextField label="Phone Number" variant='filled' size='small'
                name="phoneNumber" 

                fullWidth
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Box>



            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 0 },
              }}>

              <FormControl component="fieldset"
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}

              >
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  name='gender'
                  value={formik.values.gender}
                  onChange={formik.handleChange}


                >
                  <FormControlLabel value={genderDt[0]} control={<Radio />} label="Male" />
                  <FormControlLabel value={genderDt[1]} control={<Radio />} label="Female" />

                </RadioGroup>
              </FormControl>
            </Box>

            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 0},
              }}>

              <FormControl component="fieldset"
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}

              >
                <FormLabel component="legend">Are You student or Tutor ?</FormLabel>
                <RadioGroup
                  row
                  name='type'
                  value={formik.values.type}
                  onChange={formik.handleChange}


                >
                  <FormControlLabel value={typeDt[0]} control={<Radio onClick={() => {
                    setTutor(false)
                  }} />
                  } label="Student"

                  />
                  <FormControlLabel value={typeDt[1]}
                    control={<Radio
                      onClick={() => {
                        setTutor(true)
                      }}
                    />} label="Tutor" />

                </RadioGroup>
              </FormControl>
            </Box>


            <Button  style={{backgroundColor:"#000052" , color:"#fff" , padding:"5px"}} variant="contained" fullWidth type="submit">
              Sign up
            </Button>
            <Box sx={{mt:2}}></Box>
          </form>
        </div>
        <div className='col-md-2 col-sm-0' />
      </div>
      <Footer/>
    </div>
  );
};
