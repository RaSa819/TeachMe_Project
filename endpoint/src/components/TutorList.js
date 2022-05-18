import React, { useState, useContext } from 'react'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdFavorite } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import TutorCard from './studentDashboard/tutor-card';
import { useLocation } from 'react-router-dom';
import TopBar from './topBar/topBar'
import { useDialog } from 'react-mui-dialog';
import axios from 'axios'
import RequestDialog from './RequestDialog';
import Box from '@mui/material/Box';
import { SocketContext } from '../Socket';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import classes from './TutorList.module.css';
import Footer from './footer/footer';

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

    if (isFavorite)
        console.log(isFavorite)

    React.useEffect(() => {
        setFavorite(isFavorite)
    }, [isFavorite])


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
                margin: "10px"
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
                    <a href='#'>Read more</a> </p>
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

    const [isReady, setReady] = useState(false)

    const [favoriteList, setFavoriteList] = useState([])

    let user_id = localStorage.getItem('token')
    var filterParams = {
        department: '',
        tutorName: ''
    }

    const [department, setDepartment] = useState('')
    const [tutorName, setTutorName] = useState('')

    const fetchData = async () => {
        const axio1 = axios.get(`http://localhost:4000/student/fetchFavoriteList/${user_id}`)
        let fetchTutorsUrl = `http://localhost:4000/user/fetchTutors?department=${department}&tutorName=${tutorName}`
        const axio2 = axios.get(fetchTutorsUrl)

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

    const [departments, setDepartments] = React.useState([])

    const fetchDept = async () => {
      await axios.get('http://localhost:4000/fetchDept').
        //represnt data to state 
        then((res) => {
          setDepartments(res.data)
        }).
        catch((err) => {
          console.log('there is error is' + err)
        })
    }

    React.useEffect(() => {
        fetchData()
        fetchDept()
    }, [])

    React.useEffect(() => {
        fetchData()
    }, [department]);
    React.useEffect(() => {
        fetchData()
    }, [tutorName]);

    return (
        <div style={{ padding: 40, height: '100%', width: "100%" }}>
            <div style={{marginLeft:"35px",marginRight:"40px"}}>

                <h3 style={{ color: "#D90429", marginTop: "20px", fontWeight: "bold" }}
                >Select Department </h3>

                <div className={classes.searchBoxes}>
                    <div>
                    <Autocomplete
                        // disablePortal
                        // options={departments}
                        size="small"
                        sx={{width:"300px"}}
                        // renderInput={(params) => <TextField {...params} label="Select department" />}
                        options={departments}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.name}
                            </Box>
                        )}
                        onChange={(e, value) => {
                            setDepartment(value?value._id:'')
                            // fetchData()
                        }}
                        renderInput={(params) => (
                            <TextField
                            sx={{width:"400px"}}
                            size='small'
                            name="department"
                            className={classes.mainSearchBox}
                            {...params}
                            label="Department"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            />
                        )}
                    />
                    </div>


                    <div>
                        <TextField 
                            label="Search" 
                            variant="outlined" 
                            size="small"
                            onChange={async (e) => {
                                // filterParams.department = filterParams.department
                                setTutorName(e.target.value)
                                // fetchData()                           
                            }}
                        />
                    </div>
                </div>
            </div>
            <div style={{ padding: 40, width: "100%" }}>
                {/* <TopBar 
                
                onDashClick={()=>{
                    navigate('/user/profile')
                }}
                /> */}


                {
                    tutors?.map((item) => {
                        let flag = 0;
                        let val = favoriteList.indexOf(item._id)
                        if (val >= 0)
                            flag = 1;
                        //console.log(flag)    
                        return (
                            <TutorCard
                                cardType="TutorList"
                                name={
                                    item.name
                                }
                                country={
                                    item.address?.country
                                }

                                joinedDate={
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
            <Footer />
        </div>

    )
}


