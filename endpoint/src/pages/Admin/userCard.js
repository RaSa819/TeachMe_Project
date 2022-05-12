import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';


export default function UserCard(props) {
    const {name, country, joinedDate, description, stars} = props;

    
    return (

        <div style={{ textAlign: 'left', border: '1px solid lightgray', borderRadius: 10, margin: 5, width: '40%', display: 'inline-block' }}>
            <div style={{ padding: 10 }}>
                <h6 style={{ display: 'inline-block', width: '90%' }}>{name}</h6>
                <FavoriteIcon sx={{ color: '#D90429', display: 'inline-block', fontSize: 20 }} />
                <div>
                
             
                    <Rating name="read-only" value={stars} readOnly />
           
                    <span style={{ marginLeft: 15, fontSize: 12 }}>{country}</span>
                </div>

                <p style={{ fontSize: 12, color: 'grey' }}>joined {joinedDate}</p>
                <p style={{ fontSize: 12 }}>{description}<a href="">Learn more</a></p>
                <div style={{ textAlign: 'right' }}>
                    <Button sx={{ fontSize: 8, color: 'darkblue', background: '#f1f0f0', marginRight: '5px' }}>View profile</Button>
                    <Button sx={{ fontSize: 8, color: '#f1f0f0', background: 'darkblue' }}>Make request</Button>
                </div>
            </div>
        </div>


    );
}