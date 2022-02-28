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
                    backgroundColor: color[2]
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
                    <Typography variant="h6" noWrap component="div"
                        sx={{
                            color: color[1]
                        }}
                    >
                        Teach me
                    </Typography>
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
                        navigate('/student/Profile')
                    }}>
                        View Profile
                    </ListItem>





                    <ListItem button onClick={() => {
                        navigate('/student/EditProfile')
                    }}>
                        Edit Profile
                    </ListItem>




                    <ListItem button onClick={() => {
                        navigate('/student/FavoriteList')
                    }}>
                        Favorite Tutors List
                    </ListItem>




                    <ListItem button onClick={() => {
                        navigate('/student/History')
                    }}>
                        Previous Request History
                    </ListItem>




                    <ListItem button onClick={() => {
                        navigate('/student/Setting')
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