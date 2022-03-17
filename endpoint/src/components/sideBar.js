import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';




import { typography } from '@mui/system';

const drawerWidth = 240;

export default function ClippedDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
        <List component="nav" aria-label="Tutor Options" sx={{width:'100%' , backgroundColor:'#000052' , color:'#f2f2f2' }}>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={{
            marginTop:'20%'
}}
        >
 
          <ListItemText primary="View Profile" />
        </ListItemButton>
        <Divider sx={{borderColor:'#9FA4A6'}}/>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >

          <ListItemText primary="Edit Profile" />
        </ListItemButton>
        <Divider sx={{borderColor:'#9FA4A6'}}/>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >

          <ListItemText primary="Pending Requests" />
        </ListItemButton>
        <Divider sx={{borderColor:'#9FA4A6'}}/>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
         
           >
          <ListItemText primary="Previous Requests History" />
          
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        
        >

          <ListItemText primary="Sign out" />
        </ListItemButton>
        


      </List>  
  );
}
