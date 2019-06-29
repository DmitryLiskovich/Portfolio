import React, { useState } from 'react';
import { Container, Form, Button, Input, Label, Card, CardImg, CardBody, Row, Col, ListGroup, ListGroupItem, FormGroup } from 'reactstrap';
import axios from 'axios';
import './Weather.scss'

export default function (){

  document.title = 'Weather';
  
  const [weather, setWeather] = useState({
    city: null,
    temperature: null,
    humidity: null,
    pressure: null,
    sky: null,
  });

  function changeWeather (event) {
    event.preventDefault();
    event.stopPropagation();
    (async function (){
      const city = document.getElementById('city').value;
      if(!city){
        alert('Enter city name');
        return 0;
      }
      const weatherFromSite = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fec8b249edbf6232ae4e5957bd8e7ecf&units=metric`);
      console.log(weatherFromSite.data.weather[0].description);
      setWeather({ 
        city: weatherFromSite.data.name,
        temperature: weatherFromSite.data.main.temp,
        humidity: weatherFromSite.data.main.humidity,
        pressure: weatherFromSite.data.main.pressure,
        sky: weatherFromSite.data.weather[0].description,
      });
    })();
  }

  const weatherTab = 
  <CardBody>
    <ListGroup className='text-left'>
      <ListGroupItem>City: {weather.city}</ListGroupItem>
      <ListGroupItem>Temperature: {weather.temperature} &#176;C</ListGroupItem>
      <ListGroupItem>Humidity: {weather.humidity}%</ListGroupItem>
      <ListGroupItem>Pressure: {weather.pressure}Pv</ListGroupItem>
      <ListGroupItem>Weather: {weather.sky}</ListGroupItem>
    </ListGroup>
  </CardBody>
  
  return(
    <Container style={{marginTop: '10px',marginBottom: '10px', height: '97vh', overflow: 'hiden'}} className='weather'>
      <Row>
        <Col xs={12}>
          <Card className='text-center'>
            <Row>
              <Col xs={12}>
                <CardImg top width='40%' src='https://source.unsplash.com/1600x900/?nature,weather' ></CardImg>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <CardBody style={{padding: 10 +'px'}}>
                  <Form onSubmit={changeWeather}>
                    <FormGroup>
                      <Label>Enter City</Label>
                      <Input type='text' id='city' placeholder='London' style={{textAlign: 'left'}}></Input>
                      <Button type='submit' color='info' style={{marginTop: 10+'px'}}> Submit </Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Col>
            </Row>
              {weather.sky && weatherTab}
            </Card>
          </Col>
        </Row>
    </Container>
  );
}