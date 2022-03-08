import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LoginIcon from '@mui/icons-material/Login';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import { IoLogOut } from 'react-icons/io5';

import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: color[0]
}));

export default function PersistentDrawerLeft(props) {

    const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    var type = localStorage.getItem('type')

    const settings = ['Dashboard', 'Logout'];
    const languages = ['English', 'Arabic']

    const handleOpenLanguageMenu = (event) => {
        setAnchorElLanguage(event.currentTarget)
    }
    const handleCloseLanguageMenu = (event) => {
        setAnchorElLanguage(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    let navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}

                style={{
                    backgroundColor: color[2],

                }}
            >
                <Toolbar>
                    <IconButton
                        color="error"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}

                        id='logo'
                    >
                        Teach me.
                    </Typography>
                    <Box sx={{
                        flexGrow: 1
                    }}>

                    </Box>
                    <Box>
                        <IconButton onClick={handleOpenLanguageMenu} sx={{ p: 0, marginRight: 2, color: '#D90429' }}>
                            <Typography sx={{ color: 'black' }}>English</Typography><KeyboardArrowDownIcon />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElLanguage}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElLanguage)}
                            onClose={handleCloseLanguageMenu}
                        >
                            {languages.map((language) => (
                                <MenuItem key={language} onClick={handleCloseLanguageMenu}>
                                    <Typography textAlign="center">{language}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>





                        {/* logout button */}
                        <IconButton sx={{ p: 0, marginRight: open === true ? 0 : 1, color: '#D90429' }}
                            onClick={() => {
                                localStorage.removeItem('token')
                                localStorage.removeItem('type')
                                navigate('/login')
                            }}>

                            <Typography sx={{ color: 'black' }}>Logout</Typography><LoginIcon />
                        </IconButton>
                        <Tooltip title="Options">






                            {/* user menu */}
                            <IconButton sx={{
                                p: 0
                                , display: open === true ? 'none' : 'inline'
                            }}

                                onClick={() => {
                                    setOpen(true)
                                }}>
                                <Avatar id='navavatar' alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: color[0],
                        color: 'white'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}>
                <DrawerHeader>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                        style={{
                            marginRight: 50
                        }}
                        id='logo'
                    >
                        Teach me.
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon style={{
                            color: 'white'
                        }} /> : <ChevronRightIcon />}
                    </IconButton>


                </DrawerHeader>


                <Divider component="li" style={{
                    backgroundColor: 'white',
                    height: '1px'
                }} />


                <List>
                    <ListItem button onClick={() => {
                        navigate('/user/Profile')
                    }}>
                        View Profile
                    </ListItem>





                    <ListItem button onClick={() => {
                        navigate('/user/EditProfile')
                    }}>
                        Edit Profile
                    </ListItem>

                    {
                        parseInt(type) === 0 && <ListItem button onClick={() => {
                            navigate('/student/FavoriteList')
                        }}>
                            Favorite Tutors List
                        </ListItem>
                    }




                    <ListItem button onClick={() => {
                        navigate('/user/History')
                    }}>
                        Previous Request History
                    </ListItem>



                    <ListItem button onClick={() => {
                        navigate('/user/Setting')
                    }}>
                        Security
                    </ListItem>

                </List>
            </Drawer>
            <Main open={open}>
                {props.children}
            </Main>
        </Box>
    );
}

const color = [
    "#000052",
    "#D90429",
    "#F4F4F8",
]