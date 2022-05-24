import React from "react";
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import classes from '../User/tutorDashboardUpdated.module.css';
import axios from 'axios';
import { countries } from '../../general/datas';
import PublicIcon from '@mui/icons-material/Public';
import { Language } from "@mui/icons-material";
import { LanguageContext } from '../../App';

export default function Profile() {
  const language = React.useContext(LanguageContext);
  // const [img, setImg] = React.useState('');
  const [userData, setUserData] = React.useState({name: {}, address: {}, profile: {}, rate: 0});

  const fetchData = async () => {
    const axio1 = axios.get(`http://localhost:4000/user/getTutor/${localStorage.getItem('token')}`)
    await axios.all([axio1]).then(axios.spread((res1) => {
      setUserData(res1.data);
      // localStorage.removeItem('userDetail')
      // localStorage.setItem('userDetail', JSON.stringify(res1.data))
    })).catch((error) => {
        alert(JSON.stringify(error, null, 0))
    })
  }
  React.useEffect(() => {
    fetchData()
  }, [])

  let countryName = ''
  if (userData.address?.country) {
      let country = countries.find(v => v.code === userData.address.country);
      if (country) {
          countryName = country.label
      }
  }

  return (
    <div className={classes.profileDiv} >
      <h4>{userData.name.firstName + ' '} {userData.name.middleName} {userData.name.lastName}</h4>
      <Rating name="read-only" value={userData.rate || 3} precision={0.5} readOnly />
      <div>
        <PublicIcon />
        {/* <img src={img} style={{ display: "inline-block", width: 20 }}></img> */}
        <p style={{ display: "inline-block", marginLeft: 10 }}>{countryName}</p>
      </div>
      <Divider sx={{ width: "50%" }} />
      <p> {language.Joined} : {userData.date?.split('T')?.[0]}</p>
      <h6 className={classes.details}>{language.Email} : <span style={{ fontSize: '14px' }}>{userData.email || ''}</span></h6>
      <h6 className={classes.details}>{language.About} : <span style={{ fontSize: '14px' }}>{userData.profile?.about || ''}</span></h6>
      <h6 className={classes.details}>{language.Certificate} : <span style={{ fontSize: '14px' }}>{userData.profile?.certifications || ''}</span></h6>
      <h6 className={classes.details}>{language.Experience} : <span style={{ fontSize: '14px' }}>{userData.profile?.experience || ''}</span></h6>

    </div>
  );
}



export async function getUserData() {
  let token = localStorage.getItem('token');

  const axi1 = axios.get('http://localhost:4000/fetch', {
    responseType: 'blob',
    id: token
  });

  const axi2 = axios.get('http://localhost:4000/student/profile', {
    params: {
      id: token
    }
  })

  const waitForAllAndReturnResult = () => {

    return new Promise((resolve, reject)=>{
      axios.all([axi1, axi2]).then(axios.spread((res1, res2) => {

        var imgUrl = URL.createObjectURL(res1.data);
        // setImg(imgUrl)
        const dateOnly = res2?.data?.date?.split('T')[0];
        const countryCode = res2.data.address.country;
        const countryName = countries.find(x => x.code === countryCode)?.label;
    
    
        resolve({
          date: dateOnly,
          name: res2?.data?.name,
          country: countryName,
          firstName: res2?.data?.name?.firstName,
          lastName: res2?.data?.name?.lastName,
          fullName: res2?.data?.name?.firstName + " " + res2?.data?.name?.lastName,
          email: res2?.data?.email,
          address: res2?.data?.address,
          userName: res2?.data?.userName
        });
      })).catch((error) => {
        console.log('the error is' + error)
        reject(error);
      });
    });
  }

  return await waitForAllAndReturnResult();
}














