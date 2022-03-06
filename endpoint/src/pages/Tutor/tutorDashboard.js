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
    <Container fluid id='gridContainer'>
  <Row>
    <Col id='navCol'><TopBar/></Col>
  </Row>
  <Row>
    <Col xs sm md={12} lg={1} id='sidebarCol'><SideBar/></Col>
    <Col id='contentCol' lg={9}>
      <h2 id='dashboardH2'>Dashboard</h2>
      <div id='content'>
      <Container id='contentContainer'>
  <Row>
    <Col><ReqCard/></Col>
  </Row>
  <Row>
    <Col><ReqCard/></Col>
  </Row>
</Container>
      </div>
    </Col>

  </Row>
</Container>
  );
}
