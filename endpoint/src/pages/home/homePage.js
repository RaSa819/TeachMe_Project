import React from "react";

import Topbar from '../../components/topBar/topBar';
import NavBar from "../../components/topBar/navBar";

import "./homePage.css";
import Footer from '../../components/footer/footer.js'
import {useNaviate} from 'react-router-dom'
import {Navigate, useNavigate} from 'react-router-dom'
import { LanguageContext } from '../../App';

window.addEventListener('scroll', function () {
    const header = this.document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0)
})

export default function HomePage() {

    const language = React.useContext(LanguageContext);

    let navigate = useNavigate()

    return (
        <div style={{height: '100vh'}}>
            <section class="banner" >
                <div class="container">
                    <div class='content'>
                        <h2>{language.MainTitle}</h2>
                        <h4>{language.ThisIsAPlatform}<br></br>{language.together}
                        </h4>
                        <hr class='homeHR'></hr>
                        <button type="button" class="btn btn-light "
                            onClick={
                                () => {
                                    navigate('/login')
                                }
                        }>{language.GetStarted}</button>
                    </div>

                </div>
                <a href='#section-2'>
                    <div class='scroll-down'></div>
                </a>
            </section>
            
            <section class='section-2' id='section-2'>
                <div class='container'>
                    <h1>{language.WhatIsTeachMe}</h1>
                    <h4>{language.AProfitibleEducational} 
                        <br></br>{language.Provides}
                    </h4>
                </div>
                <a href='#section-3'>
                    <div class='scroll-down'></div>
                </a>
            </section>

            <section class='section-3' id='section-3'>
                <div class='container'>
                    <h1>{language.AreYouLooking}</h1>
                    <h4>{language.YouCameToTheRight}
                        <br></br>
                        {language.JustMake}</h4>
                    <button type="button" class="btn btn-light tutorJoin "
                        onClick={
                            () => {
                                navigate('/signup')
                            }
                    }>{language.JoinAsStudent}</button>


                </div>
                <a href='#section-4'>
                    <div class='scroll-down'></div>
                </a>
            </section>


            <section class='section-4' id='section-4'>
                <div class='container'>
                    <h1> {language.AreYouASpecialized}</h1>
                    <h4>{language.WeAreLookingForTutors} 
                    </h4>
                    <button type="button" class="btn btn-light tutorJoin "
                        onClick={
                            () => {
                                navigate('/signup')
                            }
                    }>{language.JoinAsTutor}</button>

                </div>
            </section>
            {/* <Footer/> */}
        </div>
    );
}
