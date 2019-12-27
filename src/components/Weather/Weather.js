import React, { useState } from 'react';
import { Container, Form, Button, Input, Label, Card, CardImg, CardBody, Row, Col, ListGroup, ListGroupItem, FormGroup } from 'reactstrap';
import axios from 'axios';
import './Weather.scss'
import Spinner from '../Spinner/Spinner';

export default function (){

	const [spinner, setSpinner] = useState(false);

  document.title = 'Weather';
  
  const [weather, setWeather] = useState({
    city: null,
    temperature: null,
    humidity: null,
    pressure: null,
    sky: null,
    icon: null
  });

  function getIconFromId (id){
    if(id > 199 && id < 233) return '11';
    if(id > 499 && id < 505) return '10';
    if(id === 511) return '13';
    if((id > 299 && id < 322) || (id > 519 && id < 782)) return '09';
    if(id === 800) return '01';
    if(id > 800 && id < 805) return '04';
  }


  function changeWeather (event) {
    event.preventDefault();
	event.stopPropagation();
    (async function (){
      const city = document.getElementById('city').value;
      if(!city){
        alert('Enter city name');
        return 0;
	  }
	  setSpinner(true);
      const weatherFromSite = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fec8b249edbf6232ae4e5957bd8e7ecf&units=metric`);
      let weatherIcon = getIconFromId(parseInt(weatherFromSite.data.weather[0].id));
      weatherFromSite.data.dt < weatherFromSite.data.sys.sunrise || weatherFromSite.data.dt > weatherFromSite.data.sys.sunset ? weatherIcon += 'n' : weatherIcon += 'd';
      weatherIcon = `http://openweathermap.org/img/w/${weatherIcon}.png`;
      setWeather({ 
        city: weatherFromSite.data.name,
        temperature: weatherFromSite.data.main.temp,
        humidity: weatherFromSite.data.main.humidity,
        pressure: weatherFromSite.data.main.pressure,
        sky: weatherFromSite.data.weather[0].description,
        icon: weatherIcon,
	  });
		setSpinner(false);	  
    })();
  }
  const weatherTab = 
  <CardBody>
    <ListGroup className='text-left'>
      <ListGroupItem>City: {weather.city}</ListGroupItem>
      <ListGroupItem>Temperature: {weather.temperature} &#176;C</ListGroupItem>
      <ListGroupItem>Humidity: {weather.humidity}%</ListGroupItem>
      <ListGroupItem>Pressure: {weather.pressure}Pv</ListGroupItem>
      <ListGroupItem>Weather: {weather.sky} <img src={weather.icon} alt='Weather'></img></ListGroupItem>
    </ListGroup>
  </CardBody>
  
  return(
    <Container className='weather' style={{position: 'relative'}}>
		{spinner ? <Spinner/> : ''}
      <Row style={{margin:0, padding: 0}}>
        <Col xs={12} style={{margin:0, padding: 0}}>
          <Card className='text-center'>
            <Row style={{margin:0, padding: 0}}>
              <Col xs={12} style={{margin:0, padding: 0}}>
				<div className="random-image"/>
              </Col>
            </Row>
            <Row style={{margin:0, padding: 0}}>
              <Col xs={12} style={{margin:0, padding: 0}}>
                <CardBody>
                  <Form onSubmit={changeWeather}>
                    <FormGroup>
                      <Label>Enter a city name</Label>
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