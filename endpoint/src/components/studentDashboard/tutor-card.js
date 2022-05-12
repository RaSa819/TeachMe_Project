import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import RequestDialog from '../../components/RequestDialog';
import { MdFavorite } from "react-icons/md";
import { countries, styleFavorite, styleUnFavorite } from '../../general/datas';

export default function TutorCard(props) {
    const { name, joinedDate, about, experience, country,
        rate, type, id, openDialog, socket, isFavorite } = props;
    
    const [favorite, setFavorite] = useState()
    
    React.useEffect(()=>{
      setFavorite(isFavorite)
    },[isFavorite])
    
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

    let countryName = ''
    if (country) {
        let countryItem = countries.find(v => v.code === country);
        if (countryItem) {
            countryName = countryItem.label
        }
    }
    
    return (

        <div style={{ textAlign: 'left', border: '1px solid lightgray', borderRadius: 10, margin: 5, maxWidth: '350px', display: 'inline-block' }}>
            <div style={{ padding: 10 }}>
                <h6 style={{ display: 'inline-block', width: '90%' }}>{name.firstName + ' '} {name.middleName} {name.lastName}</h6>
                {/* <FavoriteIcon sx={{ color: '#D90429', display: 'inline-block', fontSize: 20 }} /> */}
                <MdFavorite style={favorite == 1 ? styleFavorite : styleUnFavorite}
                    onClick={() => {
                        setFavorite(!favorite)
                        pushFavorite()
                    }}
                />
                <div>
                    <Rating name="read-only" value={rate?rate:0} readOnly />
                    <span style={{ marginLeft: 15, fontSize: 12 }}>{countryName}</span>
                </div>

                <p style={{ fontSize: 12, color: 'grey' }}>joined on {new Date(joinedDate).toLocaleString()}</p>
                <p style={{ fontSize: 12 }}>{about.slice(0, 150)}<a href={`/view/tutor/${id}`} target="_blank">Learn more</a></p>
                <div style={{ textAlign: 'right' }}>
                    <Button sx={{ fontSize: 8, color: 'darkblue', background: '#f1f0f0', marginRight: '5px' }}><a href={`/view/tutor/${id}`} target="_blank">View profile</a></Button>
                    <Button sx={{ fontSize: 8, color: '#f1f0f0', background: 'darkblue' }} 
                        onClick={() => {
                            RequestDialog(openDialog, id, type, 'Just moment, to be your request ready', socket)
                        }}
                    >Make request</Button>
                </div>
            </div>
        </div>


    );
}