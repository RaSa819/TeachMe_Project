import React, { useContext } from 'react'
import * as Yup from "yup";
import {
    FormControl,
    FormLabel,
    MenuItem,

} from "@material-ui/core";
import { Select, TextField } from "formik-material-ui";
import { Field } from "formik";
import axios from 'axios';
import { SocketContext } from '../Socket';



export default (openDialog, id = null, type = 0, title, socket) => {
    openDialog({
        title: title,
        contentText: 'this is the information is important to success your request',
        fields: {
            title: {
                initialValue: '',
                name: 'title'
            },
            subject: {
                initialValue: '',
                name: 'subject',
                fieldProps: {
                    multiline: true,
                    maxRows: 4
                }
            },
            time: {
                initialValue: '',
                component: (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose your card type</FormLabel>
                        <Field
                            component={Select}
                            name="time"
                            inputProps={{
                                id: "time"
                            }}
                        >

                            {
                                time.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                                ))
                            }

                        </Field>
                    </FormControl>
                )
            }
        },

        validationSchema: Yup.object({
            title: Yup.string().required('the dept option is required'),
            subject: Yup.string().required('You must talk about your self'),
            time: Yup.string().required('you must input your last certification')
        }),
        cancelButton: { children: "Close" },
        submitButton: {
            children: "Save",
            props: { variant: "contained", color: "secondary" }
        },
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2))
            if (id === null)
                socket.emit('request', {
                    student: localStorage.getItem('token'),
                    time: values.time,
                    title: values.title,
                    to: 'all',
                    subject: values.subject
                })
            else
                socket.emit('request', {
                    student: localStorage.getItem('token'),
                    time: values.time,
                    title: values.title,
                    to: id,
                    subject: values.subject
                })
            // socket.emit('request', 'this is direct request = ' + id)
        }

    });
}

const time = [
    { name: "one houre", value: 1 },
    { name: "tow houres", value: 2 },
    { name: "three houres", value: 3 },
    { name: "four houres", value: 4 }
]