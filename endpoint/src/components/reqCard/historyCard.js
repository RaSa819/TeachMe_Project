import React, { useContext } from "react";
import Button from '@mui/material/Button';
import classes from "./reqCard.module.css"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ViewRequest from './viewRequest';

export default (props) => {
  const { title, id, status } = props;
  const data = props.data ? props.data : null
  const [showRequest, setShowRequest] = React.useState(false);
  
    const openRequest = () => {
      setShowRequest(true);
    };

    const closeRequest = () => {
        setShowRequest(false);
    }
  // console.log('type:::', type)
  let statusLabel = status===1?'Accepted':(status===2?'Waiting':'Declined')
  let statusColor = status===1?'green':(status===2?'yellow':'red')
  return (

    <div className={classes.cardDiv}>
      <div style={{ padding: "25px 40px" }}>
        <h2 style={{fontWeight:"bold",fontSize:"16px", width:"auto",display:"inline-block"}}>{title}</h2>
            <Button className={classes.cardButton}
              sx={{ color: '#f1f0f0', background: 'darkblue',float:"right",padding:"3px 15px" }}
              onClick={openRequest}> 
              View Details </Button>
      </div>
      <div style={{ paddingLeft: "40px" }}>
        <h3 style={{fontWeight:"bold",fontSize:"16px", width:"auto",display:"inline-block", color: statusColor}}>{statusLabel}</h3>
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
