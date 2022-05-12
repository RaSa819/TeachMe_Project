import React from "react";
import Button from '@mui/material/Button';
import classes from '../StudentDashboard.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';



function createData(department, price, details, edit, del) {
    return { department, price, details, edit, del };
}

const rows = [
    createData('Department name', '- $'),
    createData('Department name', '- $')
];

export default function Department() {
    const [addDepartment, setAddDepartment] = React.useState(false);

    const openAddDepartment = () => {
        setAddDepartment(true);
    };

    const closeAddDepartment = () => {
        setAddDepartment(false);
    };

    return (
        <div>
            <Button variant="contained"
                startIcon={<AddBoxIcon />}
                className={classes.addButton}
                onClick={openAddDepartment}
            >Add Department
            </Button>

            <Dialog open={addDepartment} onClose={closeAddDepartment}>

                <DialogContent>

                    <TextField
                        color="error"
                        margin="dense"
                        id="name"
                        label="Department Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        color="error"
                        margin="dense"
                        id="name"
                        label="Price $"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddDepartment}
                        className={classes.addButton}>
                        Add department</Button>
                </DialogActions>
            </Dialog>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Department</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right" sx={{ width: '45%' }}> </TableCell>
                            <TableCell align="right" sx={{ width: '5%' }}> </TableCell>
                            <TableCell align="right" sx={{ width: '5%' }}> </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.department}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.department}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.details}</TableCell>
                                <TableCell align="right">
                                    <IconButton >
                                        <EditIcon sx={{ color: 'black', fontSize: '15px' }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton >
                                        <DeleteIcon sx={{ color: 'red', fontSize: '15px' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}


