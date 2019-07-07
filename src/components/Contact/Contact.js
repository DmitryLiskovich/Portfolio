import React from 'react';
import { Container, Row, Col, Input, Card, CardBody, Form, FormGroup, Button } from 'reactstrap';
import './contact.scss';

export default function Contact() {
  document.title = 'Contact';
  return(
    <Container className='text-center contact'>
      <Row style={{margin:0, padding: 0}}>
        <Col style={{margin:0, padding: 0}}>
          <Card>
            <div className="card-img-top image"></div>
            <CardBody>
              <Form>
                <FormGroup>
                  <label>Enter your message</label>
                  <br></br>
                  <Input type='textarea' className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write your message: Don't work :("></Input>
                  <br></br>
                  <Button type="submit" color='info'>Send</Button>
                  <br></br>
                  <br></br>
                  <div className="underline"></div>
                  <ul className='contact-list'>
                    <li><a href="https://vk.com/shine_a_light_lis"><i className="fab fa-vk"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/dmitry-liskovich-175470174/"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a href="https://github.com/DmitryLiskovich"><i className="fab fa-github-alt"></i></a></li>
                    <li><a href="skype:dimalisko"><i className="fab fa-skype"></i></a></li>
                  </ul>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}