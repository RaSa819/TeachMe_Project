import React, { useState, useEffect } from "react";
import classes from '../../pages/StudentDashboard.module.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
import "./topBar.css";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Languages from "../../languages.json";
import { useNavigate } from "react-router-dom";
import { genderDt, languageOptions } from '../../general/datas';
import { LanguageContext } from '../../App';


export default function NavBar({ language, setLanguage, pageName }) {
    const languagee = React.useContext(LanguageContext);
    const pages = [
        'Logout',
        <span onClick={() => updateLanguage(1)} >English</span>,
        <span onClick={() => updateLanguage(0)} >العربية</span>,
    ];
    const pagesH = [
        'Find tutors',
        'Login',
        <span onClick={() => updateLanguage(1)} >English</span>,
        <span onClick={() => updateLanguage(0)} >العربية</span>,
    ];

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const defaultLanguage = Languages.Selected === 'En' ? languageOptions[1] : languageOptions[0];
    const [selectedLanguage, setSelectedLanguage] = React.useState(defaultLanguage);
    const handleClick = () => {
        console.info(`You clicked ${languageOptions[selectedIndex]}`);

    };
    let type = localStorage.getItem('type')

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);

        updateLanguage(index);
    };

    const updateLanguage = (index) => {

        if (index === 0) {
            setLanguage(Languages.Ar);
            setSelectedLanguage(languageOptions[0]);
        }
        else if (index === 1) {
            setLanguage(Languages.En);
            setSelectedLanguage(languageOptions[1]);
        }
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


    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('type')
        localStorage.removeItem('userDetail')
        navigate('/login')
    }
    // const barStyle = pageName === 'HomePage' ? (classes.homeBar) : classes.defaultBar;


 

    React.useEffect(()=>{

        window.addEventListener('scroll', (e) => {
            const appBar = window.document.getElementsByClassName('appBar')[0];

            // if(window.scrollY > 0) alert('x');
            appBar.classList.toggle('sticky', window.scrollY > 0)
        }, true);
    });
    return (
        <div>

            {(pageName === "HomePage") &&


                <AppBar
                    className="appBar"
                    sx={{
                        background: 'none',
                        textAlign: 'left',
                        color: '#D90429',
                        position: 'fixed',
                        maxHeight: '5em',
                        boxShadow: 'none'
                        // background: 'white'
                    }}
                    position="fix"
                >
                    <Container maxWidth="xl" >
                        <Toolbar disableGutters sx={{ padding: 0 }}>
                            <a className="navbar-brand" style={{ width: '80%' }} href="#">
                                {languagee.TeachMe}
                            </a>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pagesH.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <ButtonGroup>
                                    <React.Fragment>
                                        <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
                                            <Button className={classes.btn + " " + classes.top} onClick={handleClick && handleCloseNavMenu}  >
                                                {selectedLanguage}
                                            </Button>
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
                                            className={classes.popperLi}
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

                                    <Button className={classes.btn + " " + classes.top}
                                        sx={{ width: "250px" }}
                                        variant="text">{languagee.FindTutors}</Button>

                                    <Button className={classes.btn + " " + classes.top}
                                        onClick={handleLogout} variant="text" >{languagee.Login}</Button>


                                </ButtonGroup>
                            </Box>

                        </Toolbar>
                    </Container>
                </AppBar>

            }


            {(pageName !== "HomePage") &&
                <AppBar position="static" sx={{ background: 'white', textAlign: 'left', color: '#D90429', display: 'block', maxHeight: '5em' }}>
                    <Container maxWidth="xl" >
                        <Toolbar disableGutters sx={{ padding: 0 }}>
                            <a className="navbar-brand" style={{ width: '80%', paddingTop: '0.6125rem' }} href="#">
                                {languagee.TeachMe}
                            </a>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <ButtonGroup>
                                    <React.Fragment>
                                        <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
                                            <Button className={classes.btn + " " + classes.top} onClick={handleClick && handleCloseNavMenu}  >
                                                {selectedLanguage}
                                            </Button>
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
                                    {
                                        (pageName !== "Login" && pageName !== "Signup") &&
                                        <Button className={classes.btn + " " + classes.top}
                                            onClick={handleLogout} variant="text" endIcon={<LogoutIcon />} >{languagee.Logout}</Button>

                                    }
                                </ButtonGroup>
                            </Box>

                        </Toolbar>
                    </Container>
                </AppBar>
            }




        </div>
    );
}




