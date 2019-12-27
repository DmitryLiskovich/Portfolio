import React from 'react';
import { Toast, ToastBody, ToastHeader, Col, Container, Row } from 'reactstrap';

export default function Task(props) {
  return(
      <Container style={{zIndex: 100}}>
        <Row>
          <Col style={{marginBottom: '10px'}}>
            <Toast>
            <ToastHeader>
              {props.title}
            </ToastHeader>
            <ToastBody>
              {props.text}
            </ToastBody>
            </Toast>
          </Col>
        </Row>
      </Container>
  )
}