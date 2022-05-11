import React from "react";
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import img from '../../assets/flag.png';
import classes from '../StudentDashboard.module.css';

export default function Profile({name,country,stars,joinedDate}) {

    return (
      <div className={classes.profileDiv} >
        <h4>{name}</h4>
        <Rating name="read-only" value= {stars} readOnly />
        <div>
        <img src={img} style={{ display: "inline-block", width: 20}}></img>
        <p style={{ display: "inline-block", marginLeft: 10 }}>{country}</p>
        </div>
        <Divider sx={{ width: "50%" }} />
        <p>joined {joinedDate}</p>
  
  
      </div>
    );
  }
  
 

  
  
  
  
  


  
  
  
  
  
  
