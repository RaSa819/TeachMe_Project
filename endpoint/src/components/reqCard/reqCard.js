import React, { useContext } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import classes from "./reqCard.module.css"
import Divider from '@mui/material/Divider';
import { SocketContext } from "../../Socket";

export default (props) => {

  const { title, name, stars, id, enable } = props;
  const socket = useContext(SocketContext)
  let push = (status) => {

    localStorage.setItem('sessionID', id)
    socket.emit('editRequestStatus', {
      id: id,
      status: status
    });
    //     axios.post('http://localhost:4000/tutor/editRequestStatus', {
    //       id: id,
    //       status: status
    //     }).then((data) => {
    //       window.location.reload();
    //     }).catch((error) => {
    // 
    //     })
  }
  return (

    <div className={classes.cardDiv}>
      <div style={{ padding: 10 }}>

        <div style={{ width: '90%',marginBottom:"10px" }}>
          <span style={{fontSize:"14px",marginRight:"10px"}}>{name}</span>
          <Rating  name="read-only" value={stars} readOnly />
        </div>
        <Divider light sx={{width:"40%",marginBottom:"10px"}} />
        <span style={{fontWeight:"bold",fontSize:"14px"}}>{title}</span>


        <div style={{ textAlign: "right" }}>
          {
            enable === true &&
            <Button className={classes.cardButton}
              sx={{ color: '#f1f0f0', background: 'darkblue' }}
              onClick={() => {
              }} > 
              View </Button>
          }

          {
            enable === true &&
            <Button className={classes.cardButton}
              sx={{ color: 'darkblue', background: '#f1f0f0' }}
              onClick={() => {
                push(1)
              }} >Accept</Button>
          }
          <Button className={classes.cardButton}
            sx={{ color: '#f1f0f0', background: '#D90429' }}
            onClick={() => {
                push(0)
              }}>Decline</Button>
        </div>

      </div>
    </div>
  );
}
