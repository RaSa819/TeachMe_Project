import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Icons Import
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { Divider } from '@mui/material';
import Drawer from './Layout/Drawer'


// notifications Dialog 
import NotificationDialog from './../../components/NotificationDialog'
import { useDialog } from 'react-mui-dialog';
const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.25rem;
  }
`;
function Content() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [id, setId] = React.useState()
  // zero for editing 
  // one for adding 

  const [type, setType] = React.useState(1)


  const deleteDept = (id) => {
    //alert(id)
    axios.post('http://localhost:4000/admin/delDept',
      { id: id }
    ).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }

  const { openDialog, closeDialog } = useDialog();
  const deptName = React.useRef()
  const deptPrice = React.useRef()



  const pushDeptData = () => {

    var url = ''
    if (type === 1) // if add dept option
      url = 'http://localhost:4000/admin/addDept'
    else // else editing dept option
      url = 'http://localhost:4000/admin/EditDept'


   

    var errorCount = 0;
    [deptPrice, deptName].map((item) => {
      if (item.current.value <= 0) {
        errorCount++;
        item.current.focus()
      }
    })

    if (errorCount > 0)
      return;
    console.log(url)


    axios.post(url, {
      data: {
        deptName: deptName.current.value,
        deptPrice: deptPrice.current.value,
        id
      }
    }).then((response) => {
      cancelEdit();
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })


  }


  const [data, setData] = React.useState([])
  React.useEffect(async () => {
    fetchDept()
  }, [])


  const fetchDept = async () => {
    await axios.get('http://localhost:4000/fetchDept').

      //represnt data to state 

      then((res) => {
        setData(res.data)
        setTimeout(() => {
          console.log("The New Data")
          console.log(res.data)
        }, 1000);
      }).
      catch((err) => {
        console.log('there is error is' + err)
      })
  }

  const cancelEdit = () => {
    setType(1)
    deptName.current.value = null;
    deptPrice.current.value = null;
    deptName.current.focus();
    setId(null)
  }

  const setEditDat = (id) => {
    data.map((item) => {
      if (item._id === id) {
        deptName.current.value = item.name
        deptPrice.current.value = item.price


        deptName.current.focus()
        deptPrice.current.focus()
      }
    })
  }
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className='row' style={{
      marginTop: '50px'
    }}>
      <div className='col-md-4'>
        <Root sx={{ maxWidth: '100%', width: 500 }}>
          <table aria-label="custom pagination table">
            <thead>
              <tr>
                <th>department</th>
                <th>Price</th>
                <th>Del</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {(rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
              ).map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td style={{ width: 160 }} align="right">
                    {row.price}
                  </td>
                  <td>
                    <IconButton onClick={() => {
                      deleteDept(row._id)
                      fetchDept()
                    }}>
                      <DeleteIcon style={{
                        color: 'red'
                      }} />
                    </IconButton>

                  </td>
                  <td>
                    <EditIcon
                      onClick={() => {
                        setType(0)
                        setEditDat(row._id)
                        setId(row._id)

                      }}

                    />
                  </td>
                </tr>
              ))}

              {emptyRows > 0 && (
                <tr style={{ height: 41 * emptyRows }}>
                  <td colSpan={4} />
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={4}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  componentsProps={{
                    select: {
                      'aria-label': 'rows per page',
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </tr>
            </tfoot>
          </table>
        </Root>
      </div>
      <div className='col-md-6'>

        <Box

          component="form"
          sx={{
            display: 'flex',

            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >


          <TextField
            size='small'
            inputRef={deptName} id="outlined-basic" label="dept name" variant="outlined" />

          <TextField
            size='small'


            inputRef={deptPrice} id="outlined-basic" label="price of dept" variant="outlined" />

          <Button size='small' variant="outlined"

            onClick={() => {
              setType(1)
              pushDeptData()
              fetchDept()
            }}
            color="success">
            {
              type === 1 ? "Add" : "Edit"
            }
          </Button>
          <Button size='small' variant="outlined"
            sx={{
              display: type === 0 ? "block" : "none"
            }}

            onClick={() => {
              cancelEdit()
            }}
            color="error">
            cancel
          </Button>

        </Box>
        <Divider />

        <Box sx={{
          margin: '10px'
        }}>
          <Button variant="contained"
            onClick={() => {
              NotificationDialog(openDialog)
            }}
          >

            Send notification
          </Button>

        </Box>
      </div>
    </div>
  );
}

export default function AdminHome() {
  return (
    <Drawer>
      {Content()}
    </Drawer>
  )
}