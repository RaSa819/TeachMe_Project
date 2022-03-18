import React, { useState,useContext } from 'react'
import Drawer from './Layout/Drawer'
import ReqCard from '../../components/reqCard/reqCard'
import axios from 'axios'
import ProgressBar from './../../components/ProgressBar'
import { Avatar } from "@mui/material";

import './style.css'

const Card = (props) => {



    const { name, about, certifcation, experience } = props;
    return (<div className='card'>
        <div className='info'>
            <p>
                About this Tutor :
                {about}
                <br />
                And Has 
                {' '+certifcation} as certifcation 
                <br />
                And experiences are
                {' '+experience}
            </p>
        </div>
        <hr />
        <div className='details'>
            <div className='tutor'>
                <Avatar id='tutor-img' src="" />
            </div>

            <div className='title'>
                <a className='title-name'>
                    {name}
                </a>
                <p className='tutor-detail'>
                    10 k Previews
                </p>
                <span>
                    Has 10 rate
                </span>
            </div>
        </div>
    </div>)
}

export const Container = (props) => {
    return (
        <main>
            <div className='container1'>
                {props.children}
            </div>
        </main>
    )
}

export default function StudentFavoriteList() {
    const [data, setData] = React.useState([])
    const [ready, setReady] = useState(0)

    
    let token = localStorage.getItem('token')

    let url = `http://localhost:4000/student/getFavortieListInfo/${token}`

    const fetchData = async () => {
        await axios.get(url).then((data) => {
            setData(data.data)
            setReady(1)

        }).catch((error) => {
            alert(JSON.stringify(error, null, 2))
        })
    }

    React.useEffect(() => {
        fetchData()

    }, [])

    console.log(data)
    return (
        <Drawer>
            <Container>
                {
                    data.map((item) => {
                        return (
                            <Card
                                name={
                                    item.name.firstName + ' ' + item.name.lastName
                                }

                                about={
                                    item.info.profile.about
                                }

                                certifcation={
                                    item.info.profile.certifications
                                }

                                experience={
                                    item.info.profile.experience
                                }
                            />
                        )
                    })
                }
            </Container>

        </Drawer>
    )
}


