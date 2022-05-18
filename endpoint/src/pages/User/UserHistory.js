import React from 'react'
import Drawer from './Layout/Drawer'
import ReqCard from '../../components/reqCard/reqCard'
import axios from 'axios'
import ProgressBar from './../../components/ProgressBar'
import HistoryCard from '../../components/reqCard/historyCard'
import { LanguageContext } from '../../App';


export default()=> {
  const language = React.useContext(LanguageContext);
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
  <div>

        {
          isReady === 1 && data.length > 0 &&
          data.map((item, index) => (
            <HistoryCard title={item.requestInfo.title} 
              name={item.info.name.firstName}
              id={item._id}
              status={item.status}
              data={item}
            />
          ))
        }
        {
          isReady === 1 && data.length <= 0 &&
          <h4>{language.NoHistory}</h4>
        }
        {
          isReady === 0 &&
          <ProgressBar />
        }
      </div>

   
  )
}


