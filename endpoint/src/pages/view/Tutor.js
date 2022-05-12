import React, { useState, useContext } from "react";
import {
  useParams
} from "react-router-dom";
import classes from '../StudentDashboard.module.css';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
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
import axios from 'axios'
import { countries, languageOptions } from '../../general/datas';
import { useNavigate } from "react-router-dom";

export default () => {
    let navigate = useNavigate();
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

              <Button className={classes.btn + " " + classes.top} variant="text" endIcon={<LogoutIcon />}  onClick={handleLogout}>Logout</Button>
            </ButtonGroup>
          </div>


        </Toolbar>
      </AppBar>
      <Paper elevation={0} className={classes.container + " " + classes.content}>
        <div style={{ padding: 10, height: '100%', width: '100%' }}>
          <div style={{ border: '1px solid lightgray', padding: 40, height: '100%', width: '100%', borderRadius: 10, overflowY: 'auto'}}>
              <ViewTutor />
          </div>
        </div>

      </Paper>
    </div> 
    )
}

function ViewTutor() {
    let { id } = useParams();
    const [tutor, setTutor] = useState({
        name: {},
        address: {},
        profile: {}
    })
    const fetchData = async () => {
        const axio1 = axios.get(`http://localhost:4000/user/getTutor/${id}`)
        await axios.all([axio1]).then(axios.spread((res1) => {
            setTutor(res1.data);
        })).catch((error) => {
            alert(JSON.stringify(error, null, 0))
        })
    }
    React.useEffect(() => {
        fetchData()
    }, [])

    return (
      <div style={{ marginTop: 50 }}>
          {(tutor.found) && <TutorCard tutor={tutor}/> } 
          {(!tutor.found) && <p>Tutor Not Found!</p>}       
      </div>
    );
  }

  const TutorCard = (props) => {
      const { tutor } = props;
      let countryName = ''
      if (tutor.address.country) {
          let country = countries.find(v => v.code === tutor.address.country);
          if (country) {
              countryName = country.label
          }
      }
      return (
          <div>
              <h4>{tutor.name.firstName + ' '} {tutor.name.middleName} {tutor.name.lastName}</h4>
                <StarIcon sx={{ color: '#f5de2f' }} /><StarIcon sx={{ color: '#f5de2f' }} />
                <StarIcon sx={{ color: '#f5de2f' }} /><StarIcon sx={{ color: '#f5de2f' }} /><StarBorderIcon sx={{ color: '#f5de2f' }} />
                {/* <img src={tutor.img} style={{ width: 20, marginLeft: 20 }}></img> */}
                <p style={{ display: "inline-block", marginLeft: 10 }}>{countryName}</p>
                <Divider sx={{ width: 300 }} />
                <p>Joined on {new Date(tutor.date).toLocaleString()}</p> 
                <Divider sx={{ width: 300 }} />
                <p style={{ fontSize: 12 }}><b>About: </b>{tutor.profile.about} </p>
                <Divider sx={{ width: 300 }} />
                <p style={{ fontSize: 12 }}><b>Certification: </b>{tutor.profile.certifications} </p>
                <Divider sx={{ width: 300 }} />
                <p style={{ fontSize: 12 }}><b>Work Experience: </b>{tutor.profile.experience} </p>
          </div>
      )
  }