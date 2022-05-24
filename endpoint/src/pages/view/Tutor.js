import React, { useState } from "react";
import {
  useParams
} from "react-router-dom";
import classes from '../StudentDashboard.module.css';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { countries } from '../../general/datas';
import { Language } from "@mui/icons-material";
import { LanguageContext } from '../../App';
import Rating from '@mui/material/Rating';


export default () => {
    const language = React.useContext(LanguageContext);
    return (
    <div className={classes.main}>
      <Paper elevation={0} className={classes.container + " " + classes.content}>
        <div style={{ padding: 10, height: '100%', width: '100%' }}>
          <div style={{ border: '1px solid lightgray', padding: 40, height: '100%', width: '100%', borderRadius: 10, overflowY: 'auto'}}>
              <ViewTutor />
          </div>
        </div>

      </Paper>
    </div> 
    )
}

function ViewTutor() {
    let { id } = useParams();
    const [tutor, setTutor] = useState({
        name: {},
        address: {},
        profile: {},
        rate: 0
    })
    const fetchData = async () => {
        const axio1 = axios.get(`http://localhost:4000/user/getTutor/${id}`)
        await axios.all([axio1]).then(axios.spread((res1) => {
            setTutor(res1.data);
        })).catch((error) => {
            alert(JSON.stringify(error, null, 0))
        })
    }
    React.useEffect(() => {
        fetchData()
    }, [])
    const language = React.useContext(LanguageContext);

    return (
      <div style={{ marginTop: 50 }}>
          {(tutor.found) && <TutorCard tutor={tutor}/> } 
          {(!tutor.found) && <p>{Language.TutorNotFound}</p>}       
      </div>
    );
  }

  const TutorCard = (props) => {
    const language = React.useContext(LanguageContext);
      const { tutor } = props;
      let countryName = ''
      if (tutor.address.country) {
          let country = countries.find(v => v.code === tutor.address.country);
          if (country) {
              countryName = country.label
          }
      }
      return (
          <div>
              <h4>{tutor.name.firstName + ' '} {tutor.name.middleName} {tutor.name.lastName}</h4>
              <Rating name="read-only" value={tutor.rate ? tutor.rate : 0} precision={0.5} readOnly />

                <p style={{ display: "inline-block", marginLeft: 10 }}>{countryName}</p>
                <Divider sx={{ width: 300 }} />
                <p>{language.Joined} :  {tutor.date?.split('T')?.[0]}</p>
                <Divider sx={{ width: 300 }} />
                <p>{language.Email} : {tutor.email}</p> 
                <Divider sx={{ width: 300 }} />
                <p >{language.About} : {tutor.profile.about} </p>
                <Divider sx={{ width: 300 }} />
                <p >{language.Certificate} : {tutor.profile.certifications} </p>
                <Divider sx={{ width: 300 }} />
                <p >{language.Experience} : {tutor.profile.experience} </p>
          </div>
      )
  }