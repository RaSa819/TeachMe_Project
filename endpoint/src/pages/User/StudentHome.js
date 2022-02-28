import React from "react";
import Drawer from './Layout/Drawer'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GoLocation } from "react-icons/go";

import axios from 'axios'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5"
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
const Content = () => {


    const [img, setImg] = React.useState('')
    const [data, setData] = React.useState({})
    const [name, setName] = React.useState({})
    const [address, setAddress] = React.useState({})

    React.useEffect(async () => {
        const axi1 = axios.get('http://localhost:4000/fetch', {
            responseType: 'blob',
            id: token
        });

        const axi2 = axios.get('http://localhost:4000/student/profile', {
            params: {
                id: token
            }
        })

        await axios.all([axi1, axi2]).then(axios.spread((res1, res2) => {

            if (img === '') {
                var imgUrl = URL.createObjectURL(res1.data)
                setImg(imgUrl)
                setData(res2.data)
                setName(res2.data.name)
                setAddress(res2.data.address)
            }


        })).catch((error) => {
            console.log('the error is' + error)
        })
    }, [])



    let token = localStorage.getItem('token')

    return (
        <div style={{
            marginTop: '50px'
        }}>
            <List sx={{ width: '100%', maxWidth: '95%', bgcolor: 'background.paper',
         }}>
                <div className="container-fluid">
                    <h2 style={{
                        color:color[1]
                    }}>Dashboard</h2>
                    <div className="row">
                        <div className="col-sm-2">
                            <ListItemAvatar>
                                <Avatar alt={name.firstNam} src={img}
                                    sx={{
                                        height: '100px',
                                        width: '100px',
                                    }}

                                    style={{
                                        borderWidth: '3px',
                                        borderStyle: 'solid',
                                        borderColor: color[1],
                                        outlineWidth: '2px',
                                        outlineColor: color[0],
                                        outlineStyle: 'solid'
                                    }}
                                />
                            </ListItemAvatar>
                        </div>
                        <div className="col">
                            <Stack direction='row' spacing={20}>
                                <p>{name.firstName + '  ' + name.lastName}</p>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <Rating
                                    name="read-only"
                                    value={4}
                                    readOnly
                                />
                            </Stack>
                            <div style={{
                                marginTop: '-13px'
                            }}>
                                <Divider component="li" />
                            </div>
                            <div>
                                <p style={{
                                    fontSize: '12px',

                                }}>
                                    Joined at  {" — " + data.date}

                                </p>
                            </div>


                            <p style={{
                                fontSize: '12px',
                                marginTop: '-15px'
                            }}>
                                Rated by  {data.rate}+ tutors and have no previews
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                        </div>
                    </div>
                </div>


                <Divider variant="inset" component="li"
                style={{
                    marginTop:'50px'
                }}
                />
            </List>
            
            <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <MdOutlineMailOutline
                        size={25}
                        style={{
                            marginRight: '20px'
                        }}
                    />
                    <Typography>Email</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {data.email}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <IoCallOutline
                        size={25}
                        style={{
                            marginRight: '20px'
                        }}
                    />
                    <Typography>Phone Number</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {data.phoneNumber}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <GoLocation
                        size={25}
                        style={{
                            marginRight: '20px'
                        }}
                    />
                    <Typography>Address</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Country</TableCell>
                                <TableCell >City</TableCell>
                                <TableCell>Street</TableCell>
                                <TableCell>ZIP</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow

                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell>{address.country}</TableCell>
                                <TableCell>{address.city}</TableCell>
                                <TableCell>{address.street}</TableCell>
                                <TableCell>{address.ZIP}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
            </div>
            <Stack spacing={4} direction="row"
                sx={{
                    marginTop: '20px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Button variant="contained"
                    style={{
                        backgroundColor: color[0]
                    }}
                >PReviews</Button>
                <Button variant="contained"
                    style={{
                        backgroundColor: color[0]
                    }}
                >Rate</Button>
                <Button variant="contained"
                    style={{
                        backgroundColor: color[0]
                    }}>Close</Button>
            </Stack>
        </div>
    )
}

export default () => {
    return (
        <Drawer>
            {Content()}
        </Drawer>
    )
}

const color = [
    "#000052",
    "#D90429",
    "#F4F4F8",
]