import React from "react";
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import img from '../../assets/flag.png';
import classes from '../StudentDashboard.module.css';
import { countries } from '../../general/datas';

export default function Profile() {
  let student = JSON.parse(localStorage.getItem('userDetail')) || {};
  let countryName = ''
  if (student.address.country) {
      let country = countries.find(v => v.code === student.address.country);
      if (country) {
          countryName = country.label
      }
  }
  return (
    <div className={classes.profileDiv} >
      <h4>{student.name.firstName + ' '} {student.name.middleName} {student.name.lastName}</h4>
      <Rating name="read-only" value= {student.rate} readOnly />
      <div>
      <img src={img} style={{ display: "inline-block", width: 20}} alt='student-avatar'></img>
      <p style={{ display: "inline-block", marginLeft: 10 }}>{countryName}</p>
      </div>
      <Divider sx={{ width: "50%" }} />
      <p>Joined on {new Date(student.date).toLocaleString()}</p>
      <Divider sx={{ width: 300 }} />
    </div>
  );
}
  
 

  
  
  
  
  


  
  
  
  
  
  
