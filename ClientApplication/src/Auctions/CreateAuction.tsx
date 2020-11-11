import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function CreateAuction(props : any) {
    const [sum, setSum] = useState('');
    const [id, setId] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
  
    function handleChange(e: React.FormEvent<HTMLInputElement>) {
      setSum(e.currentTarget.value);
      console.log(sum);
    }

    function handleChange2(e: Date | null) {
      if (e != null)
      setStartDate(e);
    }

    function handleChange3(e: Date | null) {
      if (e != null)
      setEndDate(e);
    }
   
    const handleSubmit= async ()=> {
        await axios.post('https://localhost:5001/api/auction', {
            "sum": sum,
            "thingID": 17,
            "startTime": startDate,
            "endTime": endDate
          });
          console.log("auction created");
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
                 <Form.Control type="number" value={sum} onChange={handleChange} />
                </Form.Group>

            <Form.Group>
                <Form.Label>
                 StartTime:
                 </Form.Label>
                 <DatePicker
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
                 <DatePicker
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
                <Button  href='/privateauctions'>Back</Button></div>
            </Form.Group>
        </Form>
        <br/>
        </Col>
              </Row>
            </Container>
      );
}