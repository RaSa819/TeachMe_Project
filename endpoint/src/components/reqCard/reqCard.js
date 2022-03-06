import React from "react";
import { Card, Container, Row , Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Avatar } from "@mui/material";
import Rating from '../rating'


import "./reqCard.css";
export default function reqCard() {
  return (

    <Container id='card'>
    <Row>
      <Col xs sm md={1} lg={1}><Avatar id='avatar' src=""></Avatar></Col>
      <Col xs={6}>
        <h4>Request Title</h4>
        <h6>Student name <Rating/></h6>
      </Col>
      <Col>
      <Button id="button" variant="primary">
              Decline
            </Button>
            <Button id="button" variant="primary">
              Accept
            </Button>
            <Button id="button" variant="primary">
              View
            </Button></Col>
    </Row>
  </Container>



         
      
  );
}
