
import react from 'react';
import * as React from "react"; 
import { useState } from 'react';
import { height } from "@mui/system";
import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Typography } from '@mui/material';

import "./topBar.css";



//nav scroll effect
window.addEventListener('scroll' , function(){
    const header = this.document.querySelector('header');
    header.classList.toggle('sticky' , window.scrollY>0)
})

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const languages = ['English' , 'Arabic'];
 

export default function Topnav() {
const [anchorElUser, setAnchorElUser] = useState(null);


const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <header>
            <a class="navbar-brand" href="#">
      Teach me.
    </a>
        <nav class='nav navbar-expand-md'>

  
    <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#coll'>
        <span class='navbar-toggler-icon'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#d90429" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg></span>
    </button>
    <div class='collapse navbar-collapse' id='coll'>
        <ul class='navbar-nav'>
            <li class='nav-item'>
                <a href='#' class='nav-link'>Find tutors</a>
                </li>
                <li class='nav-item'>
                <a href='#' class='nav-link'>Login</a>
                </li>
                <li class='nav-item'>
                <a href='#' class='nav-link'>Language</a>
                </li>
        </ul>
    </div>
    <ul>

      {/* user icon */}
      <li id='avatar' sx={{ flexGrow: 1 }}>
      <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user name" src="/static/images/avatar/2.jpg" />
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
                  <Typography textAlign="right">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
      </li>
    </ul>
   
    </nav>
  </header>
  )
}
