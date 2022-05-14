import React, { useContext } from 'react'
import Drawer from './Layout/Drawer'
import ReqCard from '../../components/reqCard/reqCard'
import axios from 'axios'
import ProgressBar from './../../components/ProgressBar'
import { SocketProvider } from '../../Socket'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HistoryIcon from '@mui/icons-material/History';
// import Profile from '../pages/Student/profile';
// import Edit from '../pages/Student/edit';
// import Tutors from '../pages/Student/tutors';


export default function PendingRequest(props) {

    const [data, setData] = React.useState([])
    const [isReady, setReady] = React.useState(0)

    const socket = useContext(SocketProvider)

    React.useEffect(() => {
        // socket.on('con',{})
        //socket.emit('hi')
    }, [])


    let token = localStorage.getItem('token')
    const fetchData = async () => {
        await axios.get(`http://localhost:4000/tutor/fetchRequest/${token}`).then((data) => {
            setData(data.data)
            setReady(1)

        }).catch((error) => {
            alert(JSON.stringify(data, null, 2))
            setReady(1)
        })
    }

    React.useEffect(() => {
        fetchData()

    }, [])

    return (
        <Drawer>

            <div style={
                {
                    marginTop: '50px',
                    overflowX: 'auto'

                }
            }>
                {
                    data.length > 0 && isReady === 1 && data.map((item, index) => (
                        <ReqCard title={
                            item.requestInfo.title
                        }
                            name={
                                item.info.name.firstName
                            }
                            id={
                                item._id
                            }
                            enable={true} />
                    ))
                }
                {
                    isReady === 1 && data.length <= 0 && <h1>
                        You dont have pending request
                    </h1>
                }
                {
                    isReady === 0 && <ProgressBar />
                } </div>
        </Drawer>
    )
}
