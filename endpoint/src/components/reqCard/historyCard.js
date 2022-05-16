import React, { useContext } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import classes from "./reqCard.module.css"
import Divider from '@mui/material/Divider';
import { SocketContext } from "../../Socket";
import { useDialog } from 'react-mui-dialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ViewRequest from './viewRequest';

export default (props) => {
  const { openDialog } = useDialog();
  const { title, id, enable, fetchData } = props;
  const data = props.data ? props.data : null
  const socket = useContext(SocketContext)
  let push = async (status) => {

    localStorage.setItem('sessionID', id)
    socket.emit('editRequestStatus', {
      id: id,
      status: status
    });
    if (fetchData) {
      await fetchData()
    }

    }; 
    const [showRequest, setShowRequest] = React.useState(false);
  
    const openAddUser = () => {
      setShowRequest(true);
    };

    const closeRequest = () => {
        setShowRequest(false);
    }
  // console.log('type:::', type)
  const type = localStorage.getItem('type')
  return (

    <div className={classes.cardDiv}>
      <div style={{ padding: "25px 40px" }}>
        
        <h2 style={{fontWeight:"bold",fontSize:"16px", width:"auto",display:"inline-block"}}>{title}</h2>


       
         
            <Button className={classes.cardButton}
              sx={{ color: '#f1f0f0', background: 'darkblue',float:"right",padding:"3px 15px" }}> 
              View Details </Button>
  
     

      </div>
      <Dialog open={showRequest} onClose={closeRequest}>
        <DialogContent>
          <ViewRequest data={data}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeRequest}
                className={classes.closeButton}>
                Close</Button>    
        </DialogActions>
      </Dialog>
    </div>
  );
}
