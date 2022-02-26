import React, { useState } from 'react'
import * as Yup from "yup";
import {
    FormControl,
} from "@material-ui/core";

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { yupToFormErrors } from 'formik';


const defaultSettings = {
    username: "myUsername",
    onMailingList: true,
    notificationRetention: "2_weeks"
};

export default (openDialog) => {
    openDialog({
        title: "Send Notifications",
        contentText: null,
        fields: {
            notificationRetention: {
                initialValue: defaultSettings.notificationRetention,
                component: (
                    <FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Title of Notification</InputLabel>
                            <OutlinedInput
                                sx={{
                                    marginTop: '10px'
                                }}
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">Ti:</InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>
                        <TextField
                            sx={{
                                marginTop: '20px'
                            }}
                            fullWidth
                            id="outlined-multiline-static"
                            label="Notif"
                            multiline
                            rows={5}
                        />
                        <FormGroup>
                            <h4 style={{
                                margin:'5px'
                            }}>To</h4>
                            <FormControlLabel control={<Checkbox  />} label="Tutors" />
                            <FormControlLabel control={<Checkbox  />} label="Students" />
                        </FormGroup>

                    </FormControl>
                )
            }
        },
        validationSchema: Yup.object({
            notificationRetention: Yup.string()
        }),
        cancelButton: { children: "Close" },
        submitButton: {
            children: "Save",
            props: { variant: "contained", color: "secondary" }
        },
        onSubmit: async () =>
            alert(
                'Saving settings Username Keep notifications for')
    })
}
