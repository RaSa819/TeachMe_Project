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
import NavBar from '../../components/topBar/navBar';

export default () => {
    return (
    <div className={classes.main}>
      <NavBar />
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
        profile: {}
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

    return (
      <div style={{ marginTop: 50 }}>
          {(tutor.found) && <TutorCard tutor={tutor}/> } 
          {(!tutor.found) && <p>Tutor Not Found!</p>}       
      </div>
    );
  }

  const TutorCard = (props) => {
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
                <StarIcon sx={{ color: '#f5de2f' }} /><StarIcon sx={{ color: '#f5de2f' }} />
                <StarIcon sx={{ color: '#f5de2f' }} /><StarIcon sx={{ color: '#f5de2f' }} /><StarBorderIcon sx={{ color: '#f5de2f' }} />
                {/* <img src={tutor.img} style={{ width: 20, marginLeft: 20 }}></img> */}
                <p style={{ display: "inline-block", marginLeft: 10 }}>{countryName}</p>
                <Divider sx={{ width: 300 }} />
                <p>Joined on {new Date(tutor.date).toLocaleString()}</p>
                <Divider sx={{ width: 300 }} />
                <p>Email: {tutor.email}</p> 
                <Divider sx={{ width: 300 }} />
                <p style={{ fontSize: 12 }}><b>About: </b>{tutor.profile.about} </p>
                <Divider sx={{ width: 300 }} />
                <p style={{ fontSize: 12 }}><b>Certification: </b>{tutor.profile.certifications} </p>
                <Divider sx={{ width: 300 }} />
                <p style={{ fontSize: 12 }}><b>Work Experience: </b>{tutor.profile.experience} </p>
          </div>
      )
  }