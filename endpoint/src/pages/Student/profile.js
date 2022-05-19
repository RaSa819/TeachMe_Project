import React from "react";
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import classes from '../StudentDashboard.module.css';
import { countries } from '../../general/datas';
import PublicIcon from '@mui/icons-material/Public';
import { LanguageContext } from '../../App';

export default function Profile() {
  const language = React.useContext(LanguageContext);
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
     <PublicIcon/>
      <p style={{ display: "inline-block", marginLeft: 10 }}>{countryName}</p>
      </div>
      <Divider sx={{ width: "50%" }} />
      <p>{language.Joined} :  {student.date?.split('T')?.[0]}</p>
      <Divider sx={{ width: 300 }} />
      <p>{language.Email} : {student.email}</p>
      <Divider sx={{ width: 300 }} />
      <p>{language.Phone}  : {student.phoneNumber}</p>
      <Divider sx={{ width: 300 }} />
      <p>{language.Address} : {student.address?.street} - {student.address?.city}</p>
      <Divider sx={{ width: 300 }} />
    </div>
  );
}
  
 

  
  
  
  
  


  
  
  
  
  
  
