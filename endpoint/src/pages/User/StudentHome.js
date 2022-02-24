import React from "react";
import Drawer from './Layout/Drawer'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
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
import {GoLocation} from "react-icons/go";

import Paper from '@mui/material/Paper';

import axios from 'axios'

import { imageListItemBarClasses } from "@mui/material";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5"
const Content = () => {


    const [img, setImg] = React.useState('')
    const [data, setData] = React.useState({})
    const [name, setName] = React.useState({})
    const[address,setAddress]=React.useState({})

    React.useEffect(async () => {
        const axi1 = axios.get('http://localhost:4000/fetch', {
            responseType: 'blob'
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
        <div>
            <List sx={{ width: '100%', maxWidth: '95%', bgcolor: 'background.paper' }}>
                <ListItem
                    sx={{
                        flexDirection: 'row'
                    }}
                >
                    <ListItem sx={{
                        width: '10%'
                    }}>
                        <ListItemAvatar>
                            <Avatar alt={name.firstNam} src={img}
                                sx={{
                                    height: '100px',
                                    width: '100px'
                                }}
                            />

                            <ListItemText sx={{
                                marginLeft: '15px',
                                color: '#00e600'
                            }}>
                                Available
                            </ListItemText>
                        </ListItemAvatar>

                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={name.firstName}
                            sx={{
                                flexDirection: 'column'
                            }}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Joined at
                                    </Typography>
                                    {" — " + data.date}
                                </React.Fragment>
                            }
                        />
                    </ListItem>

                </ListItem>

                <Divider variant="inset" component="li" />
            </List>
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
                    <Table  size="small" aria-label="a dense table">
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
    )
}

export default () => {
    return (
        <Drawer>
            {Content()}
        </Drawer>
    )
}