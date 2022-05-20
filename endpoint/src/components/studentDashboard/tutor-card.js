import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import RequestDialog from '../../components/RequestDialog';
import { MdFavorite } from "react-icons/md";
import { countries, styleFavorite, styleUnFavorite } from '../../general/datas';
import classes from "../../pages/StudentDashboard.module.css";
import { LanguageContext } from '../../App';

export default function TutorCard(props) {
    const language = React.useContext(LanguageContext);
    const { name, joinedDate, about, experience, country,
        rate, type, id, openDialog, socket, isFavorite, cardType,department} = props;

    const [favorite, setFavorite] = useState()
    let user_id = localStorage.getItem('token')
   
    React.useEffect(() => {
        setFavorite(isFavorite)
    }, [isFavorite])

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

    const cardStyle = cardType === 'TutorList' ? (classes.cardDiv + " " + classes.cardTDiv) : classes.cardDiv;
    return (

        <div className={cardStyle} >
            <div style={{ padding: 10 }}>
                <h6 style={{ display: 'inline-block', width: '90%' }}>{name.firstName + ' '} {name.middleName} {name.lastName}</h6>

                <MdFavorite style={favorite == 1 ? styleFavorite : styleUnFavorite}
                    onClick={() => {
                        setFavorite(!favorite)
                        pushFavorite()
                    }}
                />
                <div>
                    <Rating name="read-only" value={rate ? rate : 0} readOnly />
                    <span style={{ marginLeft: 15, fontSize: 12 }}>{countryName}</span>
                </div>

                <p style={{ fontSize: 12, color: 'grey' }}> {language.Joined} :  {joinedDate?.split('T')?.[0]}</p>
                <p style={{ fontSize: 12 }}>{about.slice(0, 35)}
                    <a href={`/view/tutor/${id}`} target="_blank">&nbsp;  {language.LearnMore}</a></p>

                <div style={{ textAlign: 'right' }}>

                    <Button sx={{ fontSize: 8, color: 'darkblue', background: '#f1f0f0', marginRight: '5px' }}>
                        <a href={`/view/tutor/${id}`} target="_blank"
                        >{language.ViewProfile}</a></Button>

                    <Button sx={{ fontSize: 8, color: '#f1f0f0', background: 'darkblue' }}
                        onClick={() => {RequestDialog(openDialog, id, type, language.JustMoment, socket,department,language)}}
                    >{language.MakeRequest}</Button>
                    
                </div>
            </div>
        </div>


    );
}