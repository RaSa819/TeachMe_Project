import React from "react";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import classes from '../StudentDashboard.module.css';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';


export default function UserCard(props) {
    const {name, country, joinedDate, description, stars} = props;

    
    return (

        <div style={{ textAlign: 'left', border: '1px solid lightgray', borderRadius: 10, margin: 5, width: '40%', display: 'inline-block' }}>
            <div style={{ padding: 10 }}>
                <h6 style={{ display: 'inline-block', width: '90%' }}>{name}</h6>
               
                <div>
                
             
                    <Rating name="read-only" value={stars} readOnly />
           
                    <span style={{ marginLeft: 15, fontSize: 12 }}>{country}</span>
                </div>

                <p style={{ fontSize: 12, color: 'grey' }}>joined {joinedDate}</p>
                <p style={{ fontSize: 12 }}>{description}<a href="">Learn more</a></p>
                <div style={{textAlign:"center"}}>
                    <Button   className={classes.cardButton} 
                    sx={{color: '#f1f0f0', background: 'darkblue'}}
                    startIcon={<EditIcon/>}>Edit Info</Button>

                    <Button  className={classes.cardButton} 
                     sx={{color: 'darkblue', background: '#f1f0f0' }}
                     startIcon={<AccountCircleIcon/>}  >View Profile</Button>

                    <Button  className={classes.cardButton} 
                     sx={{color: '#f1f0f0', background: '#D90429' }}
                     startIcon={<DeleteIcon  />}  >Delete User</Button>
                </div>
            </div>
        </div>


    );
}