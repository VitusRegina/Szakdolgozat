import React from "react";
import { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';

interface IProps {
  id : number;
  sum : string;
  thingid : number;
  startdate : Date;
  enddate : Date
}


export default function Modify(props : IProps) {
        const [sum, setSum] = useState(props.sum);
        const [thingid, setId] = useState(props.thingid);
        const [startDate, setStartDate] = useState(props.startdate);
        const [endDate, setEndDate] = useState(props.enddate);
        const [interval, setInterval] = useState(0);
        const [intervalType, setIntervalType]=useState('sec');
        const i:number=props.id;
        var newDate : Date;
        const id = props.id;

        
    
      function handleChange1(e: React.FormEvent<HTMLInputElement> | any) {
        setInterval(Number(e.currentTarget.value));
      }
      function handleChange2(e: React.FormEvent<HTMLInputElement> | any) {
        setIntervalType(e.currentTarget.value);
       }

      const handleSubmit=async ()=> {
       if(intervalType === "sec")
       {
         newDate = new Date(endDate.getTime() + (interval));
       }
       if(intervalType === "min")
       {
         newDate = new Date(endDate.getTime() + (interval*60));
       }
       if(intervalType === "day")
       {
        newDate = new Date(endDate.getTime() + (interval*60*60*24));
       }
          await axios.put('https://localhost:5001/api/auction/'+i, {
              "id": i,
              "sum": sum,
              "thingID": thingid,
              "startTime": startDate,
              "endTime": newDate
            });  
            window.location.reload();
            console.log("modified");
            
      }


  return (
    <Container>
             <Row>
               <Col xs={3}>
               </Col>
               <Col xs={6}>
          <br/>
            <Form>
                <Form.Group>
                <Form.Label>
                 Time:
                 </Form.Label>
                 <Row>
                     <Col xs={6}>
                 <Form.Control type="number" value={sum} onChange={handleChange1} />
                 </Col>
                 <Col xs={6}>
                 <Form.Control as="select" defaultValue="sec" onChange={handleChange2}>
                     <option>sec</option>
                     <option>min</option>
                     <option>day</option>
                 </Form.Control>
                 </Col>
                 </Row>
                </Form.Group>

            <Form.Group>
                <div><Button  onClick={handleSubmit}>Create</Button>
                <Button  href="/privateauctions">Back</Button></div>
            </Form.Group>
        </Form>
        <br/>
        </Col>
              </Row>
            </Container>
  );
}