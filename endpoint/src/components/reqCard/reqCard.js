import React,{useContext} from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import Image from "react-bootstrap/Image";
import { Avatar } from "@mui/material";
import Rating from '../rating'
import axios from "axios";


import { SocketContext } from "../../Socket";
import "./reqCard.css";
export default (props) => {

  const { title, name, rate, id, enable } = props;
  const socket =  useContext(SocketContext)
  let push = (status) => {
    
    localStorage.setItem('sessionID',id)
    socket.emit('editRequestStatus',{
      id:id,
      status:status
    });
//     axios.post('http://localhost:4000/tutor/editRequestStatus', {
//       id: id,
//       status: status
//     }).then((data) => {
//       window.location.reload();
//     }).catch((error) => {
// 
//     })
  }
  return (

    <Container id='card'>
      
      <Row>
        <Col xs={2} lg={1}>
          <Avatar id='avatar' src="">
          </Avatar></Col>

        <Col xs={3}>
          <h4>{title}</h4>
          <h6>{name} <Rating /></h6>
        </Col>

        <Col xs={7}>
          {
            enable === true &&
            <Button id="button" variant="outlined" color="error"

              onClick={() => {
                push(0)
              }}
            >
              Decline
            </Button>
          }

          {
            enable === true && <Button id="button" variant="contained" style={{

              backgroundColor: '#000052'
            }}
              onClick={() => {
                push(1)
              }}
            >
              Accept
            </Button>

          }
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
