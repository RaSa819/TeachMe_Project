import React, { useState, useContext } from 'react'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdFavorite } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";


import { useLocation } from 'react-router-dom';

import TopBar from './topBar/topBar'

import { useDialog } from 'react-mui-dialog';
import axios from 'axios'
import RequestDialog from './RequestDialog';

import { SocketContext } from '../Socket';
import TutorDialog from './TutorDialog';
const styleFavorite = {
    width: '20px',
    height: '20px',
    color: 'gray'
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
        rate, type, id, openDialog, socket } = props;



    const [status, setStatus] = useState(props.status)

    return (
        <div className='col-md-4 col-lg-3  col-xs-12'
            style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid black',

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
                        style={styleFavorite}
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


    const {state} = useLocation();
    let id = state.id;
    const fetTutors = async () => {
        await axios.get(`http://localhost:4000/user/fetchTutors/${id}`).
            then((response) => {
                setTutor(response.data)
                setReady(true)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        fetTutors()
    }, [])
    console.log(tutors)

    return (
        <div className='container-fluid'>

            <div className='row'>
                <TopBar />
                {
                    tutors.map((item) => (
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
                        />
                    ))
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
