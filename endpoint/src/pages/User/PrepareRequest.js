import React,{useState} from "react";
import TopBar from './../../components/topBar/topBar'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import axios from "axios";

import {useNavigate} from 'react-router-dom'
function renderRow(props) {
    const { index, style,data } = props;
    let item = data.dept[index]
    let navigate = data.navigate


    return (
        <ListItem style={style} key={index} component="div" disablePadding
        >
            <ListItemButton style={{
                textAlign: 'center'
            }}
            onClick={()=>{
                navigate('/global/tutors',{
                    state:{
                        id:item._id
                    }
                })
            }}
            >

                <ListItemText primary={item.name}/>
            </ListItemButton>
        </ListItem>
    );
}
export default (props) => {
    const [dept, setDept] = useState([])
    const fetchDept = async () => {
        axios.get('http://localhost:4000/fetchDept').
          then((res) => {
            setDept(res.data)
          }).
          catch((err) => {
            console.log('there is error is' + err)
          })
    }
    React.useEffect(() => {
        fetchDept()
    }, [])
    let navigate = useNavigate()
    console.log(dept)

    return (
        <div>
            <TopBar />
            <Box

                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ width: '100%', height: 400, bgcolor: 'background.paper' }}
            >
                <FixedSizeList
                    height={400}
                    width="100%"
                    itemData={{dept,
                        navigate
                    }}
                    itemSize={35}
                    itemCount={dept.length}
                    overscanCount={5}
                >
                    {renderRow}
                </FixedSizeList>
            </Box>
        </div>
    )
}