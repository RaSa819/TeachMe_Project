import React from "react";
import UserCard from "./userCard";
import Button from '@mui/material/Button';
import classes from '../StudentDashboard.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function Users() {
    const [addUser, setAddUser] = React.useState(false);

    const openAddUser = () => {
        setAddUser(true);
    };

    const closeAddUser = () => {
        setAddUser(false);
    };


    return (
        <div>
            <Button variant="contained"
                startIcon={<AddBoxIcon />}
                className={classes.addButton}
                onClick={openAddUser}
            >Add new user</Button>

            <Dialog open={addUser} onClose={closeAddUser}>
                <DialogContent>
                    <div>
                        <TextField
                            required
                            color="error"
                            id="name"
                            label="Username"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ marginRight: "5px" }}
                        />
                        <TextField
                            required
                            color="error"
                            id="name"
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="dense"
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            color="error"
                            id="name"
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            sx={{ marginRight: "5px" }}
                        />
                        <TextField
                            color="error"
                            id="name"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                        />
                    </div>
                    <div>
                        <TextField
                            color="error"
                            id="name"
                            label="First name"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ width: "25%", marginRight: "10px" }}
                        />
                        <TextField
                            color="error"
                            id="name"
                            label="Middle name"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ width: "25%", marginRight: "10px" }}
                        />
                        <TextField
                            color="error"
                            id="name"
                            label="Last name"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ width: "25%" }}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            color="error"
                            id="name"
                            label="Country"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ marginRight: "5px" }}
                        />
                        <TextField
                            color="error"
                            id="name"
                            label="City"
                            type="text"
                            variant="outlined"
                            margin="dense"
                        />
                    </div>
                    <div>
                        <TextField
                            color="error"
                            id="name"
                            label="Zip code"
                            type="text"
                            variant="outlined"
                            margin="dense"
                            sx={{ marginRight: "5px" }}
                        />

                        <TextField
                            required
                            color="error"
                            id="name"
                            label="Phone"
                            type="text"
                            variant="outlined"
                            margin="dense"
                        />
                    </div>

                    <FormControl sx={{ width: "50%" }}>
                        <FormLabel id="demo-row-radio-buttons-group-label"
                            required
                            color="error"
                        >Gender</FormLabel>
                        <RadioGroup row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio color="error" />} label="Female" />
                            <FormControlLabel value="male" control={<Radio color="error" />} label="Male" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label"
                            required
                            color="error"
                        >Student or Tutor</FormLabel>
                        <RadioGroup row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio color="error" />} label="Student" />
                            <FormControlLabel value="male" control={<Radio color="error" />} label="Tutor" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddUser}
                        className={classes.addButton}>
                        Add User</Button>
                </DialogActions>
            </Dialog>


            <div style={{ textAlign: 'center' }}>
                <UserCard
                    name="User first-last name"
                    stars='4'
                    country="Country name"
                    joinedDate="20 May 2022"
                    description="I have 3 years experience in..."
                />
                <UserCard
                    name="User first-last name"
                    stars='4'
                    country="Country name"
                    joinedDate="20 May 2022"
                    description="I have 3 years experience in..."
                />
            </div>
        </div>
    );
}