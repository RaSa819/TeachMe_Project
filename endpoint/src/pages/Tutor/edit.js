
import React from "react";
import axios from 'axios';
import classes from "../User/tutorDashboardUpdated.module.css"
import { useDialog } from 'react-mui-dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { countries, genderDt } from '../../general/datas';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormInput from '../../components/formInput';
import { getUserData } from './profile';
import { MessageBox } from '../../components/MessageBox';

const validationSchema = yup.object({
  name: yup.
    string('Enter your name').
    required('The  name is required '),
  country: yup
    .string('Enter your country ')
    .required('The country is required'),
});

export default function Edit() {
  const { openDialog } = useDialog();

  const [userData, setUserData] = React.useState({});

  React.useEffect(async () => {
    const userData = await getUserData();
    setUserData(userData);
  }, []);


  
  const update = () => {
    let token = localStorage.getItem('token')

    const data = {
      userName: userData.userName,
      firstName: userData.firstName,
      middleName: userData.name?.middleName,
      lastName: userData.lastName,
      email: userData.email,
      address: userData.address
    }
    data.address.country = userData.country;

    axios.post('http://localhost:4000/student/updateProfile', {
      data: data,
      id: token
    }).
      then((data) => {
        console.log(data)
        MessageBox(openDialog,
          'Editing Result',
          'The Editing has been successfully',
          'Ok'
        );
      }).
      catch((error) => {
        console.log('the error ' + error)
      })
  }

  const handleFieldChange = (fieldName, ev) => {

    const newValue = ev.target.value;
    const newData = {...userData};
    newData[fieldName] = newValue;
    setUserData(newData);
  }

  return (
    <div >
      <form onSubmit={update} className="row">
        <Box component="form"
          fullWidth
          sx={{
            '& > :not(style)': { mt: 1 },
          }}
        >
          <FormInput label="First Name" hint="Write your new name" 
            onChange={(ev)=> handleFieldChange("firstName", ev)}
            value={userData.name?.firstName}/>
          <FormInput label="Last Name" hint="Write your new name" value={userData.name?.lastName}
            onChange={(ev)=> handleFieldChange("lastName", ev)}
          />
          <FormInput
            label="Country"
            hint="Select Country"
            value={userData.country}
            dropdown
            dropdownOptions={countries}
            onChange={(ev)=> handleFieldChange("country", ev)}
          />
          <FormInput label="About" hint="Write about yourself " textarea onChange />
          <FormInput label="Certificate" hint="example: University Name - degree" />
          <FormInput label="Work experience" hint="Write about your work experience" />

          <div style={{ textAlign: "center" }}>
            <Button className={classes.formButton} variant="contained" type="submit">
              Update
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
}

