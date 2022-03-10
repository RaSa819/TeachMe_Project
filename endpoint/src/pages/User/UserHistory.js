import React from 'react'
import Drawer from './Layout/Drawer'
import ReqCard from '../../components/reqCard/reqCard'
import axios from 'axios'
import ProgressBar from './../../components/ProgressBar'


export default function StudentFavoriteList() {
  const [data, setData] = React.useState([])

  let token = localStorage.getItem('token')
  let type = parseInt(localStorage.getItem('type'))

  const [isReady, setReady] = React.useState(0)
  let url = ''
  if (type === 0)
    url = `http://localhost:4000/student/fetchHistory/${token}`
  else if (type === 1)
    url = `http://localhost:4000/student/fetchHistory/${token}`

  const fetchData = async () => {
    await axios.get(url).then((data) => {
      alert(JSON.stringify(data, null, 2))
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

      <div style={{
        marginTop: '50px',
        overflowX: 'auto'
      }}>
        {
          isReady === 1 && data.length > 0 &&
          data.map((item, index) => (
            <ReqCard title={item.requestInfo.title} name={item.student}
              id={item._id}
            />
          ))
        }
        {
          isReady === 1 && data.length <= 0 &&
          <h1>You don't have any history yet</h1>
        }
        {
          isReady === 0 &&
          <ProgressBar />
        }
      </div>

    </Drawer>
  )
}


