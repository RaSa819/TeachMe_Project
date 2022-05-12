import React from "react";
import UserCard from "./userCard";
import Button from '@mui/material/Button';
import classes from '../StudentDashboard.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function Tutors() {
    return (
        <div>
          <Button variant="contained"
             startIcon={<AddBoxIcon/>}
             className={classes.addButton}
              >Add new user</Button>

            <div style={{ textAlign: 'center' }}>

                <UserCard
                    name="Tutor Name"
                    stars='4'
                    country="Country name"
                    joinedDate="joined 20 May 2022"
                    description="I have 3 years experience in Lorem ipsum dolor sit amet..."
                />
                <UserCard
                    name="Tutor Name"
                    stars='4'
                    country="Country name"
                    joinedDate="20 May 2022"
                    description="I have 3 years experience in Lorem ipsum dolor sit amet..."
                />
            </div>
        </div>
    );
}