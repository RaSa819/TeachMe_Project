import React, { useState, useContext } from "react";
import classes from './StudentDashboard.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import EditIcon from '@mui/icons-material/Edit';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HistoryIcon from '@mui/icons-material/History';
import TextField from '@mui/material/TextField';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import img from '../assets/flag.png';
import Autocomplete from '@mui/material/Autocomplete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDialog } from 'react-mui-dialog';
import axios from 'axios'
import { SocketContext } from '../Socket';
import RequestDialog from '../components/RequestDialog';
import { MdFavorite } from "react-icons/md";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { MessageBox } from '../components/MessageBox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { countries, genderDt, languageOptions } from '../general/datas';
import { useNavigate } from "react-router-dom";

export default function StudentDashboard(props) {

  let navigate = useNavigate();

  const [pageSelected, setPageSelected] = React.useState("Profile");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${languageOptions[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('type')
    localStorage.removeItem('userDetail')
    navigate('/login')
  }

  return (
    <div className={classes.main}>
      <AppBar position="static" sx={{ background: 'white', textAlign: 'left', color: '#D90429', display: 'block' }}>
        <Toolbar variant="dense" sx={{ padding: 0 }}>

          <Typography sx={{ fontWeight: 'bold' }} variant="h6" color="inherit" component="div">
            Teach me.
          </Typography>

          <div style={{ width: 'calc(100% - 109px)', textAlign: 'right' }}>

            <ButtonGroup>


              <React.Fragment>
                <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
                  <Button className={classes.btn + " " + classes.top} onClick={handleClick}>{languageOptions[selectedIndex]}</Button>
                  <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    className={classes.btn + " " + classes.arrow}

                  >
                    <KeyboardArrowDownIcon />
                  </Button>
                </ButtonGroup>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom' ? 'center top' : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id="split-button-menu" autoFocusItem>
                            {languageOptions.map((option, index) => (
                              <MenuItem
                                key={option}
                                disabled={index === 2}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </React.Fragment>

              <Button className={classes.btn + " " + classes.top} variant="text" endIcon={<LogoutIcon />} onClick={handleLogout}>Logout</Button>
            </ButtonGroup>
          </div>


        </Toolbar>
      </AppBar>
      <h3 className={classes.header}>Student Dashboard</h3>
      <Paper className={classes.container + " " + classes.sidebar} elevation={0} >
        <Button className={classes.btn + " " + classes.sidebarBtn + " " + ((pageSelected === 'Profile') ? classes.active : "")}
          onClick={() => setPageSelected("Profile")}
          variant="text" startIcon={<VisibilityIcon />} >View Profile</Button>
        <Divider light />
        <Button className={classes.btn + " " + classes.sidebarBtn + " " + ((pageSelected === 'Edit') ? classes.active : "")} onClick={() => setPageSelected("Edit")}
          variant="text" startIcon={<EditIcon />} >Edit Profile</Button>
        <Divider light />
        <Button className={classes.btn + " " + classes.sidebarBtn + " " + ((pageSelected === 'Tutors') ? classes.active : "")} onClick={() => setPageSelected("Tutors")}
          variant="text" startIcon={<SummarizeIcon />} >Favorite Tutors List</Button>
        <Divider light />
        <Button className={classes.btn + " " + classes.sidebarBtn + " " + ((pageSelected === 'History') ? classes.active : "")} onClick={() => setPageSelected("History")}
          variant="text" startIcon={<HistoryIcon />} >Previous Request History </Button>

      </Paper>

      <Paper elevation={0} className={classes.container + " " + classes.content}>
        <div style={{ padding: 10, height: '100%', width: '100%' }}>
          <div style={{ border: '1px solid lightgray', padding: 40, height: '100%', width: '100%', borderRadius: 10, overflowY: 'auto'}}>
            {(pageSelected === "Profile") && <Profile />}
            {(pageSelected === "Edit") && <Edit />}
            {(pageSelected === "Tutors") && <Tutors />}

          </div>
        </div>

      </Paper>
    </div>


  );
}

function Profile() {
  return (
    <div style={{ marginTop: 50, marginLeft: 50 }}>
      <h4>Student Name</h4>
      <StarIcon sx={{ color: '#f5de2f' }} /><StarIcon sx={{ color: '#f5de2f' }} />
      <StarIcon sx={{ color: '#f5de2f' }} /><StarIcon sx={{ color: '#f5de2f' }} /><StarBorderIcon sx={{ color: '#f5de2f' }} />
      <img src={img} style={{ width: 20, marginLeft: 20 }}></img><p style={{ display: "inline-block", marginLeft: 10 }}>Saudi Arabia</p>
      <Divider sx={{ width: 300 }} />
      <p>joined 20 May 2022</p>


    </div>
  );
}

const validationSchema = yup.object({
  firstName: yup.
    string('Enter your first name').
    required('The first name is required '),
  middleName: yup.
    string('Enter your middle name').
    required('The middle name is required '),
  lastName: yup.
    string('Enter your last name').
    required('The last name is required '),
  newPassword: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length'),
  confirmPassword: yup
    .string('Enter your password')
    .oneOf([yup.ref('newPassword'), null], 'password must match'),
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
    .required('The gender is required')
});

function Edit() {
  const { openDialog } = useDialog()
  let userDetail = JSON.parse(localStorage.getItem('userDetail'))
  console.log('userDetail::', userDetail)
  const formik = useFormik({
    initialValues: {
      firstName: userDetail.name.firstName,
      middleName: userDetail.name.middleName,
      lastName: userDetail.name.lastName,
      newPassword: '',
      confirmPassword: '',
      country: userDetail.address.country ? userDetail.address.country : '',
      city: userDetail.address.city,
      street: userDetail.address.street,
      ZIP: userDetail.address.ZIP,
      gender: userDetail.gender,
      phoneNumber: userDetail.phoneNumber
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('error:::', error)
      if (values.newPassword !== "" && values.confirmPassword === "") {
        alert( "Please enter Confirm Password.")
      } else if (error) {
        // MessageBox(openDialog, 'Errors ', "There is some error in the form", 'Okay');
        alert( "There is some error in the form")
      } else {
        values.type = localStorage.getItem('type')
        values.id = localStorage.getItem('token')
        axios.post('http://localhost:4000/user/updateProfile', {
          data: values
        }).
          then((response) => {
            localStorage.setItem('userDetail', JSON.stringify(response.data.data))
            alert(response.data.msg)
          }).catch((error) => {
            alert(JSON.stringify(error, null, 2))
          })
      }
    },
  });

  const [error, setError] = React.useState(false)

  return (
    <div style={{ marginTop: 50, marginLeft: 50 }}>
      <form onSubmit={formik.handleSubmit} className="row">
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
                '& > :not(style)': { mt: 1 },
              }}
            >
              <TextField label="New Password" variant='filled' size='small'
                name="newPassword"
                fullWidth
                style={{
                  width: '47%',
                  marginRight: '3%'
                }}
                type="password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
              />
              <TextField label="Confirm Password" variant='filled' size='small'
                name="confirmPassword"
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
            </Box>


            {/* <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 },
              }}>
              <TextField label="Confirm Password" variant='filled' size='small'
                name="confirmPassword"
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
            </Box> */}

            <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 }
              }}
              autoComplete="off">
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
                '& > :not(style)': { mt: 1 },
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

            <Button  style={{backgroundColor:"#000052" , color:"#fff" , padding:"5px"}} variant="contained" fullWidth type="submit">
              Update
            </Button>
      </form>
    </div>
  );
}

function Tutors() {
  const socket = useContext(SocketContext)
  const { openDialog } = useDialog();
  let user_id = localStorage.getItem('token')
  const [tutors, setTutor] = useState([])
  const [favoriteList, setFavoriteList] = useState([])
  const fetchData = async () => {
      const axio1 = axios.get(`http://localhost:4000/student/fetchFavoriteList/${user_id}`)
      const axio2 = axios.get(`http://localhost:4000/user/fetchTutors`)
      await axios.all([axio1, axio2]).then(axios.spread((res1, res2) => {
        setTutor(res2.data)
        let arr = Array();
        res1.data.favorit_list.map((item) => {
            let m = item.toString();
            arr.push(m)
        })
        setFavoriteList(arr);
      })).catch((error) => {
        alert(JSON.stringify(error, null, 0))
      })
  }
  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{textAlign: 'center'}}>
      {
        tutors.map((item) => {
          let flag = 0;
          let val = favoriteList.indexOf(item._id)
          if (val>=0) {
            let flag = 1
            return (
              <TutorCard
                  name={
                      item.name
                  }
                  dateJoined={
                      item.date
                  }
  
                  about={
                      item.profile.about
                  }
                  experience={
                      item.profile.experience
                  }
                  status={
                      item.status
                  }
  
                  type={item.type}
  
                  id={item._id}
  
                  openDialog={openDialog}
  
                  socket={socket}
  
                  isFavorite={flag}
              />
            )
          }
        })
      }    
    </div>
  );
}
const styleUnFavorite = { color: 'gray', display: 'inline-block', fontSize: 20 }

const styleFavorite = { color: 'red', display: 'inline-block', fontSize: 20 }

const TutorCard = (props) => {
  const { name, dateJoined, about, experience,
    rate, type, id, openDialog, socket, isFavorite } = props;
  const [favorite, setFavorite] = useState()
  if(isFavorite)
    console.log(isFavorite)

  React.useEffect(()=>{
    setFavorite(isFavorite)
  },[isFavorite])

  let pushFavorite = () => {
    if (!favorite) {
      socket.emit('addFavorite', {
          tutor_id: id,
          id: localStorage.getItem('token')
      })
    }
    else {
      socket.emit('removeFavorite', {
          tutor_id: id,
          id: localStorage.getItem('token')
      })
    }
  }
  
  const [status, setStatus] = useState(props.status)

  return (

    <div style={{ textAlign: 'left', border: '1px solid lightgray', borderRadius: 10, margin: 5, width: '40%', display: 'inline-block'}}>
      <div style={{ padding: 10 }}>
        <h6 style={{ display: 'inline-block', width: '90%' }}>{name.firstName + ' '} {name.lastName}</h6>
        <MdFavorite style={favorite == 1 ? styleFavorite : styleUnFavorite}
          onClick={() => {
            setFavorite(!favorite)
            pushFavorite()
          }}
        />
        <div>
          <StarIcon sx={{ color: '#ffc700' }} /><StarIcon sx={{ color: '#ffc700' }} />
          <StarIcon sx={{ color: '#ffc700' }} /><StarIcon sx={{ color: '#ffc700' }} />
          <StarBorderIcon sx={{ color: '#ffc700' }} />
          {/* <span style={{ marginLeft: 15, fontSize: 12 }}>Country Name</span> */}
        </div>

        <p style={{ fontSize: 12, color: 'grey' }}>Joined at {new Date(dateJoined).toLocaleString()}</p>
        <p style={{ fontSize: 12 }}>{about.slice(0, 150)} <a href={`/view/tutor/${id}`} target="_blank">Learn more</a> </p>
        <div style={{ textAlign: 'right' }}>
          <Button sx={{ fontSize: 8, color: 'darkblue', background: '#f1f0f0', marginRight: '5px' }}><a href={`/view/tutor/${id}`} target="_blank">View profile</a></Button>
          <Button sx={{ fontSize: 8, color: '#f1f0f0', background: 'darkblue' }} 
            onClick={() => {
              RequestDialog(openDialog, id, type, 'Just moment, to be your request ready', socket)
            }}>Make request</Button>
        </div>
      </div>
    </div>


  );
}