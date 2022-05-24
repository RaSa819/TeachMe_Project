
import React from "react";
import axios from 'axios';
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
import { LanguageContext } from '../../App';

export default function Edit() {
  const language = React.useContext(LanguageContext);
  let userDetail = JSON.parse(localStorage.getItem('userDetail')) || {};
  const validationSchema = yup.object({
    email: yup.
      string("Enter your Email").
      email(language.NotEmailFormat).
      required(language.EmailRequired),
    firstName: yup.
      string('Enter your first name').
      required(language.FirstNRequired),
    middleName: yup.
      string('Enter your middle name').
      required(language.MiddleNRequired),
    lastName: yup.
      string('Enter your last name').
      required(language.LastNRequired),
    newPassword: yup
      .string('Enter your password')
      .min(8, language.PasswordLength),
    confirmPassword: yup
      .string('Enter your password')
      .oneOf([yup.ref('newPassword'), null], language.PasswordMatch),
    country: yup
      .string('Enter your country ')
      .required(language.CountryRequired),
    city: yup.
      string('Enter your city ').
      required(language.CityRequired),
    street: yup
      .string('Enter your street ').
      required(language.StreetRequired),
    ZIP: yup
      .number('Enter your ZIP')
      .required(language.ZIPRequired),
    phoneNumber: yup
      .string('Enter your phone number')
      .length(10, 'Must be exactly 10 numbers')
      .matches(/[0-9]+/gi, "Enter number only")
      .required(language.PhoneRequired),
    gender: yup
      .string('Enter your gender ')
      .required(language.GenderRequired)
  });

  const formik = useFormik({
    initialValues: {
      userName: userDetail.userName,
      email: userDetail.email,
      firstName: userDetail.name?.firstName,
      middleName: userDetail.name?.middleName,
      lastName: userDetail.name?.lastName,
      newPassword: '',
      confirmPassword: '',
      country: userDetail.address?.country ? userDetail.address.country : '',
      city: userDetail.address?.city,
      street: userDetail.address?.street,
      ZIP: userDetail.address?.ZIP,
      gender: userDetail.gender,
      phoneNumber: userDetail.phoneNumber[0]
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('error:::', error)
      if (values.newPassword !== "" && values.confirmPassword === "") {
        alert(language.PleaseConfirmPassword)
      } else if (error) {
        // MessageBox(openDialog, 'Errors ', "There is some error in the form", 'Okay');
        alert(language.FormError)
      } else {
        values.type = localStorage.getItem('type')
        values.id = localStorage.getItem('token')
        axios.post('http://localhost:4000/user/updateProfile', {
          data: values
        }).
          then((response) => {
            localStorage.setItem('userDetail', JSON.stringify(response.data.data))
            alert(response.data.msg)
          }).catch((error) => {
            alert(JSON.stringify(error, null, 2))
          })
      }
    },
  });

  const [error, setError] = React.useState(false)

  return (
    <div style={{ marginTop: 50, marginLeft: 50 }}>
      <form onSubmit={formik.handleSubmit} className="row">
      <Box component="form"
          fullWidth
          sx={{
            '& > :not(style)': { mt: 1 }
          }}
          autoComplete="off">
          <TextField label={language.Username}  size='small'
            name="username"
            style={{
              width: '47%',
              marginRight: '3%'
            }}
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            disabled
          />

          <TextField label={language.Email} size='small'
            name="email"
            style={{
              width: '47%',
              marginLeft: '3%'

            }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          /> 
        </Box>
        <Box component="form"
          fullWidth
          sx={{
            '& > :not(style)': { mt: 1 },
          }}
          >
          <TextField label={language.FirstN}  size='small'
            name="firstName"
            style={{
              width: '30%',
              marginRight: '5%'
            }}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField label={language.MiddleN}  size='small'
            name="middleName"
            style={{
              width: '30%',
              marginRight: '4%'
            }}
            value={formik.values.middleName}
            onChange={formik.handleChange}
            error={formik.touched.middleName && Boolean(formik.errors.middleName)}
            helperText={formik.touched.middleName && formik.errors.middleName}
          />

          <TextField label={language.LastN} size='small'
            name="lastName"
            style={{
              width: '30%',
              marginLeft: '1%'
            }}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Box>
        <Box component="form"
              fullWidth
              sx={{
                '& > :not(style)': { mt: 1 },
          }}
        >
          <TextField label={language.NPassword}  size='small'
            name="newPassword"
            fullWidth
            style={{
              width: '47%',
              marginRight: '3%'
            }}
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField label={language.Confirm}  size='small'
            name="confirmPassword"
            type="password"
            fullWidth
            style={{
              width: '47%',
              marginLeft: '3%'

            }}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Box>

        <Box component="form"
          fullWidth
          sx={{
            '& > :not(style)': { mt: 1 }
          }}
          autoComplete="off">
            <Autocomplete
            // value={formik.values.country}
              id="country-select-demo"
              sx={{ display: 'inline-block' }}
              style={{
                width: '47%',
                marginRight: '3%'
              }}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              defaultValue={countries.find(v => v.code === formik.values.country)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                  {option.label} ({option.code})
                </Box>
              )}
              onChange={(e, value) => {
                formik.values.country = value.code
              }}
              renderInput={(params) => (
                <TextField
                   size='small'
                  name="country"
                  {...params}
                  label={language.Country}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />

          <TextField label={language.City}  size='small'
            name="city"
            style={{
              width: '47%',
              marginLeft: '3%'

            }}
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Box>

        <Box component="form"
          fullWidth
          sx={{
            '& > :not(style)': { mt: 1 }
          }}
          autoComplete="off">
          <TextField label={language.Street}  size='small'
            name="street"
            style={{
              width: '47%',
              marginRight: '3%'
            }}
            value={formik.values.street}
            onChange={formik.handleChange}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
          />

          <TextField label={language.ZIP}  size='small'
            name="ZIP"
            style={{
              width: '47%',
              marginLeft: '3%'

            }}
            value={formik.values.ZIP}
            onChange={formik.handleChange}
            error={formik.touched.ZIP && Boolean(formik.errors.ZIP)}
            helperText={formik.touched.ZIP && formik.errors.ZIP}
          /> 
        </Box>

        <Box component="form"
          fullWidth
          sx={{
            '& > :not(style)': { mt: 1 },
          }}>
          <TextField label={language.Phone} size='small'
            name="phoneNumber" 
            fullWidth
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Box>

        <Box component="form"
          fullWidth
          sx={{
            '& > :not(style)': { mt: 1 },
          }}>

          <FormControl component="fieldset"
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
            >
            <FormLabel component="legend">{language.Gender}</FormLabel>
            <RadioGroup
              row
              name='gender'
              value={formik.values.gender}
              onChange={formik.handleChange}
              >
              <FormControlLabel value={genderDt[0]} control={<Radio />} label={language.Female} />
              <FormControlLabel value={genderDt[1]} control={<Radio />} label={language.Male}  />

            </RadioGroup>
          </FormControl>
        </Box>

        <Button  style={{backgroundColor:"#000052" , color:"#fff" , padding:"5px"}} variant="contained" fullWidth type="submit">
        {language.Update}
        </Button>
      </form>
    </div>
  );


}