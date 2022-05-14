import React, { useContext } from 'react'
import axios from 'axios'
import { SocketProvider } from '../../Socket'
import ReqCard from '../../components/reqCard/reqCard'
import ProgressBar from './../../components/ProgressBar'


export default function PendingRequest() {

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
        <div>
     
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
                isReady === 1 && data.length <= 0 && <h3 style={{marginTop:"20px"}}>
                    You don't have pending request!
                </h3>
            }
            {
                isReady === 0 && <ProgressBar />
            }
        </div>
    );

}