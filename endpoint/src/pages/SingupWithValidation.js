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
import { useDialog } from "react-mui-dialog";
import TutorDialog from '../components/TutorDialog'
import axios from 'axios'
import dtClouser from '../DataClouse';
import { MessageBox } from '../components/MessageBox';
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Footer from '../components/footer/footer';
import Autocomplete from '@mui/material/Autocomplete';
import { countries, genderDt, typeDt } from '../general/datas';
import classes from "./signup.module.css";
import Divider from '@mui/material/Divider';


const styleCenter = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  marginTop: "20px"
}

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
            TutorDialog(openDialog, dt, dept, navigate)
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
            localStorage.removeItem('userDetail')

            var type = values.type
            var token = response.data.token;
            localStorage.setItem('type', type);
            localStorage.setItem('token', token);
            values.password = null
            values.confirmPassword = null
            localStorage.setItem('userDetail', values);
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

    <div >
      <div>
        <Stack sx={{
          width: '100%',
          display: error === 11000 ? 'block' : 'none'
        }} spacing={2}>
          <Alert severity="error" variant='filled'>The user name is already exist, type Another</Alert>
        </Stack>
      </div>
      <div style={styleCenter} >
        <div className={classes.formDiv}>
          <h3 style={{ color: "#000052", marginBottom: "20px" }}>Signup</h3>
          <p>Create a new account</p>

          <div >
            <form onSubmit={formik.handleSubmit}>

              <Box component="form"
                autoComplete="off"
                sx={{
                  '& > :not(style)': { mt: 3 },
                }}
              >

                <TextField className={classes.TextField} label="User name" size='small'
                  name="userName"
                  style={{
                    width: '47%',
                    marginRight: '3%'
                  }}
                  value={formik.values.userName}
                  onChange={(e) => {
                    formik.handleChange(e)
                    isUsernameValid(e.target.value)
                  }}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.touched.userName && formik.errors.userName}
                />


                <TextField label="Email" size='small'
                  name="email"
                  className={classes.TextField}
                  style={{
                    width: '47%',
                    marginLeft: '3%',

                  }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />


                <TextField label="Password" size='small'
                  name="password"
                  className={classes.TextField}
                  fullWidth
                  type="password"
                  style={{
                    width: '47%',
                    marginRight: '3%'
                  }}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />

                <TextField label="Confirm Password" size='small'
                  name="confirmPassword"
                  className={classes.TextField}
                  type="password"
                  fullWidth
                  style={{
                    width: '47%',
                    marginLeft: '3%'
                  }}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />


                <TextField label="First Name" size='small'
                  name="firstName"
                  className={classes.TextField}
                  style={{
                    width: '30%',
                    marginRight: '5%'
                  }}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField label="Middle Name" size='small'
                  name="middleName"
                  className={classes.TextField}
                  style={{
                    width: '30%',
                    marginRight: '4%'
                  }}
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                  helperText={formik.touched.middleName && formik.errors.middleName}
                />

                <TextField label="Last Name" size='small'
                  className={classes.TextField}
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


                <Autocomplete
                  // value={formik.values.country}
                  id="country-select-demo"
                  sx={{ display: 'inline-block' }}
                  className={classes.TextField}
                  style={{
                    width: '47%',
                    marginRight: '3%'
                  }}
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  defaultValue={countries.find(v => v.code === formik.values.country)}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                      {option.label} ({option.code})
                    </Box>
                  )}
                  onChange={(e, value) => {
                    formik.values.country = value.code
                  }}
                  renderInput={(params) => (
                    <TextField
                      className={classes.TextField}
                      size='small'
                      name="country"
                      {...params}
                      label="Country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                <TextField label="City" size='small'
                  name="city"
                  className={classes.TextField}
                  style={{
                    width: '47%',
                    marginLeft: '3%'

                  }}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />


                <TextField label="ZIP" size='small'
                  name="ZIP"
                  className={classes.TextField}
                  style={{
                    width: '47%',
                    marginRight: '3%'
                  }}
                  value={formik.values.ZIP}
                  onChange={formik.handleChange}
                  error={formik.touched.ZIP && Boolean(formik.errors.ZIP)}
                  helperText={formik.touched.ZIP && formik.errors.ZIP}
                />

                <TextField label="Phone Number" size='small'
                  name="phoneNumber"
                  className={classes.TextField}
                  style={{
                    width: '47%',
                    marginLeft: '3%'
                  }}
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />

                <FormControl sx={{ width: "50%", textAlign: "left" }}
                  className={classes.TextField}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}

                >
                  <FormLabel id="demo-row-radio-buttons-group-label"
                  >Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name='gender'
                    value={formik.values.gender}
                    onChange={formik.handleChange}


                  >
                    <FormControlLabel value={genderDt[0]} control={<Radio />} label="Male" />
                    <FormControlLabel value={genderDt[1]} control={<Radio />} label="Female" />

                  </RadioGroup>
                </FormControl>


                <FormControl sx={{ width: "50%", textAlign: "left" }}
                  className={classes.TextField}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}

                >
                  <FormLabel id="demo-row-radio-buttons-group-label"

                  >Are You student or Tutor ?</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name='type'
                    value={formik.values.type}
                    onChange={formik.handleChange}


                  >
                    <FormControlLabel value={typeDt[0]} control={<Radio
                      onClick={() => {
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

              <Divider sx={{ margin: "10px", backgroundColor: "black !important" }} />

              <div  style={{ textAlign: "left" }}>
              <span  style={{marginRight:"200px" }}>
                Already have an account ?<Link to="/login" 
                style={{
                  textDecoration: 'none',
                  color: "#D90429"}} >
                   &nbsp; <u>Login </u> </Link>
                </span>
                <Button style={{ backgroundColor: "#000052", color: "#fff", padding: "5px", width: "30%" }}
                  variant="contained" fullWidth type="submit">
                  Sign up
                </Button>
              </div>
            </form>


          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
};










