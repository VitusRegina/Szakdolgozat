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

interface IFunctionProp {
  id : number;
  sum : string;
  thingid : number;
  startdate : Date;
  enddate : Date
}


export default function Modify(props : IFunctionProp) {
        const [sum, setSum] = useState(props.sum);
        const [thingid, setId] = useState(props.thingid);
        const [startDate, setStartDate] = useState(props.startdate);
        const [endDate, setEndDate] = useState(props.enddate);
        const i:number=props.id;
    
      function handleChange1(e: React.FormEvent<HTMLInputElement>) {
        setSum(e.currentTarget.value);
      }
      function handleChange2(e: Date | null) {
        if(e != null)
          setStartDate(e);
      }
      function handleChange3(e: Date | null) {
        if(e != null)
         setEndDate(e);
      } 
      const handleSubmit=async ()=> {
          
          await axios.put('https://localhost:5001/api/auction/'+i, {
              "id": i,
              "sum": sum,
              "thingID": thingid,
              "startTime": startDate,
              "endTime": endDate
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
                 Startprice:
                 </Form.Label>
                 <Form.Control type="number" value={sum} onChange={handleChange1} />
                </Form.Group>

            <Form.Group>
              
                <Form.Label>
                 StartTime:
                 </Form.Label>
                 <DatePicker className="form-control"
                     selected={startDate}
                     onChange={date => handleChange2(date)}
                     showTimeSelect
                     timeFormat="HH:mm"
                     timeIntervals={15}
                     timeCaption="time"
                     dateFormat="yyyy:MM:dd h:mm"
                    />     
            </Form.Group>

            <Form.Group>
                <Form.Label>
                 EndTime:
                 </Form.Label>
                 <DatePicker className="form-control"
                     selected={endDate}
                     onChange={date => handleChange3(date)}
                     showTimeSelect
                     timeFormat="HH:mm"
                     timeIntervals={15}
                     timeCaption="time"
                     dateFormat="yyyy:MM:dd h:mm"
                    />    
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