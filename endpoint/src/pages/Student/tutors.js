import React from "react";
import TutorCard from '../../components/studentDashboard/tutor-card';

export default function Tutors() {
    return (
        <div style={{ textAlign: 'center' }}>
            <TutorCard
                name="Tutor Name"
                stars='4'
                country="Country name"
                joinedDate="joined 20 May 2022"
                description= "I have 3 years experience in Lorem ipsum dolor sit amet..."
            />
            <TutorCard
                name="Tutor Name"
                stars='4'
                country="Country name"
                joinedDate="20 May 2022"
                description= "I have 3 years experience in Lorem ipsum dolor sit amet..."
             />

        </div>
    );
}