import React from "react";
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import img from '../../assets/flag.png';

export default function Profile({name,country,stars,joinedDate}) {

    return (
      <div style={{ marginTop: 50, marginLeft: 50 }}>
        <h4>{name}</h4>
        <Rating name="read-only" value= {stars} readOnly />
        <img src={img} style={{ width: 20, marginLeft: 20 }}></img>
        <p style={{ display: "inline-block", marginLeft: 10 }}>{country}</p>
        <Divider sx={{ width: 300 }} />
        <p>joined {joinedDate}</p>
  
  
      </div>
    );
  }
  
 

  
  
  
  
  


  
  
  
  
  
  
