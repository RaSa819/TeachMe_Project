import React, { useState, useContext } from "react";
import { useDialog } from 'react-mui-dialog';
import axios from 'axios'
import { SocketContext } from '../../Socket';
import TutorCard from '../../components/studentDashboard/tutor-card';
import ProgressBar from '../../components/ProgressBar';

export default function Tutors() {
  const socket = useContext(SocketContext)
  const { openDialog } = useDialog();
  let user_id = localStorage.getItem('token')
  const [tutors, setTutor] = useState([])
  const [favoriteList, setFavoriteList] = useState([])
  const [isReady, setReady] = React.useState(0)
  const fetchData = async () => {
    const axio1 = axios.get(`http://localhost:4000/student/fetchFavoriteList/${user_id}`)
    const axio2 = axios.get(`http://localhost:4000/user/fetchTutors`)
    await axios.all([axio1, axio2]).then(axios.spread((res1, res2) => {
      setTutor(res2.data)
      setReady(1)
      let arr = Array();
      res1.data.favorit_list.map((item) => {
        let m = item.toString();
        arr.push(m)
      })
      setFavoriteList(arr);
    })).catch((error) => {
      alert(JSON.stringify(error, null, 0))
    })
  }
  React.useEffect(() => {
    fetchData()
  }, [])
  return (
    <div style={{ textAlign: 'left' }}>
      {
        isReady === 1  &&
        tutors.map((item) => {
          let flag = 0;
          let val = favoriteList.indexOf(item._id)
          if (val >= 0) {
            let flag = 1
            return (
              <TutorCard
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
                rate={
                  item.rate
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
          }
        })
      }
      {
        isReady === 0 &&
        <ProgressBar />
      }

    </div>
  );
}

