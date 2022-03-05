import React from 'react'
import axios from 'axios'

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useDialog } from 'react-mui-dialog';

import Drawer from './Layout/Drawer'
// Icons Import 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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


const deleteUser = (id) => {
    axios.post('http://localhost:4000/admin/deleteUser', {
        id: id
    }).then((res) => {
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
                You are about to delete the document . This cannot be
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
                    Yes I'm sure, delete this document
                </RedCapitalizedButton>
            )

        },
        onSubmit: async () => {
            deleteUser(id)
            window.location.reload(false);
        }
    });

}


function Row(props) {

    const { row, openDialog, closeDialog } = props;
    const [open, setOpen] = React.useState(false);




    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell align="right">{row.name.firstName}</TableCell>
                <TableCell align="right">{row.name.middleName}</TableCell>
                <TableCell align="right">{row.name.lastName}</TableCell>
                <TableCell align="right">{row.address.country}</TableCell>
                <TableCell align="right">{row.address.city}</TableCell>
                <TableCell align="right">{row.address.street}</TableCell>
                <TableCell align="right">{row.address.ZIP}</TableCell>
                <TableCell align="right">{row.type === 1 ? "Tutor" : "Student"}</TableCell>
                <TableCell align="right">{row.gender === 1 ? "Male" : "Female"}</TableCell>
                <TableCell align="right">
                    <DeleteIcon style={{
                        color: 'red'
                    }}
                        onClick={
                            () => {
                                MessageBoxDelete(openDialog, closeDialog, row._id);

                                //deleteUser(row._id)
                                //console.log(row._id)
                            }
                        }
                    />
                </TableCell>

            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                More Info About
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>user name</TableCell>
                                        <TableCell>email</TableCell>
                                        <TableCell>data join</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>

                                        <TableCell>
                                            {row.userName}
                                        </TableCell>
                                        <TableCell>
                                            {row.email}
                                        </TableCell>
                                        <TableCell>
                                            {row.date}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function User() {

    const { openDialog, closeDialog } = useDialog();
    const [data, setData] = React.useState([])


    const fetchUser = async () => {
        await axios.get('http://localhost:4000/fetchUser').
            then((response) => {
                setData(response.data)
                //console.log(response.data)
            }).catch((error) => {
                console.log("there is some error " + error)
            })
    }
    React.useEffect(() => {
        fetchUser();
    }, [])


    return (
        <TableContainer component={Paper}
            style={{
                marginTop: '40px'
            }}
        >
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="right">First name</TableCell>
                        <TableCell align="right">Middle name</TableCell>
                        <TableCell align="right">Last name</TableCell>
                        <TableCell align="right">Country</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">Street</TableCell>
                        <TableCell align="right">ZIP code</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => {
                        if (row.type != 2) {
                            return (<Row key={row._id} row={row}

                                openDialog={openDialog}
                                closeDialog={closeDialog}

                            />)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default () => {
    return (
        <Drawer>
            {User()}
        </Drawer>
    )
}