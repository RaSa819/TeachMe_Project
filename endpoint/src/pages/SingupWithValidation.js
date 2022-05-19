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
import TutorDialog from '../components/TutorDialog';
import axios from 'axios'
import dtClouser from '../DataClouse';
import { MessageBox } from '../components/MessageBox';
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Footer from '../components/footer/footer';
import Autocomplete from '@mui/material/Autocomplete';
import { countries, genderDt, languageOptions, typeDt } from '../general/datas';
import classes from "./signup.module.css";
import Divider from '@mui/material/Divider';
import { useContext } from 'react';
import TutorProvider , { TutorContext } from '../components/Data/TutorProvider';
import role from '../Roles';
import { LanguageContext } from '../App';

const styleCenter = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
  marginTop: "20px"
}


export default () => {
  const language = React.useContext(LanguageContext);

  const validationSchema = yup.object({
    userName: yup
      .string('Enter your username')
      .required(language.UsernameRequired)
      .min(8, language.UsernameLength),
    email: yup
      .string('Enter your email')
      .email(language.NotEmail)
      .required(language.EmailRequired),
    password: yup
      .string('Enter your password')
      .min(8, language.PasswordLength)
      .required(language.PasswordLength),
    confirmPassword: yup
      .string('Enter your password')
      .required(language.PasswordMatch)
      .oneOf([yup.ref('password'), null], language.PasswordMatch)
    ,
    firstName: yup.
      string('Enter your first name').
      required(language.FirstNRequired),
    middleName: yup.
      string('Enter your middle name').
      required(language.MiddleNRequired),
    lastName: yup.
      string('Enter your last name').
      required(language.LastNRequired),
    country: yup
      .string('Enter your country ')
      .required(language.CountryRequired),
    city: yup.
      string('Enter your city ').
      required(language.CityRequired),
    // street: yup
    //   .string('Enter your street ').
    //   required('The street is required'),
    ZIP: yup
      .number('Enter your ZIP code ')
      .required(language.ZIPRequired),
    phoneNumber: yup
      .number('Enter your phone number ')
      .required(language.PhoneRequired),
  
    gender: yup
      .string('Enter your gender ')
      .required(language.GenderRequired),
    type: yup
      .string('Enter your type ')
      .required(language.TypeRequired)
  });
  
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
          <Alert severity="error" variant='filled'>{language.UserExist}</Alert>
        </Stack>
      </div>
      <div style={styleCenter} >
        <div className={classes.formDiv}>
          <h3 style={{ color: "#000052", marginBottom: "20px" }}>{language.SignUp}</h3>
          <p>{language.CreateAccount}</p>

          <div >
            <form onSubmit={formik.handleSubmit}>

            
            <Box 
                sx={{
                  '& > :not(style)': { mt: 3 },
                }}
              >

                <TextField className={classes.TextField} label={language.Username}
                 size='small'
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


                <TextField label={language.Email}
                 size='small'
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


                <TextField label={language.Password}
                size='small'
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

                <TextField label={language.Confirm}
                size='small'
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


                <TextField label={language.FirstN} 
                size='small'
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
                <TextField label={language.MiddleN} size='small'
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

                <TextField label={language.LastN} size='small'
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
                      label={language.Country}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                <TextField label={language.City} size='small'
                  name="City"
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


                <TextField label={language.ZIP} size='small'
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

                <TextField label={language.Phone} size='small'
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
                  >{language.Gender}</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name='gender'
                    value={formik.values.gender}
                    onChange={formik.handleChange}


                  >
                    <FormControlLabel value={genderDt[0]} control={<Radio />} label={language.Female} />
                    <FormControlLabel value={genderDt[1]} control={<Radio />} label={language.Male}/>

                  </RadioGroup>
                </FormControl>


                <FormControl sx={{ width: "50%", textAlign: "left" }}
                  className={classes.TextField}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}

                >
                  <FormLabel id="demo-row-radio-buttons-group-label"

                  >{language.AreYouStudentorTutor}</FormLabel>
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
                    } label={language.Student}

                    />
                    <FormControlLabel value={typeDt[1]}
                      control={<Radio
                        onClick={() => {
                          setTutor(true)
                        }}
                      />} label={language.Tutor} />

                  </RadioGroup>
                </FormControl>
             </Box>

              <Divider sx={{ margin: "10px", backgroundColor: "black !important" }} />

             <div style={{textAlign:"left",width:"100%", display:"inline-block"}}>
              <h6 style={{ width:"auto",display:"inline-block"}}>
              {language.HaveAccount}<Link to="/login" 
                style={{
                  textDecoration: 'none',
                  color: "#D90429" }} >
                   &nbsp; <u>{language.Login} </u> </Link>
                </h6>
                <Button style={{ backgroundColor: "#000052", color: "#fff", padding: "5px",float:"right" , width:"30%"}}
                  variant="contained"  type="submit">
                  {language.SignUp}
                </Button>
                </div>
                
            </form>


          </div>

        </div>

      </div>
    </div>
  );
};










