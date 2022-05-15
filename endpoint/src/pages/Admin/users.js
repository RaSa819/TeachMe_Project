import React from "react";
import UserCard from "./userCard";
import Button from '@mui/material/Button';
import classes from '../StudentDashboard.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDialog } from 'react-mui-dialog';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import TutorDialog from '../../components/TutorDialog'
import Autocomplete from '@mui/material/Autocomplete';
import { countries, genderDt, typeDt, certifications, CardType } from '../../general/datas';
import dtClouser from '../../DataClouse';
import { MessageBox } from '../../components/MessageBox';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import {
    FormControl,
    FormLabel,
} from "@material-ui/core";

const validationSchema = yup.object({
    userName: yup
    .string('Enter your username')
    .required('username is required')
    .min(8, 'The minimum is 8 characters '),
  email: yup
    .string('Enter your email')
    .email("it's not Email Format")
    .required('Your Email is Required'),
    firstName: yup.
      string('Enter your first name').
      required('The first name is required '),
    middleName: yup.
      string('Enter your middle name').
      required('The middle name is required '),
    lastName: yup.
      string('Enter your last name').
      required('The last name is required '),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length'),
    confirmPassword: yup
      .string('Enter your password')
      .oneOf([yup.ref('password'), null], 'password must match'),
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
      .required('The type is required'),
    dept: yup.string().when('type', {
        is: 1,//just an e.g. you can return a function
        then: yup.string().required('the dept option is required'),
        otherwise: yup.string()
    }),
    about: yup.string().when('type', {
        is: 1,//just an e.g. you can return a function
        then: yup.string().required('You must talk about your self'),
        otherwise: yup.string()
    }),
    certifications: yup.string().when('type', {
        is: 1,//just an e.g. you can return a function
        then: yup.string().required('you must input your last certification'),
        otherwise: yup.string()
    }),
    experience: yup.string().when('type', {
        is: 1,//just an e.g. you can return a function
        then: yup.string().required('You must talk about your experiences'),
        otherwise: yup.string()
    }),
    cardType: yup.string().when('type', {
        is: 1,//just an e.g. you can return a function
        then: yup.string().required('You must choose your card type'),
        otherwise: yup.string()
    }),
    cardID: yup.string().when('type', {
        is: 1,//just an e.g. you can return a function
        then: yup.string().required('You must choose your card ID'),
        otherwise: yup.string()
    })
  });

export default function Users() {
    const [rows, setRowData] = React.useState([])
    let navigate = useNavigate();
    const dt = dtClouser();

    const [isTutor, setTutor] = React.useState(false)
    const [departments, setDepartment] = React.useState([])
    const { openDialog } = useDialog()
    const fetchUser = async () => {
        await axios.get('http://localhost:4000/fetchUser').
        //represnt data to state 
        then((res) => {
            setRowData(res.data)
        }).
        catch((err) => {
          console.log('there is error is' + err)
        })
    }
    React.useEffect(() => {
        fetchUser();
    }, [])

    const [addUser, setAddUser] = React.useState(false);

    const openAddUser = (data) => {
        axios.get('http://localhost:4000/fetchDept').
            then((res) => {
              setDepartment(res.data)
            }).
            catch((err) => {
              console.log('there is error is' + err)
            })
        if (data && data.user_id) {
            formik.values._id = data.user_id
            formik.values.userName = data.userName
            formik.values.email = data.email
            formik.values.firstName = data.name?.firstName
            formik.values.middleName = data.name?.middleName
            formik.values.lastName = data.name?.lastName
            formik.values.password = ''
            formik.values.confirmPassword = ''
            formik.values.country = data.address?.country ? data.address.country : ''
            formik.values.city = data.address?.city
            formik.values.street = data.address?.street
            formik.values.ZIP = data.address?.ZIP
            formik.values.gender = data.gender
            formik.values.type = data.type
            formik.values.phoneNumber = data.phoneNumber
            formik.values.dept = data.dept_id
            formik.values.about = data.profile?.about
            formik.values.certifications = data.profile?.certifications
            formik.values.experience = data.profile?.experience
            formik.values.cardType = data.cardInfo?.cardType
            formik.values.cardID = data.cardInfo?.cardID
            if (data.type === 1) {
                setTutor(true)
            } else {
                setTutor(false)
            }
        } else {
            formik.values._id = null
            formik.values.userName = ''
            formik.values.email = ''
            formik.values.firstName = ''
            formik.values.middleName = ''
            formik.values.lastName = ''
            formik.values.password = ''
            formik.values.confirmPassword =''
            formik.values.country =''
            formik.values.city = ''
            formik.values.street = ''
            formik.values.ZIP = ''
            formik.values.gender = ''
            formik.values.type = ''
            formik.values.phoneNumber = ''
            formik.values.dept = ''
            formik.values.about = ''
            formik.values.certifications = ''
            formik.values.experience = ''
            formik.values.cardType = ''
            formik.values.cardID = ''
        }
        setAddUser(true);
    };

    const closeAddUser = () => {
        setAddUser(false);
    };

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

    const formik = useFormik({
        initialValues: {
            _id: null,
            userName: '',
            email: '',
            firstName: '',
            middleName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            country: '',
            city: '',
            street: '',
            ZIP: '',
            gender: '',
            type: '',
            phoneNumber: '',
            dept: '',
            about: '',
            certifications: '',
            experience: '',
            cardType: '',
            cardID: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let url = ''
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
                    phoneNumber: values.phoneNumber
                }
            }
            if(!values._id) {
                isUsernameValid(values.userName)
                url =   'http://localhost:4000/user/register'
                userData.data.password = values.password
            } else {
                url = 'http://localhost:4000/user/updateProfile'
                userData.data.id = values._id
                if (values.password) {
                    userData.data.newPassword = values.password
                }
            }
            if (error) {
                alert("you can't completely signup, there are errors")
            //   MessageBox(openDialog, 'Errors ', "you can't completely signup, there are errors", 'Okay');
            } else {
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
                axios.post(url, userData).
                then(async (response) => {
                    await fetchUser()
                    closeAddUser()
                }).catch((error) => {
                  alert(JSON.stringify(error, null, 2))
                })
            }
          },
      });

      const [error, setError] = React.useState(false)  
      const setEditDat = (data) => {
            openAddUser(data)    
        }   

    return (
        <div>
            <Button variant="contained"
                startIcon={<AddBoxIcon />}
                className={classes.addButton}
                onClick={openAddUser}
            >Add new user</Button>

            <Dialog open={addUser} onClose={closeAddUser}>
                <DialogContent>
                <Stack sx={{
                  width: '100%',
                  display: error === 11000 ? 'block' : 'none'
                }} spacing={2}>
                  <Alert severity="error" variant='filled'>The user name is already exist, type Another</Alert>
                </Stack>
                <form className="row" id="myUserform">
                    <div>
                        <TextField
                            required
                            color="error"
                            id="userName"
                            name="userName"
                            label="Username"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ marginRight: "5px" }}
                            disabled={formik.values._id}
                            value={formik.values.userName}
                            onChange={(e) => {
                              formik.handleChange(e)
                              if (!formik.values._id)
                                isUsernameValid(e.target.value)
                            }}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        />
                        <TextField
                            required
                            color="error"
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="dense"
                            disabled={formik.values._id}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            color="error"
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            sx={{ marginRight: "5px" }}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            color="error"
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                    </div>
                    <div>
                        <TextField
                            color="error"
                            id="firstName"
                            label="First name"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ width: "25%", marginRight: "10px" }}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            color="error"
                            id="middleName"
                            label="Middle name"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ width: "25%", marginRight: "10px" }}
                            value={formik.values.middleName}
                            onChange={formik.handleChange}
                            error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                            helperText={formik.touched.middleName && formik.errors.middleName}
                        />
                        <TextField
                            color="error"
                            id="lastName"
                            label="Last name"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ width: "25%" }}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            // value={formik.values.country}
                            id="country-select-demo"
                            sx={{ display: 'inline-block' }}
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
                                variant='filled' size='small'
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
                        <TextField
                            color="error"
                            id="city"
                            label="City"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </div>
                    <div>
                        <TextField color="error"
                            id="street"
                            label="Street" 
                            variant='outlined'  
                            type="text"
                            margin="dense"
                            sx={{ marginRight: "5px" }}
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={formik.touched.street && Boolean(formik.errors.street)}
                            helperText={formik.touched.street && formik.errors.street}
                        />
                        <TextField
                            color="error"
                            id="ZIP"
                            label="Zip code"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ marginRight: "5px" }}
                            value={formik.values.ZIP}
                            onChange={formik.handleChange}
                            error={formik.touched.ZIP && Boolean(formik.errors.ZIP)}
                            helperText={formik.touched.ZIP && formik.errors.ZIP}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            color="error"
                            id="phoneNumber"
                            label="Phone"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        />
                    </div>
                    <div>
                    <FormControl sx={{ width: "50%" }} 
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                        helperText={formik.touched.gender && formik.errors.gender}>
                        <FormLabel id="demo-row-radio-buttons-group-label"
                            required
                            color="error"
                        >Gender</FormLabel>
                        <RadioGroup row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value={genderDt[0]} control={<Radio color="error" />} label="Female" />
                            <FormControlLabel value={genderDt[1]} control={<Radio color="error" />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    </div>
                    <div>
                    <FormControl
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.type && formik.errors.type}
                    >
                        <FormLabel id="demo-row-radio-buttons-group-label"
                            required
                            color="error"
                        >Student or Tutor</FormLabel>
                        <RadioGroup row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="type"
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
                    </div>
                    {isTutor &&
                    <div>
                        <Autocomplete
                            // value={formik.values.country}
                            id="dept-select-demo"
                            sx={{ display: 'inline-block' }}
                            style={{
                            width: '47%',
                            marginRight: '3%'
                            }}
                            options={departments}
                            autoHighlight
                            getOptionLabel={(option) => option.name}
                            defaultValue={departments.find(v => v._id === formik.values.dept)}
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
                                variant='filled' size='small'
                                name="dept"
                                {...params}
                                label="Department"
                                inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                            )}
                        />
                        <TextField
                            required
                            color="error"
                            id="about"
                            label="About"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.about}
                            onChange={formik.handleChange}
                            error={formik.touched.about && Boolean(formik.errors.about)}
                            helperText={formik.touched.about && formik.errors.about}
                        />
                    </div>
                    }
                    {isTutor &&
                    <div>
                        <Autocomplete
                            // value={formik.values.country}
                            id="certifications"
                            sx={{ display: 'inline-block' }}
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
                                variant='filled' size='small'
                                name="certifications"
                                {...params}
                                label="Choose last certification you got"
                                inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                            )}
                        />
                        <TextField
                            required
                            color="error"
                            id="experience"
                            label="Experience"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.experience}
                            onChange={formik.handleChange}
                            error={formik.touched.experience && Boolean(formik.errors.experience)}
                            helperText={formik.touched.experience && formik.errors.experience}
                        />
                    </div>
                    }
                    {isTutor &&
                    <div>
                        <Autocomplete
                            // value={formik.values.country}
                            id="cardType-select-demo"
                            sx={{ display: 'inline-block' }}
                            style={{
                            width: '47%',
                            marginRight: '3%'
                            }}
                            options={CardType}
                            autoHighlight
                            getOptionLabel={(option) => option}
                            defaultValue={CardType.find(v => v === formik.values.cardType)}
                            renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option}
                            </Box>
                            )}
                            onChange={(e, value) => {
                            formik.values.CardType = value
                            }}
                            renderInput={(params) => (
                            <TextField
                                variant='filled' size='small'
                                name="cardType"
                                {...params}
                                label="Choose your card type"
                                inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                            )}
                        />
                        <TextField
                            required
                            color="error"
                            id="cardID"
                            label="Card ID"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            value={formik.values.cardID}
                            onChange={formik.handleChange}
                            error={formik.touched.cardID && Boolean(formik.errors.cardID)}
                            helperText={formik.touched.cardID && formik.errors.cardID}
                        />
                    </div>
                    }
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={formik.handleSubmit}
                        className={classes.addButton} form="myUserform">
                        { formik.values._id ? 'Edit User': 'Add User'}</Button>
                    <Button onClick={closeAddUser}
                        className={classes.closeButton}>
                        Close</Button>    
                </DialogActions>
            </Dialog>


            <div style={{ textAlign: 'center' }}>
            {
              rows.map((item) => {
                return (
                    <UserCard
                        fetchUser={fetchUser}
                        setEditDat={setEditDat}
                        data={item}
                        id={item.user_id}
                        name={item.name}
                        stars={item.rate}
                        type={item.type}
                        country={
                            item.address?.country
                        }

                        joinedDate={
                            item.date
                        }
                    
                        description={
                            item.profile?.about? item.profile.about: ''
                        }
                    />)
                })}
            </div>
        </div>
    );
}