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
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';


const validationSchema = yup.object({
    _id: yup.
      string('Enter your id'),
    name: yup.
      string('Enter department name').
      required('The department name is required '),
    price: yup.
      string('Enter price').
      required('The price is required ')
  });

export default function Department() {
    const [rows, setRowData] = React.useState([])
    const fetchDept = async () => {
        await axios.get('http://localhost:4000/fetchDept').
        //represnt data to state 
        then((res) => {
            setRowData(res.data)
            setTimeout(() => {
              console.log("The New Data")
              console.log(res.data)
            }, 1000);
        }).
        catch((err) => {
          console.log('there is error is' + err)
        })
    }

    const addDeptData = (e) => {
        e.preventDefault();
        let dataItem = formik.values
        var errorCount = 0;
        if (dataItem.name && dataItem.price) {
            errorCount = 0;
        } else {
            errorCount++;
        }

        if (errorCount > 0)
          return;
        var url = ''
      let data = {}
      if (dataItem._id) {
        url = 'http://localhost:4000/admin/EditDept'
        data = {
            deptName: dataItem.name,
            deptPrice: dataItem.price,
            id: dataItem._id
        }
      } else {
        url = 'http://localhost:4000/admin/addDept'
        data = {
            deptName: dataItem.name,
            deptPrice: dataItem.price
        }
      }
      axios.post(url, {
        data: data
      }).then((response) => {
          fetchDept()
          setAddDepartment(false);
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }

    const deleteDept = (id) => {
      //alert(id)
      axios.post('http://localhost:4000/admin/delDept',
        { id: id }
      ).then((response) => {
        fetchDept()
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }

    const formik = useFormik({
        initialValues: {
            _id: null,
          name: '',
          price: ''
        },
        validationSchema: validationSchema
      });

      const [error, setError] = React.useState(false)  

    const setEditDat = (data) => {
        openAddDepartment(data)    
    }

    const [addDepartment, setAddDepartment] = React.useState(false);

    const openAddDepartment = (data) => {
        if (data && data._id) {
            formik.values._id = data._id
            formik.values.name = data.name
            formik.values.price = data.price
        } else {
            formik.values._id = null
            formik.values.name = ''
            formik.values.price = ''
        }
        setAddDepartment(true);
    };

    const closeAddDepartment = () => {
        setAddDepartment(false);
    };

    React.useEffect(async () => {
      fetchDept()
    }, [])

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
                <form className="row" onSubmit={addDeptData} id="myDepartmentform">
                    <TextField
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        color="error"
                        margin="dense"
                        id="name"
                        name="name"
                        label="Department Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                        color="error"
                        margin="dense"
                        id="price"
                        name="price"
                        label="Price $"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button type="submit"
                        className={classes.addButton} form="myDepartmentform">
                        { formik.values._id ? 'Edit Department': 'Add Department'}</Button>
                    <Button onClick={closeAddDepartment}
                        className={classes.closeButton}>
                        Close</Button>
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
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.details}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => {
                                        setEditDat(row)
                                    }}>
                                        <EditIcon sx={{ color: 'black', fontSize: '15px' }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => {
                                      deleteDept(row._id)
                                    }}>
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


