import React, { useState, useContext, useEffect } from 'react'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdFavorite } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';

import TopBar from './topBar/topBar'

import { useDialog } from 'react-mui-dialog';
import axios from 'axios'
import RequestDialog from './RequestDialog';

import { useNavigate } from 'react-router';

import { SocketContext } from '../Socket';
import TutorDialog from './TutorDialog';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const styleUnFavorite = {
    width: '20px',
    height: '20px',
    color: 'gray'
}

const styleFavorite = {
    width: '20px',
    height: '20px',
    color: 'red'
}

const styleProfileImage = {
    width: '70px',
    height: '70px',
    color: '#FAF7F7',
    padding: '5px'
}

const styleStar = {
    width: '15px',
    height: '15px',
    margin: '1px',
    color: 'yellow'
}

const styleDescription =
{
    fontSize: '11px',
    height: '50px',
    overflow: 'hidden',
    marginTop: '-15px'
}

const styleJoinde = {
    fontSize: '11px'
}


const styleInfo = {
    fontSize: '11px'
}

const styleBusy = {
    color: '#FF0C0C',
    fontSize: '12px',
    marginLeft: '17px',
    marginTop: '10px'
}
const styleAvailabe = {
    fontSize: '12px',
    color: '#08861C',
    marginLeft: '7px',
    marginTop: '10px'
}

const styleBtnView = {
    width: '87px',
    height: '28px',
    borderRadius: '5px',
    backgroundColor: '#E6E4EB',
    border: '0',
    margin: '2px',
    fontSize: '11px',
    float: 'left',

}

const styleBtnRequest = {
    width: '87px',
    height: '28px',
    backgroundColor: '#000052',
    fontSize: '11px',
    borderRadius: '5px',
    color: 'white',
    float: 'left'
}

const stylebtnRandomRequest = {
    width: '223px',
    height: '35px',
    backgroundColor: '#000052',
    borderRadius: '25px',
    marginTop: '10px',
    color: 'white',
    marginBottom: '30px'
}

const styleRandomRequestIcon = {
    color: 'white',
    marginRight: '20px',
    width: '24px',
    height: '24px'
}

const Item = (props) => {

    const { name, dateJoined, about, experience,
        rate, type, id, openDialog, socket, isFavorite } = props;


    const [favorite, setFavorite] = useState()

    if(isFavorite)
       console.log(isFavorite)

     React.useEffect(()=>{
          setFavorite(isFavorite)
     },[isFavorite])  


    let pushFavorite = () => {
        if (!favorite) {
            socket.emit('addFavorite', {
                tutor_id: id,
                id: localStorage.getItem('token')
            })
        }
        else {
            socket.emit('removeFavorite', {
                tutor_id: id,
                id: localStorage.getItem('token')
            })
        }
    }





    const [status, setStatus] = useState(props.status)

    return (
        <div className='col-md-4 col-lg-3  col-xs-12'
            style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid black',
                margin:"10px"
            }}
        >
            <div className='row'>

                <div className='col-2' style={{
                    marginRight: '10px'
                }}>
                    <div style={{
                        borderRadius: '50px',
                        backgroundColor: '#C4C4C4',
                        width: '70px'
                    }}>
                        <BsFillPersonFill
                            style={styleProfileImage} />
                    </div>
                    <div>
                        <p style={
                            status === 1 ? styleAvailabe : styleBusy
                        }>
                            {
                                status === 1 ? 'Available' : 'Busy'
                            }

                        </p>
                    </div>
                </div>
                <div className='col' style={{
                    margin: '10px'
                }}>
                    <div>
                        <p style={{
                            fontSize: '13px',
                            marginBottom: '0'
                        }}>
                            {name.firstName + ' '}
                            {name.lastName}
                        </p>
                    </div>
                    <div>
                        {
                            Array(4).fill('&').map((x, i) => (
                                <AiFillStar
                                    key={i}
                                    style={styleStar}
                                />
                            ))
                        }
                        <span>4.5</span>
                        <p style={styleJoinde}>Joined at {dateJoined}</p>
                        <p style={styleDescription}>
                            {
                                about.slice(0, 150)
                            }
                        </p>
                    </div>
                </div>
                <div className='col-2' style={{}}>
                    <MdFavorite
                        style={favorite == 1 ? styleFavorite : styleUnFavorite}

                        onClick={() => {
                            setFavorite(!favorite)
                            pushFavorite()
                        }}
                    />
                </div>
            </div>

            <div className='row'>
                <p >{
                    experience.slice(0, 40) + ' ... '
                }
                    <a >Read more</a> </p>
            </div>

            <div className='row' style={{
                justifyContent: 'space-between',
                padding: '5px'
            }}>
                <button style={styleBtnView}>View Profile</button>
                <button style={styleBtnRequest}
                    onClick={() => {
                        RequestDialog(openDialog, id, type, 'Just moment, to be your request ready', socket)
                    }}

                > Request</button>
            </div>
        </div>
    )
}
export default function Card() {


    const socket = useContext(SocketContext)

    const { openDialog } = useDialog();
    const [tutors, setTutor] = useState([])
    const [ price,setPrice]=useState()
    const [isReady, setReady] = useState(false)
    const [ dataTosSelect,setDataToSelect]=useState()
    const [favoriteList, setFavoriteList] = useState([])
    const [ toSearsh,setToSearsh]=useState();
    const [ toinner,setToinner]=useState("");
    let user_id = localStorage.getItem('token')
    const { state } = useLocation();
    useEffect(()=>{
     
            setToinner(tutors)
        
    },[tutors])
    let id = state.id;
    const fetchDept = async () => {
        axios.get('http://localhost:4000/fetchDept').
            then((res) => {
                setDataToSelect(res.data)
                console.log("xx",res.data)
            }).
            catch((err) => {
                console.log('there is error is' + err)
            })
    }
    React.useEffect(() => { 
        fetchDept()
    }, [])
    const fetchData = async () => {


        const axio1 = axios.get(`http://localhost:4000/student/fetchFavoriteList/${user_id}`)
        const axio2 = axios.get(`http://localhost:4000/user/fetchTutors/${id}`)

        await axios.all([axio1, axio2]).then(axios.spread((res1, res2) => {
            setTutor(res2.data)
            let arr = Array();
            res1.data.favorit_list.map((item) => {
                let m = item.toString();
                arr.push(m)
            })
            setFavoriteList(arr);
            setReady(true)
        })).catch((error) => {
            alert(JSON.stringify(error, null, 0))
        })
    }
    const handleChange = async (id)=>{
        console.log(id)
        const axio2 =await axios.get(`http://localhost:4000/user/fetchTutors/${id}`)
        setTutor(axio2.data)
        // console.log(axio2.data)
        // setPrice(axio2.data.price)
        let a =dataTosSelect.find((x)=>{
            return x._id == id
        })
        console.log(a)
        setPrice(a.price)
    }
    React.useEffect(() => {
        fetchData()



    }, [])

    const handelInnerToSearsh=(x)=>{
        if(x==""){
            setToinner(tutors)
        }else {

        
        console.log(x)
        console.log(tutors)
        // setToSearsh
        let a=tutors.filter(z=>{
            return z.name.firstName.toLowerCase().includes(x.toLowerCase()) || z.name.lastName.toLowerCase().includes(x.toLowerCase())|| z.name.middleName.toLowerCase().includes(x.toLowerCase())
        })
        setToinner(a)
        }
        // console.log(a)
    }
    let navigate = useNavigate();
    //console.log(favoriteList)
    return (
        <div  className='container-fluid'>
            <div>
            <TopBar 
                style={{padding:"100px" }}
                onDashClick={()=>{
                    navigate('/user/profile')
                }}
                />
            </div>
            <br />
            <br />
                <div style={{display:"flex",flexDirection:"row"}}>
                    <div style={{width:"49%"}}>
                        <TextField onChange={(e)=>handelInnerToSearsh(e.target.value)} label="searsh" />
                    </div>
                    <div style={{width:"49%"}}>
                        <Box sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Section</InputLabel>
                            <FormControl fullWidth>
                                <select
                                // labelId="demo-simple-select-label"
                                // id="demo-simple-select"
                                // value={age}
                                // label="Age"
                                onChange={(e)=>handleChange(e.target.value)}
                                >
                                    { dataTosSelect && dataTosSelect.map(x=>{
                                        return (
                                            <option  style={{height:"50px"}} value={x._id}>{x.name}</option>
                                                    // <MenuItem value={x._id}>{x.name}</MenuItem>
                                        )
                                                    
                                                })}
                                
                                </select>
                            </FormControl>
                            {price && <InputLabel id="demo-simple-select-label">price : <span>{price}$</span></InputLabel>}
                        </Box>
                    </div>
                </div>
            <div style={{marginTop:"60px"}} className='row'>
                
                {
                   toinner&& toinner.map((item) => {
                        let flag = 0;
                        let val = favoriteList.indexOf(item._id)
                        if (val >= 0)
                            flag = 1;
                        //console.log(flag)    
                        return (
                            <Item
                                name={
                                    item.name
                                }
                                dateJoined={
                                    item.date
                                }

                                about={
                                    item.profile.about
                                }
                                experience={
                                    item.profile.experience
                                }
                                status={
                                    item.status
                                }

                                type={item.type}

                                id={item._id}

                                openDialog={openDialog}

                                socket={socket}

                                isFavorite={flag}
                            />
                        )
                    })
                }

            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div>
                    {
                        isReady && <button style={stylebtnRandomRequest}
                            onClick={() => {
                                RequestDialog(openDialog, null, 0, 'make sure that we will help you to be better', socket)
                            }}

                        >
                            <GiPerspectiveDiceSixFacesRandom
                                style={styleRandomRequestIcon}
                            />
                            Random Request


                        </button>
                    }
                </div>
            </div>
        </div>


    )
}
