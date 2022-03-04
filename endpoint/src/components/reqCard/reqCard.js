import React from "react";
import { Card, Container, Row , Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Avatar } from "@mui/material";
import Rating from '../rating'


import "./reqCard.css";
export default function reqCard() {
  return (
    <Card id="card">
      <Card.Body>
        <Container fluid id='cardBodyContainer'>
          <Row>
            <Col md="auto">
            <Avatar id='avatar' src=""></Avatar>
            </Col>
            <Col md="auto"> 
            <Card.Title>Request Title</Card.Title>
            <Card.Text>student name <Rating id='rating'/> </Card.Text>
            </Col>
            <Col id='button-group'><Button id="button" variant="primary">
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
      </Card.Body>
    </Card>
  );
}
