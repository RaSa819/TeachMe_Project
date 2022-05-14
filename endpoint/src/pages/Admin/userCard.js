import React from "react";
// import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import classes from '../StudentDashboard.module.css';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { countries } from '../../general/datas';
import axios from 'axios'
import Typography from '@mui/material/Typography';
import { useDialog } from 'react-mui-dialog';

import {
    withStyles,
    Button
} from "@material-ui/core";

const CapitalizedButton = withStyles((theme) => ({
    label: { textTransform: "capitalize" }
}))(Button);



const RedCapitalizedButton = withStyles((theme) => ({
    root: {
        color: theme.palette.error.dark,
        backgroundColor: "rgba(0, 0, 0, 0)",
        border: `1px solid ${theme.palette.error.dark}`,
        "&:hover": {
            color: theme.palette.getContrastText(theme.palette.error.dark),
            backgroundColor: theme.palette.error.dark,
            border: `1px solid ${theme.palette.error.dark}`
        }
    },
    label: { textTransform: "none" }
}))(Button);

export default function UserCard(props) {
    const { openDialog, closeDialog } = useDialog();
    const { name, country, joinedDate, description, stars, id, type, setEditDat, data, fetchUser } = props;
    let countryName = ''
    if (country) {
        let countryItem = countries.find(v => v.code === country);
        if (countryItem) {
            countryName = countryItem.label
        }
    }


    const deleteUser = (id) => {
        axios.post('http://localhost:4000/admin/deleteUser', {
            id: id
        }).then(async (res) => {
            await fetchUser()
            console.log(res)
        }).catch((error) => {
            console.log('the error is ' + error)
        })
    }

    const MessageBoxDelete = (openDialog, closeDialog, id) => {
        openDialog({
            title: "Delete this document?",
            // a component this time
            contentText: (
                <Typography color="textSecondary">
                    You are about to delete  {name.firstName + ' '} {name.middleName} {name.lastName}. This cannot be
                    undone.
                </Typography>
            ),
            // In this case we'll pass our own button components. Because we're
            // passing our own component we have to handle closing the dialog
            // when we click cancel
            cancelButton: {
                component: (
                    <CapitalizedButton onClick={closeDialog}>Cancel</CapitalizedButton>
                )
            },
            // NOTE: make sure to set type='submit' for the submit button
            submitButton: {
                component: (
                    <RedCapitalizedButton type="submit" variant="contained">
                        Yes I'm sure, delete this user
                    </RedCapitalizedButton>
                )
    
            },
            onSubmit: async () => {
                deleteUser(id)
                // window.location.reload(false);
            }
        });
    
    } 
    

    return (

      <div className={classes.cardDiv} >
            <div style={{ padding: 10 }}>
                <h6 style={{ display: 'inline-block', width: '90%' }}>{name.firstName + ' '} {name.middleName} {name.lastName}</h6>

                <div>


                    <Rating name="read-only" value={stars} readOnly />

                    <span style={{ marginLeft: 15, fontSize: 12 }}>{countryName}</span>
                </div>

                <p style={{ fontSize: 12, color: 'grey' }}>joined on {new Date(joinedDate).toLocaleString()}</p>
                <p style={{ fontSize: 12 }}>{description.slice(0, 150)}<a href={type===0 ? `/view/student/${id}` : (type===1 ? `/view/tutor/${id}` : ``)} target="_blank">Learn more</a></p>
                <div style={{ textAlign: "center" }}>
                    <Button className={classes.cardButton}
                        sx={{ color: '#f1f0f0', background: 'darkblue' }}
                        startIcon={<EditIcon />}  onClick={() => {
                            setEditDat(data)
                        }}>Edit Info</Button>

                    <Button className={classes.cardButton}
                        sx={{ color: 'darkblue', background: '#f1f0f0' }}
                        startIcon={<AccountCircleIcon />}  ><a href={type===0 ? `/view/student/${id}` : (type===1 ? `/view/tutor/${id}` : ``)} target="_blank">View profile</a></Button>

                    <Button className={classes.cardButton}
                        sx={{ color: '#f1f0f0', background: '#D90429' }}
                        startIcon={<DeleteIcon />}  onClick={
                            () => {
                                MessageBoxDelete(openDialog, closeDialog, id);

                                //deleteUser(row._id)
                                //console.log(row._id)
                            }
                        }>Delete User</Button>
                </div>
            </div>
        </div>


    );
}