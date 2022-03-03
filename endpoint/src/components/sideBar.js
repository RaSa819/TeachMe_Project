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
    <Box sx={{ display: 'flex'  }}>
       {/* <TopBar/> */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ 
          overflow: 'auto' ,
          backgroundColor:'#000052'  ,
          color:'#f4f4f8',

          paddingBottom:'100%',



          }}>
            <Box sx={{
              align:'center',
              color:'white',
              marginTop:'10%',
              marginLeft:'6%',
              fontWeight:'Bold'
            }}>
             <Typography>Tutor Options</Typography>
            </Box>

        <List component="nav" aria-label="Tutor Options">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={{
            marginTop:'40%'
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

      </List>  
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
       
      </Box>
    </Box>
  );
}
