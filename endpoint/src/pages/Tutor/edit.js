
import React from "react";
import axios from 'axios';
import classes from "../User/tutorDashboardUpdated.module.css"
import { useDialog } from 'react-mui-dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextArea from '@mui/material/TextareaAutosize';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { countries, genderDt, typeDt, certifications, CardType } from '../../general/datas';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormInput from '../../components/formInput';
import { MessageBox } from '../../components/MessageBox';
import { LanguageContext } from '../../App';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email("it's not Email Format")
    .required('Your Email is Required'),
  firstName: yup.
    string('Enter your first name').
    required('The first name is required '),
  middleName: yup.
    string('Enter your middle name').
    required('The middle name is required '),
  lastName: yup.
    string('Enter your last name').
    required('The last name is required '),
  newPassword: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length'),
  confirmPassword: yup
    .string('Enter your password')
    .oneOf([yup.ref('newPassword'), null], 'password must match'),
  country: yup
    .string('Enter your country ')
    .required('The country is required'),
  city: yup.
    string('Enter your city ').
    required('The city is required'),
  street: yup
    .string('Enter your street ').
    required('The street is required'),
  ZIP: yup
    .number('Enter your street ')
    .required('The street is required'),
  phoneNumber: yup
    .number('Enter your phone number ')
    .required('The phone number is required')
    .test('len', 'Must be exactly 10 numbers', val => val.toString().length === 10),
  gender: yup
    .string('Enter your gender ')
    .required('The gender is required'),
  dept: yup.string().required('the dept option is required'),
  about: yup.string().required('You must talk about your self'),
  certifications: yup.string().required('you must input your last certification'),
  experience: yup.string().required('You must talk about your experiences'),
  cardType: yup.string().required('You must choose your card type'),
  cardID: yup.string().required('You must choose your card ID')
});

export default function Edit() {
  const language = React.useContext(LanguageContext);
  const { openDialog } = useDialog();
  const [departments, setDepartment] = React.useState([])

  const fetchDept = async () => {
    await axios.get('http://localhost:4000/fetchDept').
      //represnt data to state 
      then((res) => {
        setDepartment(res.data)
      }).
      catch((err) => {
        console.log('there is error is' + err)
      })
  }
  React.useEffect(() => {
    fetchDept();
  }, [])

  let userDetail = JSON.parse(localStorage.getItem('userDetail')) || {};

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
      phoneNumber: userDetail.phoneNumber,
      dept: userDetail.dept_id,
      about: userDetail.profile?.about,
      certifications: userDetail.profile?.certifications,
      experience: userDetail.profile?.experience,
      cardType: userDetail.cardInfo?.cardType,
      cardID: userDetail.cardInfo?.cardID,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('error:::', error)
      if (values.newPassword !== "" && values.confirmPassword === "") {
        alert("Please enter Confirm Password.")
      } else if (error) {
        // MessageBox(openDialog, 'Errors ', "There is some error in the form", 'Okay');
        alert("There is some error in the form")
      } else {
        var userData = {
          data: {
            id: localStorage.getItem('token'),
            userName: values.userName,
            email: values.email,
            firstName: values.firstName,
            middleName: values.middleName,
            lastName: values.lastName,
            type: localStorage.getItem('type'),
            country: values.country,
            city: values.city,
            street: values.street,
            ZIP: values.ZIP,
            gender: values.gender,
            type: 1,
            phoneNumber: values.phoneNumber
          },
          tutorData: {
            dept: values.dept,
            about: values.about,
            certifications: values.certifications,
            experience: values.experience,
            cardType: values.cardType,
            cardID: values.cardID
          }
        }

        if (values.newPassword) {
          userData.data.newPassword = values.newPassword
        }
        axios.post('http://localhost:4000/user/updateProfile', userData).
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
    <div >
      <form onSubmit={formik.handleSubmit} className="row">
        <Box component="form"
          fullWidth
          sx={{
            '& > :not(style)': { mt: 2},
          }}
        >
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
          <TextField label={language.FirstN} size='small'
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
          <TextField label={language.MiddleN}size='small'
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
          <TextField label={language.NPassword} size='small'
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
          <TextField label={language.Confirm} size='small'
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
          <TextField label={language.City} size='small'
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
          <TextField label={language.Street} size='small'
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

          <TextField label={language.ZIP} size='small'
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
          <TextField label={language.Phone} size='small'
            name="phoneNumber"
            fullWidth
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <FormControl sx={{ width: "50%" }}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}>
            <FormLabel id="demo-row-radio-buttons-group-label"
              required
              color="error"
            >{language.Gender}</FormLabel>
            <RadioGroup row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <FormControlLabel value={genderDt[0]} control={<Radio color="error" />} label={language.Female} />
              <FormControlLabel value={genderDt[1]} control={<Radio color="error" />} label={language.Male} />
            </RadioGroup>
          </FormControl>
          {
            departments && departments.length > 0 &&
            <Autocomplete
              // value={formik.values.country}
              id="dept-select-demo"
              sx={{ display: 'inline-block' }}
              style={{
                width: '47%',
                marginRight: '3%'
              }}
              options={departments}
              autoHighlight
              getOptionLabel={(option) => option.name}
              defaultValue={departments.find(v => v._id === formik.values.dept)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                  {option.name}
                </Box>
              )}
              onChange={(e, value) => {
                formik.values.dept = value._id
              }}
              renderInput={(params) => (
                <TextField
                  size='small'
                  name="dept"
                  {...params}
                  label={language.Department}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          }

          <TextField
            fullWidth
            required
            color="error"
            id="about"
            label={language.About}
            type="text"
            margin="dense"
            variant="outlined"
            value={formik.values.about}
            onChange={formik.handleChange}
            error={formik.touched.about && Boolean(formik.errors.about)}
            helperText={formik.touched.about && formik.errors.about}
          />
          <Autocomplete
            // value={formik.values.country}
            id="certifications"
            sx={{ display: 'inline-block' }}
            style={{
              width: '47%',
              marginRight: '3%'
            }}
            options={certifications}
            autoHighlight
            getOptionLabel={(option) => option}
            defaultValue={certifications.find(v => v === formik.values.certifications)}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option}
              </Box>
            )}
            onChange={(e, value) => {
              formik.values.certifications = value
            }}
            renderInput={(params) => (
              <TextField
                size='small'
                name="certifications"
                {...params}
                label={language.ChooseCertificate}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
          <TextField
            required
            color="error"
            id="experience"
            label={language.Experience}
            type="text"
            variant="outlined"
            margin="dense"
            value={formik.values.experience}
            onChange={formik.handleChange}
            error={formik.touched.experience && Boolean(formik.errors.experience)}
            helperText={formik.touched.experience && formik.errors.experience}
          />
          <Autocomplete
            // value={formik.values.country}
            id="cardType-select-demo"
            sx={{ display: 'inline-block' }}
            style={{
              width: '47%',
              marginRight: '3%'
            }}
            options={CardType}
            autoHighlight
            getOptionLabel={(option) => option}
            defaultValue={CardType.find(v => v === formik.values.cardType)}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option}
              </Box>
            )}
            onChange={(e, value) => {
              formik.values.cardType = value
            }}
            renderInput={(params) => (
              <TextField
                size='small'
                name="cardType"
                {...params}
                label={language.ChooseCard}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />

          <TextField
            required
            color="error"
            id="cardID"
            label={language.CardId}
            type="text"
            variant="outlined"
            margin="dense"
            value={formik.values.cardID}
            onChange={formik.handleChange}
            error={formik.touched.cardID && Boolean(formik.errors.cardID)}
            helperText={formik.touched.cardID && formik.errors.cardID}
          />
        </Box>
        <div style={{ textAlign: "center" }}>
          <Button className={classes.formButton} variant="contained" fullWidth type="submit">
            {language.Update}
          </Button>
        </div>
      </form>
    </div>
  );
}

