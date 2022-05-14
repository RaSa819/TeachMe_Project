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
              <ViewStudent />
          </div>
        </div>

      </Paper>
    </div> 
    )
}

function ViewStudent() {
    let { id } = useParams();
    const [student, setStudent] = useState({
        name: {},
        address: {},
        profile: {}
    })
    const fetchData = async () => {
        const axio1 = axios.get(`http://localhost:4000/user/getUserStudent/${id}`)
        await axios.all([axio1]).then(axios.spread((res1) => {
            setStudent(res1.data);
        })).catch((error) => {
            alert(JSON.stringify(error, null, 0))
        })
    }
    React.useEffect(() => {
        fetchData()
    }, [])

    return (
      <div style={{ marginTop: 50 }}>
          {(student.found) && <StudentCard student={student}/> } 
          {(!student.found) && <p>Student Not Found!</p>}       
      </div>
    );
  }

  const StudentCard = (props) => {
      const { student } = props;
      let countryName = ''
      if (student.address.country) {
          let country = countries.find(v => v.code === student.address.country);
          if (country) {
              countryName = country.label
          }
      }
      return (
          <div>
              <h4>{student.name.firstName + ' '} {student.name.middleName} {student.name.lastName}</h4>
                <StarIcon sx={{ color: '#f5de2f' }} /><StarIcon sx={{ color: '#f5de2f' }} />
                <StarIcon sx={{ color: '#f5de2f' }} /><StarIcon sx={{ color: '#f5de2f' }} /><StarBorderIcon sx={{ color: '#f5de2f' }} />
                {/* <img src={tutor.img} style={{ width: 20, marginLeft: 20 }}></img> */}
                <p style={{ display: "inline-block", marginLeft: 10 }}>{countryName}</p>
                <Divider sx={{ width: 300 }} />
                <p>Joined on {new Date(student.date).toLocaleString()}</p> 
                <Divider sx={{ width: 300 }} />
          </div>
      )
  }