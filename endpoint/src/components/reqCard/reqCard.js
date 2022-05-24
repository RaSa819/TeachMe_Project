import React, { useContext } from "react";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import classes from "./reqCard.module.css"
import Divider from '@mui/material/Divider';
import { SocketContext } from "../../Socket";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ViewRequest from './viewRequest';
import { LanguageContext } from '../../App';

export default (props) => {
  const language = React.useContext(LanguageContext);
  const { title, name, rate, id, enable, fetchData } = props;
  const data = props.data ? props.data : null
  const socket = useContext(SocketContext)
  let push = async (status) => {

    localStorage.setItem('sessionID', id)
    socket.emit('editRequestStatus', {
      id: id,
      status: status,
      randomID: data && data.randomID ? data.randomID : null
    });
    if (fetchData) {
      await fetchData()
    }
    }; 
    const [showRequest, setShowRequest] = React.useState(false);
  
    const openRequest = () => {
      setShowRequest(true);
    };

    const closeRequest = () => {
        setShowRequest(false);
    }
  return (

    <div className={classes.cardDiv}>
      <div style={{ padding: 10 }}>

        <div style={{ width: '90%',marginBottom:"10px" }}>
          <span style={{fontSize:"14px",marginRight:"10px"}}>{name}</span>
          <Rating  name="read-only" value={rate ? rate : 0}  precision={0.25} readOnly />
        </div>
        <Divider light sx={{width:"40%",marginBottom:"10px"}} />
        <span style={{fontWeight:"bold",fontSize:"14px"}}>{title}</span>
        <div style={{ textAlign: "right" }}>
          {
            enable === true &&
            <Button className={classes.cardButton}
              sx={{ color: '#f1f0f0', background: 'darkblue' }}
              onClick={openRequest}> 
             {language.View}</Button>
          }
          {
            enable === true &&
            <Button className={classes.cardButton}
              sx={{ color: 'darkblue', background: '#f1f0f0' }}
              onClick={() => {
                push(1)
              }} >{language.Accept}</Button>
          }
          <Button className={classes.cardButton}
            sx={{ color: '#f1f0f0', background: '#D90429' }}
            onClick={() => {
                push(0)
              }}>{language.Decline}</Button>
        </div>
      </div>
      <Dialog open={showRequest} onClose={closeRequest}>
        <DialogContent>
          <ViewRequest data={data}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeRequest}
                className={classes.closeButton}>
                {language.Close}</Button>    
        </DialogActions>
      </Dialog>
    </div>
  );
}
