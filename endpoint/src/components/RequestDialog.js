import React from 'react'
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



export default (openDialog, id = null, type = 0, title ,socket, departmentId,language) => {
    const time = [
        { name:language.OneHour, value: 1 },
        { name: language.TwoHours, value: 2 },
        { name: language.ThreeHours, value: 3 },
        { name: language.FourHours, value: 4 }
    ]
    openDialog({
        title: title,
        contentText: language.ThisInfo,
        fields: {
            title: {
                initialValue:'',
                name: 'title',
                label:language.Title
            },
            description: {
                initialValue: '',
                name: 'description',
                label:language.Description,
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

                        <FormLabel component="legend">{language.ChooseTime}</FormLabel>

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
            title: Yup.string().required(language.TitleRequired),
            description: Yup.string().required(language.DesRequired),
            time: Yup.string().required(language.TimeRequired)
        }),
        cancelButton: { children: language.Close },
        submitButton: {
            children: language.Save,
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
