import React from 'react'
import axios from 'axios'
export default function Users() {

  const [data, setData] = React.useState([])

  React.useEffect(async() => {
    await axios.get('http://localhost:4000/fetchDept').
      then((response) => {
        setData(response.data)
        console.log(data)
        //console.log(response.data)
      }).catch((error) => {
        console.log("there is some error " + error)
      })

  }, [])
  return (
    <div>

      <ul>
        {
          data.map((item,key)=>(
            <li key={key}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

