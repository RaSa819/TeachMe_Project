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



export default (openDialog, id = null, type = 0, title, socket, departmentId) => {
    openDialog({
        title: title,
        contentText: 'This information is important to success your request',
        fields: {
            title: {
                initialValue: '',
                name: 'title'
            },
            description: {
                initialValue: '',
                name: 'description',
                fieldProps: {
                    multiline: true,
                    maxRows: 4
                }
            },
            attachment: {
                initialValue: null,
                component: (
                    <input type="file"
                        name='attachment'
                        multiple
                    />
                )
            },

            time: {
                initialValue: '',
                component: (
                    <FormControl component="fieldset">

                        <FormLabel component="legend">Choose time of lesson</FormLabel>

                        <Field
                            component={Select}
                            name="time"
                            inputProps={{
                                id: "time"
                            }}>

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
            title: Yup.string().required('the title  is required'),
            description: Yup.string().required('the description is required'),
            time: Yup.string().required('the time is required')
        }),
        cancelButton: { children: "Close" },
        submitButton: {
            children: "Save",
            props: { variant: "contained", color: "secondary" }
        },
        onSubmit: async (values) => {
            if (id === null)
                socket.emit('request', {
                    student: localStorage.getItem('token'),
                    time: values.time,
                    title: values.title,
                    description: values.description,
                    departmentId: departmentId,
                    to: 'all'
                })
            else
                socket.emit('request', {
                    student: localStorage.getItem('token'),
                    time: values.time,
                    title: values.title,
                    description: values.description,
                    to: id
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