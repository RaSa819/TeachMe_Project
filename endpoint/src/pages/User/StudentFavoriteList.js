import React from 'react'
import Drawer from './Layout/Drawer'
import ReqCard from '../../components/reqCard/reqCard'
import axios from 'axios'
import ProgressBar from './../../components/ProgressBar'
import { Avatar } from "@mui/material";

import './style.css'

const Card = (props) => {

    const { info, name } = props;
    return (<div className='card'>
        <div className='info'>
            <p>
                here we will see every thing about tutor, like
                certifications, experience , and
                we will see also some additionals infomation about his/her activities in the website
                like: the previews, and the rate
                like: the previews, and the rate
                like: the previews, and the rate
                like: the previews, and the rate
            </p>
        </div>
        <hr />
        <div className='details'>
            <div className='tutor'>
                <Avatar id='tutor-img' src="" />
            </div>

                <div className='title'>
                    <a className='title-name'>
                        tutor name
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

        let token = localStorage.getItem('token')
        let type = parseInt(localStorage.getItem('type'))

        const [isReady, setReady] = React.useState(0)
        let url = ''
        if (type === 0)
        url = `http://localhost:4000/student/fetchHistory/${token}`
        else if (type === 1)
        url = `http://localhost:4000/tutor/fetchHistory/${token}`


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

        return (
        <Drawer>
            <Container>
                {
                    Array(12).fill(1).map((item) => {
                        return (
                            <Card>

                            </Card>
                        )
                    })
                }
            </Container>

        </Drawer>
        )
}


