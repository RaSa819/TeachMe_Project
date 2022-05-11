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

const options = ['العربية', 'English'];

export default function StudentDashboard(props) {

  const [pageSelected, setPageSelected] = React.useState("Profile");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
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
                  <Button className={classes.btn + " " + classes.top} onClick={handleClick}>{options[selectedIndex]}</Button>
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
                            {options.map((option, index) => (
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

              <Button className={classes.btn + " " + classes.top} variant="text" endIcon={<LogoutIcon />} >Logout</Button>
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
      if (error) {
        MessageBox(openDialog, 'Errors ', "There is some error in the form", 'Okay');
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

  console.log('favoriteList:::', favoriteList)

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

        <p style={{ fontSize: 12, color: 'grey' }}>Joined at {dateJoined}</p>
        <p style={{ fontSize: 12 }}>{about.slice(0, 150)} <a href="">Learn more</a> </p>
        <div style={{ textAlign: 'right' }}>
          <Button sx={{ fontSize: 8, color: 'darkblue', background: '#f1f0f0', marginRight: '5px' }}>View profile</Button>
          <Button sx={{ fontSize: 8, color: '#f1f0f0', background: 'darkblue' }} 
            onClick={() => {
              RequestDialog(openDialog, id, type, 'Just moment, to be your request ready', socket)
            }}>Make request</Button>
        </div>
      </div>
    </div>


  );
}

const genderDt = [
  1,
  0
]

const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242',
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809',
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691',
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246',
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98',
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856',
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373',
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590',
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970',
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239',
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963',
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262',
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868',
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan, Province of China',
    phone: '886',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];