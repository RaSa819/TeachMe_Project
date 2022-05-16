import React, { useState } from "react";
import TopBar from '../../components/topBar/topBar'
import SideBar from '../../components/sideBar'
import ReqCard from '../../components/reqCard/reqCard'
import Dropdown from 'react-bootstrap/Dropdown';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './TutorList.css';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function TutorList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid id='gridContainer' className="grid-side">
<div>
    <div style={{height:"21vh"}}>
    <Row className=' bg-purple ' style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2 text-white'>
  <Dropdown.Toggle variant="success" className="text-white" id="dropdown-basic">
   English
  <div className='arrow-down-white arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn text-white'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set-2 justify-content-between'>

      <Col id='contentCol' lg={10} className="m-auto">
        <h2 id='dashboardH2-h2'>Select Department</h2>
        <div>
      <Form.Group className="mb-3">
      <Form.Select id="disabledSelect">
        <option>Enabled Skj9hylelect</option>
      </Form.Select>
    </Form.Group>
        </div>
        <div  style={{height:"100%"}}>
        <Container id='contentContainer' className='h-100'>
         <div className='d-grid-set p-0'>       
          <div className='port-tutor-card'>
          <h5 className='port-head'> Tutor name <div className='heart-icon'></div></h5>
          <div className='d-flex s-25'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
                 <h5 className='star-head'>Country Name</h5>
              </div>
              <p className='col-grey'>joined 20 May 2022</p>
              <p className='anchor-p'>i have 3 years experience in dfjfhlfljf .....<a href=''> learn more</a></p>
              <div className='tutor-card-btn'>
                <button className='mr-2 btn-1'>View Profile</button>
                <button className='ml-2 btn-2'>Make Request</button>
              </div>
          </div>
          <div className='port-tutor-card'>
          <h5 className='port-head'> Tutor name <div className='heart-icon'></div></h5>
          <div className='d-flex s-25'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
                 <h5 className='star-head'>Country Name</h5>
              </div>
              <p className='col-grey'>joined 20 May 2022</p>
              <p className='anchor-p'>i have 3 years experience in dfjfhlfljf .....<a href=''> learn more</a></p>
              <div className='tutor-card-btn'>
              <button className='mr-2 btn-1'>View Profile</button>
                <button className='ml-2 btn-2'>Make Request</button>
              </div>
          </div>
          <div className='port-tutor-card'>
          <h5 className='port-head'> Tutor name <div className='heart-icon'></div></h5>
          <div className='d-flex s-25'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
                 <h5 className='star-head'>Country Name</h5>
              </div>
              <p className='col-grey'>joined 20 May 2022</p>
              <p className='anchor-p'>i have 3 years experience in dfjfhlfljf .....<a href=''> learn more</a></p>
              <div className='tutor-card-btn'>
              <button className='mr-2 btn-1'>View Profile</button>
                <button className='ml-2 btn-2'>Make Request</button>
              </div>
          </div>
          <div className='port-tutor-card'>
          <h5 className='port-head'> Tutor name <div className='heart-icon'></div></h5>
          <div className='d-flex s-25'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
                 <h5 className='star-head'>Country Name</h5>
              </div>
              <p className='col-grey'>joined 20 May 2022</p>
              <p className='anchor-p'>i have 3 years experience in dfjfhlfljf .....<a href=''> learn more</a></p>
              <div className='tutor-card-btn'>
              <button className='mr-2 btn-1'>View Profile</button>
                <button className='ml-2 btn-2'>Make Request</button>
              </div>
          </div>
          <div className='port-tutor-card'>
          <h5 className='port-head'> Tutor name <div className='heart-icon'></div></h5>
          <div className='d-flex s-25'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
                 <h5 className='star-head'>Country Name</h5>
              </div>
              <p className='col-grey'>joined 20 May 2022</p>
              <p className='anchor-p'>i have 3 years experience in dfjfhlfljf .....<a href=''> learn more</a></p>
              <div className='tutor-card-btn'>
              <button className='mr-2 btn-1'>View Profile</button>
                <button className='ml-2 btn-2'>Make Request</button>
              </div>
          </div>
          <div className='port-tutor-card'>
          <h5 className='port-head'> Tutor name <div className='heart-icon'></div></h5>
          <div className='d-flex s-25'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
                 <h5 className='star-head'>Country Name</h5>
              </div>
              <p className='col-grey'>joined 20 May 2022</p>
              <p className='anchor-p'>i have 3 years experience in dfjfhlfljf .....<a href=''> learn more</a></p>
              <div className='tutor-card-btn'>
              <button className='mr-2 btn-1'>View Profile</button>
                <button className='ml-2 btn-2'>Make Request</button>
              </div>
          </div>
         </div>
  </Container>
        </div>
      </Col>
    </Row>
    </div>
  </Container>
  )
}
