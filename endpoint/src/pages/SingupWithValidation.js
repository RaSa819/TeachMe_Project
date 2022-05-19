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
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { countries, genderDt, typeDt, certifications, CardType } from '../general/datas';
import classes from "./signup.module.css";
import Divider from '@mui/material/Divider';
import { LanguageContext } from '../App';

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
  // street: yup
  //   .string('Enter your street ').
  //   required('The street is required'),
  ZIP: yup
    .number('Enter your ZIP code ')
    .required('The ZIP code is required'),
  phoneNumber: yup
    .number('Enter your phone number ')
    .required('The phone number is required')
    .test('len', 'Must be exactly 10 numbers', val => val.toString().length === 10),
  gender: yup
    .string('Enter your gender ')
    .required('The gender is required'),
  type: yup
    .string('Enter your type ')
    .required('The type is required'),
  dept: yup.string().when('type', {
    is: '1',//just an e.g. you can return a function
    then: yup.string().required('the dept option is required'),
    otherwise: yup.string()
  }),
  about: yup.string().when('type', {
      is: '1',//just an e.g. you can return a function
      then: yup.string().required('You must talk about your self'),
      otherwise: yup.string()
  }),
  certifications: yup.string().when('type', {
      is: '1',//just an e.g. you can return a function
      then: yup.string().required('you must input your last certification'),
      otherwise: yup.string()
  }),
  experience: yup.string().when('type', {
      is: '1',//just an e.g. you can return a function
      then: yup.string().required('You must talk about your experiences'),
      otherwise: yup.string()
  }),
  cardType: yup.string().when('type', {
      is: '1',//just an e.g. you can return a function
      then: yup.string().required('You must choose your card type'),
      otherwise: yup.string()
  }),
  cardID: yup.string().when('type', {
      is: '1',//just an e.g. you can return a function
      then: yup.string().required('You must choose your card ID'),
      otherwise: yup.string()
  })
});
export default () => {

  let navigate = useNavigate();

  const [isTutor, setTutor] = React.useState(false)

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
      type: typeDt,
      dept: '',
      about: '',
      certifications: '',
      experience: '',
      cardType: '',
      cardID: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      isUsernameValid(values.userName)
      if (error) {
        alert("you can't completely signup, there are errors")
      } else {
        var userData = {
          data: {
              userName: values.userName,
              email: values.email,
              firstName: values.firstName,
              middleName: values.middleName,
              lastName: values.lastName,
              country: values.country,
              city: values.city,
              street: values.street,
              ZIP: values.ZIP,
              gender: values.gender,
              type: values.type,
              phoneNumber: values.phoneNumber,
              password: values.password
          }
        }

        if (isTutor) {
          userData.tutorData = {
              dept: values.dept,
              about: values.about,
              certifications: values.certifications,
              experience: values.experience,
              cardType: values.cardType,
              cardID: values.cardID
          }
        }
        axios.post('http://localhost:4000/user/register', userData).
        then(async (response) => {
          localStorage.removeItem('token')
            localStorage.removeItem('type')
            localStorage.removeItem('userDetail')

            var type = values.type
            var token = response.data.token;
            localStorage.setItem('type', type);
            localStorage.setItem('token', token);
            let userDetail = response.data.data;
            userDetail.user_id = userDetail._id
            if (type == 1) {
              userDetail.cardInfo = {
                cardID: values.cardID,
                cardType: values.cardType
              }
              userDetail.dept_id = values.dept
              userDetail.profile = {
                about: values.about,
                certifications: values.certifications,
                experience: values.experience
              }
            }
            localStorage.setItem('userDetail', JSON.stringify(userDetail));
            console.log(type)
            if (type == 0) {
              // navigate('/StudentDashboard')
              navigate('/global/tutors')
            } else if (type == 1) {
              navigate('/TutorDashboard')
            } else if (type == 2) {
              navigate('/AdminDashboard')
            } else {
              navigate('/home')
            }
        }).catch((error) => {
          alert(JSON.stringify(error, null, 2))
        })
      }
    },
  });

  const [departments, setDepartment] = React.useState([])
  const fetchDepartment = () => {
      axios.get('http://localhost:4000/fetchDept').
      //represnt data to state 
      then((res) => {
        setDepartment(res.data)
      }).
      catch((err) => {
        console.log('there is error is' + err)
      })
  }
  React.useEffect(() => {
    fetchDepartment();
  }, [])


  React.useEffect(() => {
    var type = localStorage.getItem('type')
    if (type === 0) {
      // navigate('/StudentDashboard')
      navigate('/global/tutors')
    } else if (type === 1) {
        navigate('/TutorDashboard')
    } else if (type === 2) {
        navigate('/AdminDashboard')
    }

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


  const language = React.useContext(LanguageContext);

  const [error, setError] = React.useState(false)

  return (

    <div >
      <div>
        <Stack sx={{
          width: '100%',
          display: error === 11000 ? 'block' : 'none'
        }} spacing={2}>
          <Alert severity="error" >{language.UserExist}</Alert>
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
                    <FormControlLabel value={genderDt[0]} control={<Radio />} label={language.Male} />
                    <FormControlLabel value={genderDt[1]} control={<Radio />} label={language.Female}/>

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

                {isTutor &&
                  <Autocomplete
                    // value={formik.values.country}
                    id="dept-select-demo"
                    sx={{ display: 'inline-block' }}
                    className={classes.TextField}
                    style={{
                      width: '47%',
                      marginRight: '3%'
                    }}
                    options={departments}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                        {option.name}
                    </Box>
                    )}
                    onChange={(e, value) => {
                    formik.values.dept = value._id
                    }}
                    renderInput={(params) => (
                    <TextField
                        size='small'
                        name="dept"
                        {...params}
                        label={language.Department}
                        inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                    )}
                  />
                }
                {isTutor && 
                  <TextField
                    className={classes.TextField}
                    size='small'
                    name='about'
                    label={language.About}
                    style={{
                      width: '47%',
                      marginLeft: '1%'
                    }}
                    value={formik.values.about}
                    onChange={formik.handleChange}
                    error={formik.touched.about && Boolean(formik.errors.about)}
                    helperText={formik.touched.about && formik.errors.about}
                  />
                }
                {isTutor &&
                  <Autocomplete
                    // value={formik.values.country}
                    id="certifications"
                    sx={{ display: 'inline-block' }}
                    className={classes.TextField}
                    style={{
                    width: '47%',
                    marginRight: '3%'
                    }}
                    options={certifications}
                    autoHighlight
                    getOptionLabel={(option) => option}
                    defaultValue={certifications.find(v => v === formik.values.certifications)}
                    renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option}
                    </Box>
                    )}
                    onChange={(e, value) => {
                    formik.values.certifications = value
                    }}
                    renderInput={(params) => (
                    <TextField
                        size='small'
                        name="certifications"
                        {...params}
                        label={language.ChooseCertificate}
                        inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                    )}
                  />
                }
                {isTutor &&
                  <TextField
                    className={classes.TextField}
                    size='small'
                    name='experience'
                    label={language.Experience}
                    style={{
                      width: '47%',
                      marginLeft: '1%'
                    }}
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    error={formik.touched.experience && Boolean(formik.errors.experience)}
                    helperText={formik.touched.experience && formik.errors.experience}
                  />
                }
                {isTutor &&
                  <Autocomplete
                      // value={formik.values.country}
                      id="cardType-select-demo"
                      sx={{ display: 'inline-block' }}
                      className={classes.TextField}
                      style={{
                      width: '47%',
                      marginRight: '3%'
                      }}
                      options={CardType}
                      autoHighlight
                      getOptionLabel={(option) => option}
                      renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          {option}
                      </Box>
                      )}
                      onChange={(e, value) => {
                        formik.values.cardType = value
                      }}
                      renderInput={(params) => (
                      <TextField
                          size='small'
                          name="cardType"
                          {...params}
                          label={language.ChooseCard}
                          inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                      />
                      )}
                  />
                }
                {isTutor && 
                  <TextField
                    className={classes.TextField}
                    size='small'
                    name='cardID'
                    label={language.CardId}
                    style={{
                      width: '47%',
                      marginLeft: '1%'
                    }}
                    value={formik.values.cardID}
                    onChange={formik.handleChange}
                    error={formik.touched.cardID && Boolean(formik.errors.cardID)}
                    helperText={formik.touched.cardID && formik.errors.cardID}
                  />
                }
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










