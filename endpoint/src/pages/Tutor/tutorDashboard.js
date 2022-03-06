import React from 'react';
import TopBar from '../../components/topBar/topBar'
import SideBar from '../../components/sideBar'
import ReqCard from '../../components/reqCard/reqCard'

import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import './tutorDashboard.css';

export default function TutorDashboard() {
  return (
<Container>
  <Row className="justify-content-md-center">
    <Col xs lg="2">
      <TopBar/>
    </Col>
  </Row>
  <Row>
  <Col><SideBar/><h1 id='dashboard'>Dashboard</h1></Col>
  <Col></Col>
  <Col></Col>
  </Row>
  <Row>
    <Col></Col>
    <Col md="auto"><div id='cardContainer'>
      <Container id ='requestsContainer'>
        <Row>
          <Col><ReqCard/></Col>
        </Row>
      </Container>
      
      </div></Col>
    <Col xs lg="2">
      3 of 3
    </Col>
  </Row>
</Container>
  );
}
