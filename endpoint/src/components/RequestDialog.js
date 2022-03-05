import React, { useState } from 'react'
import * as Yup from "yup";
import {
    FormControl,
} from "@material-ui/core";

import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { yupToFormErrors } from 'formik';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


const defaultSettings = {
    username: "myUsername",
    onMailingList: true,
    notificationRetention: "2_weeks"
};

export default (openDialog,name) => {
    //const[a,setA]=useState()
    openDialog({
        title: "Send Request to "+name,
        contentText: null,
        fields: {
            notificationRetention: {
                initialValue: defaultSettings.notificationRetention,
                component: (
                    <FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Title of Subject</InputLabel>
                            <OutlinedInput
                                sx={{
                                    marginTop: '10px'
                                }}
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">Sub:</InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>
                        <TextField
                            sx={{
                                marginTop: '20px'
                            }}
                            fullWidth
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={5}
                        />
                        <Button>
                            Attachment file (images, pdf)
                        </Button>
                        <FormGroup>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={time}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="time" />}
                            />
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
            children: "Send",
            props: { variant: "contained", color: "secondary" }
        },
        onSubmit: async () =>
            alert(
                'Saving settings Username Keep notifications for')
    })
}


const time = [
    { label: 'one hour', value: 1 },
    { label: 'tow hours', value: 2 },
    { label: 'three hours', value: 3 },
    { label: 'four hours', value: 4 }, ,
]