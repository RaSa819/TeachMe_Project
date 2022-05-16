import React, { useState } from "react";
import TopBar from '../../components/topBar/topBar'
import SideBar from '../../components/sideBar'
import ReqCard from '../../components/reqCard/reqCard'
import Dropdown from 'react-bootstrap/Dropdown';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './TutorDash.css';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function TutorDash() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid id='gridContainer' className="grid-side">
    {/* <div>
    <div style={{height:"21vh"}}>
    <Row  style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Tutor Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'><a href='' >Tutor Options</a></div>
      <div className='sideBarTab mt-5'>
      <a href='' ><div className='eye-icon side-icon mr-2'></div>View Profile</a>
      <a href='' ><div className='edit-icon side-icon mr-2'></div>Edit Profile</a>
      <a href='' className='active-sideTab'><div className='request-active-icon side-icon mr-2 '></div>Pending Request</a>
      <a href='' ><div className='clock-icon side-icon mr-2'></div>Previous Request History</a>
      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
        <Container id='contentContainer'>
            <div className='port-content d-flex justify-content-between align-items-center mb-2'>
            <div className='px-2'>
            <div className='d-flex align-items-center pr-3' style={{borderBottom:'1px solid #D6D6DF'}}>
              <h3 className='head-content my-0'>Student Name</h3>
              <div className='d-flex'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
              </div>
            </div>
              <h3 className='head-content-2'>Request Title</h3>
            </div>
            <div className='p-2 gap-2 d-flex'>
              <button className='btn-content'>View</button>
              <button className='btn-content bg-bl'>Accept</button>
              <button className='btn-content bg-rd'>Decline</button>
            </div>
            </div>
            <div className='port-content d-flex justify-content-between align-items-center mb-2'>
            <div className='px-2'>
            <div className='d-flex align-items-center pr-3' style={{borderBottom:'1px solid #D6D6DF'}}>
              <h3 className='head-content my-0'>Student Name</h3>
              <div className='d-flex'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
              </div>
            </div>
              <h3 className='head-content-2'>Request Title</h3>
            </div>
            <div className='p-2 gap-2 d-flex'>
              <button className='btn-content'>View</button>
              <button className='btn-content bg-bl'>Accept</button>
              <button className='btn-content bg-rd'>Decline</button>
            </div>
            </div>
            <div className='port-content d-flex justify-content-between align-items-center mb-2'>
            <div className='px-2'>
            <div className='d-flex align-items-center pr-3' style={{borderBottom:'1px solid #D6D6DF'}}>
              <h3 className='head-content my-0'>Student Name</h3>
              <div className='d-flex'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
              </div>
            </div>
              <h3 className='head-content-2'>Request Title</h3>
            </div>
            <div className='p-2 gap-2 d-flex'>
              <button className='btn-content'>View</button>
              <button className='btn-content bg-bl'>Accept</button>
              <button className='btn-content bg-rd'>Decline</button>
            </div>
            </div>
  </Container>
        </div>
      </Col>
    </Row>
    </div> */}

    {/* View Profile */}
   {/* <div>
    <div style={{height:"21vh"}}>
    <Row className='border-s' style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Student Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set-2 justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'><a href='' >Tutor Options</a></div>
      <div className='sideBarTab mt-5'>
      <a href=''  className='active-sideTab'><div className='eye-active-icon side-icon mr-2'></div>View Profile</a>
      <a href='' ><div className='edit-icon side-icon mr-2'></div>Edit Profile</a>
      <a href='' ><div className='request-icon side-icon mr-2 '></div>Pending Request</a>
      <a href='' ><div className='clock-icon side-icon mr-2'></div>Previous Request History</a>
      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
        <Container id='contentContainer' className='h-100'>
           <div className='port-student'>
             <h3>Student Name</h3>
             <div className='d-inline-flex align-items-center border-b py-2'>
             <div className='d-flex s-25'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
                 <div className='star'></div>
              </div>
              <div className='country-name d-flex align-items-center mx-3'>
              <div className='country-flag mr-2'></div>
                Saudi Arabia
              </div>
              </div>
              <h5>joined 20 May 2022</h5>
           </div>
  </Container>
        </div>
      </Col>
    </Row>
    </div> */}

    {/* Student Form */}
   {/* <div>
    <div style={{height:"21vh"}}>
    <Row className='border-s' style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Student Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set-2 justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'><a href='' >Tutor Options</a></div>
      <div className='sideBarTab mt-5'>
      <a href=''  ><div className='eye-active-icon side-icon mr-2'></div>View Profile</a>
      <a href='' className='active-sideTab'><div className='edit-active-icon side-icon mr-2'></div>Edit Profile</a>
      <a href='' ><div className='request-icon side-icon mr-2 '></div>Pending Request</a>
      <a href='' ><div className='clock-icon side-icon mr-2'></div>Previous Request History</a>
      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
        <Container id='contentContainer' className='h-100'>
           <div className='port-student'>
             <Form className=' d-flex align-items-center'>
  <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicEmail">
    <Form.Label className='m-0'>Name:</Form.Label>
    <Form.Control type="email" className='ml-3' placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3  d-flex align-items-center ml-5" controlId="formBasicPassword">
    <Form.Label className='m-0'>Country:</Form.Label>
    <Form.Select className='ml-3' placeholder="Country" >
      <option>Country</option>
    </Form.Select>
  </Form.Group>

</Form>
           </div>
  </Container>
        </div>
      </Col>
    </Row>
    </div> */}

    {/* Tutor card */}
    {/* <div>
    <div style={{height:"21vh"}}>
    <Row className='border-s' style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Student Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set-2 justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'><a href='' >Tutor Options</a></div>
      <div className='sideBarTab mt-5'>
      <a href='' ><div className='eye-active-icon side-icon mr-2'></div>View Profile</a>
      <a href='' ><div className='edit-icon side-icon mr-2'></div>Edit Profile</a>
      <a href=''  className='active-sideTab'><div className='request-active-icon side-icon mr-2 '></div>Favorite tutors list </a>
      <a href='' ><div className='clock-icon side-icon mr-2'></div>Previous Request History</a>
      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
        <Container id='contentContainer' className='h-100 border-s rounded'>
         <div className='d-grid-set'>
        
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
                <button className='mr-2'>View Profile</button>
                <button className='ml-2'>Make Request</button>
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
                <button className='mr-2'>View Profile</button>
                <button className='ml-2'>Make Request</button>
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
                <button className='mr-2'>View Profile</button>
                <button className='ml-2'>Make Request</button>
              </div>
          </div>
         </div>
  </Container>
        </div>
      </Col>
    </Row>
    </div> */}
   
  {/* Student Form */}
   {/* <div>
    <div style={{height:"21vh"}}>
    <Row className='border-s' style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Student Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set-2 justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'><a href='' >Tutor Options</a></div>
      <div className='sideBarTab mt-5'>
      <a href=''  ><div className='eye-active-icon side-icon mr-2'></div>View Profile</a>
      <a href='' className='active-sideTab'><div className='edit-active-icon side-icon mr-2'></div>Edit Profile</a>
      <a href='' ><div className='request-icon side-icon mr-2 '></div>Pending Request</a>
      <a href='' ><div className='clock-icon side-icon mr-2'></div>Previous Request History</a>
      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
        <Container id='contentContainer' className='h-100'>
           <div className='port-student'>
             <Form >
             <div className=' d-flex align-items-center'>
               
  <Form.Group className="mb-4 d-flex align-items-center" controlId="formBasicEmail">
    <Form.Label className='m-0'>Name:</Form.Label>
    <Form.Control type="email" className='ml-3' placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-4  d-flex align-items-center ml-5" controlId="formBasicPassword">
    <Form.Label className='m-0'>Country:</Form.Label>
    <Form.Select className='ml-3' placeholder="Country" >
      <option>Country</option>
    </Form.Select>
  </Form.Group>
             </div>
  <Form.Group className="mb-4  " controlId="exampleForm.ControlTextarea1">
    <Form.Label>About:</Form.Label>
    <Form.Control as="textarea" rows={5}  className='ml-7' placeholder="Write about yourself briefly"  />
  </Form.Group>
  <Form.Group className="mb-4 " controlId="formBasicEmail">
    <Form.Label >Certification:</Form.Label>
    <Form.Control type="text" className='ml-7 w-40' placeholder="example: University Name - degree" />
  </Form.Group>
  <Form.Group className="mb-4 " controlId="formBasicEmail">
    <Form.Label >Work experience:</Form.Label>
    <Form.Control type="text" className='ml-7 w-40' placeholder="example: University Name - degree" />
  </Form.Group>



</Form>
           </div>
  </Container>
        </div>
      </Col>
    </Row>
    </div> */}

    {/* Tutor Name Profile */}
       {/* <div>
    <div style={{height:"21vh"}}>
    <Row  style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Tutor Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'><a href='' >Tutor Options</a></div>
      <div className='sideBarTab mt-5'>
      <a href='' ><div className='eye-icon side-icon mr-2'></div>View Profile</a>
      <a href='' ><div className='edit-icon side-icon mr-2'></div>Edit Profile</a>
      <a href='' className='active-sideTab'><div className='request-active-icon side-icon mr-2 '></div>Pending Request</a>
      <a href='' ><div className='clock-icon side-icon mr-2'></div>Previous Request History</a>
      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
        <Container id='contentContainer'>
            <div className='port-content d-flex justify-content-between align-items-center mb-2'>
            <div className='px-2'>
            <div className='d-flex align-items-center pr-3' style={{borderBottom:'1px solid #D6D6DF'}}>
              <h3 className='head-content my-0'>Student Name</h3>
              <div className='d-flex'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
              </div>
            </div>
              <h3 className='head-content-2'>Request Title</h3>
            </div>
            <div className='p-2 gap-2 d-flex'>
              <button className='btn-content'>View</button>
              <button className='btn-content bg-bl'>Accept</button>
              <button className='btn-content bg-rd'>Decline</button>
            </div>
            </div>
            <div className='port-content d-flex justify-content-between align-items-center mb-2'>
            <div className='px-2'>
            <div className='d-flex align-items-center pr-3' style={{borderBottom:'1px solid #D6D6DF'}}>
              <h3 className='head-content my-0'>Student Name</h3>
              <div className='d-flex'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
              </div>
            </div>
              <h3 className='head-content-2'>Request Title</h3>
            </div>
            <div className='p-2 gap-2 d-flex'>
              <button className='btn-content'>View</button>
              <button className='btn-content bg-bl'>Accept</button>
              <button className='btn-content bg-rd'>Decline</button>
            </div>
            </div>
            <div className='port-content d-flex justify-content-between align-items-center mb-2'>
            <div className='px-2'>
            <div className='d-flex align-items-center pr-3' style={{borderBottom:'1px solid #D6D6DF'}}>
              <h3 className='head-content my-0'>Student Name</h3>
              <div className='d-flex'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
              </div>
            </div>
              <h3 className='head-content-2'>Request Title</h3>
            </div>
            <div className='p-2 gap-2 d-flex'>
              <button className='btn-content'>View</button>
              <button className='btn-content bg-bl'>Accept</button>
              <button className='btn-content bg-rd'>Decline</button>
            </div>
            </div>
  </Container>
        </div>
      </Col>
    </Row>
    </div> */}


      {/* <div>
    <div style={{height:"21vh"}}>
    <Row className='border-s' style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Student Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set-2 justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'><a href='' >Tutor Options</a></div>
      <div className='sideBarTab mt-5'>
      <a href=''  className='active-sideTab'><div className='eye-active-icon side-icon mr-2'></div>View Profile</a>
      <a href='' ><div className='edit-icon side-icon mr-2'></div>Edit Profile</a>
      <a href='' ><div className='request-icon side-icon mr-2 '></div>Pending Request</a>
      <a href='' ><div className='clock-icon side-icon mr-2'></div>Previous Request History</a>
      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
        <Container id='contentContainer' className='h-100'>
           <div className='port-student'>
             <h3>Student Name</h3>
             <div className='d-inline-flex align-items-center border-b py-2'>
             <div className='d-flex s-25'>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star-fill'></div>
                 <div className='star'></div>
                 <div className='star'></div>
              </div>
              <div className='country-name d-flex align-items-center mx-3'>
              <div className='country-flag mr-2'></div>
                Saudi Arabia
              </div>
              </div>
              <h5 className='mb-5'>joined 20 May 2022</h5>
              <p className='text-right mb-4'><b>About : </b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec augue pulvinar, scelerisque nisi at, mollis lorem.Ut pulvinar tempor justo sed tincidunt. Donec dictum euismod velit. Suspendisse ut dictum risus, non volutpat elit. Cras imperdiet at libero sit amet dignissim.</p>
              <p  className='mb-4'><b>Certification : </b>University Name - Major - Graduation Year</p>
              <p  className='mb-4'><b>Work Experience :</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
           </div>
  </Container>
        </div>
      </Col>
    </Row>
    </div> */}


  {/* Admin Side Dashboard Screen 1 */}

  {/* <div>
    <div style={{height:"21vh"}}>
    <Row  style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Tutor Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'></div>
      <div className='sideBarTab mt-5'>
      <a href='' className='active-sideTab-r' ><span className='pl-3'>Dashboard</span></a>
      <a href=''><span className='pl-3'>Users</span></a>
      <a href=''><span className='pl-3'>Sessions</span></a>

      </div>
      </div>
      </Col>

            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title">
        <Modal.Body>
        <Form className='modal-form '>
  <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicEmail">
    <Form.Label className='m-0'>Department Name:</Form.Label>
    <Form.Control type="email" className='ml-3' style={{width:"69%"}} placeholder="Department name" />
  </Form.Group>

  <Form.Group className="mb-3  d-flex align-items-center" controlId="formBasicPassword">
    <Form.Label className='m-0'>Price:</Form.Label>
    <Form.Control type="email" className='ml-3' placeholder="$_._ " />
  </Form.Group>
  <button className='add-btn-modal mt-5' onClick={handleClose}  variant="primary"> Add Department</button>

</Form>
        </Modal.Body>
      </Modal>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
            <button className='add-btn-r mb-3'  variant="primary" onClick={() => setShow(true)}> Add Department</button>
            <div className='port-content  mb-2 p-0 h-91'>
            <table className='port-table' style={{width:"100%"}}>
              <tbody>
                <tr>
                  <td>Department</td>
                  <td>Price</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Department Name</td>
                  <td>$__</td>
                  <td className='d-flex justify-content-end align-items-center gap-3'><div className='edit-icon-2'></div> <div className='delete-icon pl-2'></div></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            </div>
        </div>
      </Col>
    </Row>
    </div> */}
    
  {/* Admin Side Dashboard Screen 2 */}

  {/* <div>
    <div style={{height:"21vh"}}>
    <Row  style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Admin Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'></div>
      <div className='sideBarTab mt-5'>
      <a href=''  ><span className='pl-3'>Dashboard</span></a>
      <a href='' className='active-sideTab-r'><span className='pl-3'>Users</span></a>
      <a href=''><span className='pl-3'>Sessions</span></a>

      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
            <button className='add-btn-r mb-3'> Add Department</button>
            <div className='port-content  mb-2 p-4 h-91'>
            <div className='d-grid-set p-0 grid-350'>
        
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
            <div className='tutor-card-btn d-flex gap-2'>
              <button className='d-flex justify-content-center btn-2'><div className='edit-icon-white side-icon mr-1'></div>Edit Info</button>
              <button className='btn-1'>View Profile</button>
              <button className='d-flex justify-content-center btn-3'><div className='delete-icon delete-icon-white side-icon mr-1'></div>Delete User</button>
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
            <div className='tutor-card-btn d-flex gap-2'>
              <button className='d-flex justify-content-center btn-2'><div className='edit-icon-white side-icon mr-1'></div>Edit Info</button>
              <button className='btn-1'>View Profile</button>
              <button className='d-flex justify-content-center btn-3'><div className='delete-icon delete-icon-white side-icon mr-1'></div>Delete User</button>
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
            <div className='tutor-card-btn d-flex gap-2'>
              <button className='d-flex justify-content-center btn-2'><div className='edit-icon-white side-icon mr-1'></div>Edit Info</button>
              <button className='btn-1'>View Profile</button>
              <button className='d-flex justify-content-center btn-3'><div className='delete-icon delete-icon-white side-icon mr-1'></div>Delete User</button>
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
            <div className='tutor-card-btn d-flex gap-2'>
              <button className='d-flex justify-content-center btn-2'><div className='edit-icon-white side-icon mr-1'></div>Edit Info</button>
              <button className='btn-1'>View Profile</button>
              <button className='d-flex justify-content-center btn-3'><div className='delete-icon delete-icon-white side-icon mr-1'></div>Delete User</button>
            </div>
        </div>

       </div>
            </div>
        </div>
      </Col>
    </Row>
    </div> */}
  {/* Admin Side Dashboard Screen 3 */}

  {/* <div>
    <div style={{height:"21vh"}}>
    <Row  style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Admin Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'></div>
      <div className='sideBarTab mt-5'>
      <a href='' ><span className='pl-3'>Dashboard</span></a>
      <a href=''><span className='pl-3'>Users</span></a>
      <a href=''  className='active-sideTab-r'><span className='pl-3'>Sessions</span></a>

      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
            <button className='add-btn-r mb-3'> Add Department</button>
            <div className='port-content  mb-2 p-1 h-91'>
            <Form className=' d-flex align-items-center'>
            <Form.Group className="w-100" controlId="formBasicEmail">
            <Form.Control type="email" className=' mb-1 input-set' placeholder="Session Info" />
            <Form.Control type="email" className='input-set' placeholder="Session Info" />
            </Form.Group>
            </Form>
            
            </div>
        </div>
      </Col>
    </Row>
    </div> */}

    
  {/* tutor Side Review Screen  */}
 {/* <div className="review-port mr-1">
   <div className="d-flex justify-content-between mb-5">
     <h2 className="col-purple">Tutor name students reviews</h2>
      <button className="mr-2 bg-purple" onClick={handleShow}>Write a Review</button>
   </div>
  <div className="review-section p-3 mb-2">
   <div className=" d-flex justify-content-between">
     <div>
      <b> Raghad Salem </b><span className="col-grey">|</span> Saudia Arabia
     </div>
     <div className="col-d-grey">20 May 2022</div>
   </div>
   <p>
I had my first session with her and she was amazing. She was very kind and it was very engaging. Thanks a lot! :)</p>
</div>
  <div className="review-section p-3">
   <div className=" d-flex justify-content-between">
     <div>
      <b> Raghad Salem </b><span className="col-grey">|</span> Saudia Arabia
     </div>
     <div className="col-d-grey">20 May 2022</div>
   </div>
   <p>
I had my first session with her and she was amazing. She was very kind and it was very engaging. Thanks a lot! :)</p>
</div>
 </div> 
 <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
        <Form className='modal-form '>
  <Form.Group className="mb-3 " controlId="formBasicEmail">
    <Form.Label className='m-0'>Write Your Review:</Form.Label>
    <Form.Control as="textarea" rows={2}  className='my-4 review-field mx-auto' placeholder="Write your review here .."  />
  </Form.Group>
  <div className="d-flex justify-content-center">
  <button className='btn-2  px-5 py-1'  onClick={handleClose}  variant="primary"> Submit</button>
  </div>

</Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
        <Form className='modal-form '>
  <Form.Group className="mb-3 " controlId="formBasicEmail">
    <Form.Label className='m-0'>Write Your Review:</Form.Label>
    <Form.Control as="textarea" rows={2}  className='my-4 review-field mx-auto' placeholder="Write your review here .."  />
  </Form.Group>
  <div className="d-flex justify-content-center">
  <button className='btn-2  px-5 py-1'  onClick={handleClose}  variant="primary"> Submit</button>
  </div>

</Form>
        </Modal.Body>
      </Modal> */}

{/* Admin Side Modal Form */}

  <div>
    <div style={{height:"21vh"}}>
    <Row  style={{padding:"2px 25px 0px 25px"}}>
     <Col><h2 className='header-h2'>Teach Me.</h2></Col>
     <Col className='d-flex justify-content-end align-items-center'>
     <Dropdown className='header-dropdown mr-2'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   English
  <div className='arrow-down ml-2'></div>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
     <button className='logout-btn'>Logout <div className='logout-icon'></div></button>
  
     </Col>
    </Row>
        <h2 id='dashboardH2-h2'>Admin Dashboard</h2>
    </div>
    
    <Row style={{height:"79vh"}} className='row-set justify-content-between'>
      <Col xs sm md={12} lg={3} id='sidebarCol' className='mr-3'>
      <div className="sideBarBoard">
      <div className='text-center'></div>
      <div className='sideBarTab mt-5'>
      <a href=''  ><span className='pl-3'>Dashboard</span></a>
      <a href='' className='active-sideTab-r'><span className='pl-3'>Users</span></a>
      <a href=''><span className='pl-3'>Sessions</span></a>

      </div>
      </div>
      </Col>
      <Col id='contentCol' lg={9}>
        <div id='content' style={{height:"100%"}}>
            <button className='add-btn-r mb-3'> Add Department</button>
            <div className='port-content  mb-2 p-4 h-91'>
            <div className='d-grid-set p-0 grid-350'>
        
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
            <div className='tutor-card-btn d-flex gap-2'>
              <button className='d-flex justify-content-center btn-2'><div className='edit-icon-white side-icon mr-1'></div>Edit Info</button>
              <button className='btn-1'>View Profile</button>
              <button className='d-flex justify-content-center btn-3'><div className='delete-icon delete-icon-white side-icon mr-1'></div>Delete User</button>
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
            <div className='tutor-card-btn d-flex gap-2'>
              <button className='d-flex justify-content-center btn-2'><div className='edit-icon-white side-icon mr-1'></div>Edit Info</button>
              <button className='btn-1'>View Profile</button>
              <button className='d-flex justify-content-center btn-3'><div className='delete-icon delete-icon-white side-icon mr-1'></div>Delete User</button>
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
            <div className='tutor-card-btn d-flex gap-2'>
              <button className='d-flex justify-content-center btn-2'><div className='edit-icon-white side-icon mr-1'></div>Edit Info</button>
              <button className='btn-1'>View Profile</button>
              <button className='d-flex justify-content-center btn-3'><div className='delete-icon delete-icon-white side-icon mr-1'></div>Delete User</button>
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
            <div className='tutor-card-btn d-flex gap-2'>
              <button className='d-flex justify-content-center btn-2'><div className='edit-icon-white side-icon mr-1'></div>Edit Info</button>
              <button className='btn-1'>View Profile</button>
              <button className='d-flex justify-content-center btn-3'><div className='delete-icon delete-icon-white side-icon mr-1'></div>Delete User</button>
            </div>
        </div>

       </div>
            </div>
        </div>
      </Col>
    </Row>
    </div>

  </Container>
  )
}
