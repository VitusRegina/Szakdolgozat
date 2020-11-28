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
import authHeader from "../Services/TokenService";

interface IFunctionProp5 {
    id : string;
    name : string;
    description: string;
  }

export default function Modify(props: IFunctionProp5){
    const [name, setName] = useState(props.name);
      const [description, setDescription] = useState(props.description);
      const [id, setId] = useState(props.id);
      const i:number=Number(props.id);
    
      function handleChange1(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.currentTarget.value);
        console.log(id);
      }
      function handleChange2(e: React.ChangeEvent<HTMLInputElement>) {
          setDescription(e.currentTarget.value);
        }
      const handleSubmit=async ()=> {
          
          await axios.put('https://localhost:5001/api/thing/'+i, {
              "id": id,
              "name": name,
              "desccription": description
            },{ headers: authHeader() });
            
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
                  <Form.Label>Name:</Form.Label>
                   <Form.Control type="text" value={name} onChange={handleChange1} />
                   </Form.Group>
              
                   <Form.Group>
                  <Form.Label> Description:</Form.Label>
                   <Form.Control type="text" value={description} onChange={handleChange2} />
                  </Form.Group>
  
                  <Form.Group>
                  <div><Button  onClick={handleSubmit}>Save</Button>
                  <Button href="/things">Back</Button></div>
                  </Form.Group>
              
          </Form>
          <br/>
          </Col>
              </Row>
            </Container>
        );
  }