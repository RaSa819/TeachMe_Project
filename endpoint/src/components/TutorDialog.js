import React from 'react'
import * as Yup from "yup";
import {
    FormControl,
    FormLabel,
    MenuItem,

} from "@material-ui/core";
import { Select } from "formik-material-ui";
import { Field } from "formik";
import axios from 'axios';
const certifications = [
    "Bachelor",
    "Master",
    "Dector",
    "Freelance and own experience",
    "Another"
]

const CardType = [
    "master card",
    "visa card"
]

export default (openDialog, dt, dept,navigate) => {
    const push = async (data, tutorData) => {
        await axios.post('http://localhost:4000/user/register', {
            data: data,
            tutorData: tutorData
        }).
            then((response) => {
                alert(JSON.stringify(response.data, null, 2))
                console.log(response.data)
                localStorage.removeItem('token')
                localStorage.removeItem('type')
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('type', 1);
                navigate('/home')
                

            }).catch((error) => {
                alert(JSON.stringify(error, null, 2))
                //console.log(error)
            })
    }

    openDialog({
        title: "Data of Tutor ",
        contentText: null,
        fields: {
            dept: {
                initialValue: '',
                component: (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose Your Dept</FormLabel>
                        <Field
                            component={Select}
                            name="dept"
                            inputProps={{
                                id: "dept"
                            }}
                        >

                            {
                                dept.map((item) => (
                                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                ))
                            }

                        </Field>
                    </FormControl>
                )
            },

            about: {
                initialValue: '',
                name: 'about'
            },
            certifications: {
                initialValue: '',
                component: (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose last certification you got</FormLabel>
                        <Field
                            component={Select}
                            name="certifications"
                            inputProps={{
                                id: "dept"
                            }}
                        >

                            {
                                certifications.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))
                            }

                        </Field>
                    </FormControl>
                )
            },
            experience: {
                initialValue: '',
                name: 'experience',

            },
            CardType: {
                initialValue: '',
                component: (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose your card type</FormLabel>
                        <Field
                            component={Select}
                            name="CardType"
                            inputProps={{
                                id: "dept"
                            }}
                        >

                            {
                                CardType.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))
                            }

                        </Field>
                    </FormControl>
                )
            },
            cardID: {
                initialValue: '',
                name: 'cardID',

            },

        },

        validationSchema: Yup.object({
            dept: Yup.string().required('the dept option is required'),
            about: Yup.string().required('You must talk about your self'),
            certifications: Yup.string().required('you must input your last certification'),
            experience: Yup.string().required('You must talk about your experiences'),
            CardType: Yup.string().required('You must choose your card type'),
            cardID: Yup.string().required('You must choose your card ID'),
        }),
        cancelButton: { children: "Close" },
        submitButton: {
            children: "Save",
            props: { variant: "contained", color: "secondary" }
        },
        onSubmit: async (values) =>
            push(dt.value(), values)
        //alert(JSON.stringify(values, null, 2))
    });
    return (
        <></>
    )
}