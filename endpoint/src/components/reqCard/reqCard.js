import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import Image from "react-bootstrap/Image";
import { Avatar } from "@mui/material";
import Rating from '../rating'


import "./reqCard.css";
export default function reqCard(props) {

  const{title,name,rate} = props;
  return (

    <Container id='card'>
      <Row>
        <Col xs ={2} lg={1}>
          <Avatar id='avatar' src="">
          </Avatar></Col>
        
        <Col xs={3}>
          <h4>{title}</h4>
          <h6>{name} <Rating /></h6>
        </Col>
        
        <Col xs={7}>
          <Button id="button" variant="outlined" color="error"
          >
            Decline
          </Button>
          <Button id="button" variant="contained" style={{

            backgroundColor: '#000052'
          }}>
            Accept
          </Button>
          <Button id="button" variant="primary" style={{
            backgroundColor: 'gray'
          }}>
            View
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
