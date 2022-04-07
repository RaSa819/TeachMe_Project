import React from "react";

import Topbar from '../../components/topBar/topBar';

import "./homePage.css";
import Footer from '../../components/footer/footer.js'
import {useNaviate} from 'react-router-dom'
import {Navigate, useNavigate} from 'react-router-dom'
window.addEventListener('scroll', function () {
    const header = this.document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0)
})

export default function HomePage() {

    let navigate = useNavigate()

    return (
        <div>
            <Topbar/>
            <section class="banner">
                <div class="container">
                    <div class='content'>
                        <h2>Save time and connect to the best tutors.</h2>
                        <h4>this is a platform to bring students and tutors
                            <br></br>together and make learning easy and affordable
                        </h4>
                        <hr class='homeHR'></hr>
                        <button type="button" class="btn btn-light "
                            onClick={
                                () => {
                                    navigate('/login')
                                }
                        }>Get Started</button>
                    </div>

                </div>
                <a href='#section-2'>
                    <div class='scroll-down'></div>
                </a>
            </section>
            <section class='section-2' id='section-2'>
                <div class='container'>
                    <h1>What is Teach me ?</h1>
                    <h4>a Profitible educational platform
                        <br></br>provides service for both students and tutors
                    </h4>
                </div>
                <a href='#section-3'>
                    <div class='scroll-down'></div>
                </a>
            </section>

            <section class='section-3' id='section-3'>
                <div class='container'>
                    <h1>Are you looking for Information Immedietely ?</h1>
                    <h4>You came to the right place!
                        <br></br>
                        just make a request and your request will be handed to the best tutors ! immedietly</h4>
                    <button type="button" class="btn btn-light tutorJoin "
                        onClick={
                            () => {
                                navigate('/signup')
                            }
                    }>Join as Student</button>


                </div>
                <a href='#section-4'>
                    <div class='scroll-down'></div>
                </a>
            </section>


            <section class='section-4' id='section-4'>
                <div class='container'>
                    <h1>Are you a Specialized  Tutor Who’s Looking for Extra Income Resources?</h1>
                    <h4>we are looking for tutors with an experience and passion about teaching !
                    </h4>
                    <button type="button" class="btn btn-light tutorJoin "
                        onClick={
                            () => {
                                navigate('/signup')
                            }
                    }>Join as Tutor</button>

                </div>
            </section>
            <Footer/>
        </div>
    );
}
